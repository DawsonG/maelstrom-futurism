/**
 * Supplementary, ADVISORY bot signals.
 *
 * Everything in this module runs in the visitor's browser, which the visitor
 * fully controls. A determined adversary can patch these functions, spoof the
 * values they read, or simply never load the bundle. Therefore these signals
 * MUST NOT be the sole arbiter of "bot vs human". Collect them, ship the report
 * to your server, and combine it with signals the client can't forge -- TLS/JA3
 * fingerprints, HTTP header ordering, IP/ASN reputation, and rate limiting --
 * to make the actual decision.
 *
 * Compared to the capability checks in `isBot` (which mostly confirm "this is a
 * browser" -- something every headless automation tool also satisfies), these
 * collectors look for direct automation tells and internal inconsistencies that
 * a real browser should never exhibit. Each collector returns a {@link BotSignal}
 * so the caller can see *why* something was flagged instead of a single opaque
 * boolean.
 */

/** A single piece of evidence. `detected === true` means it looks bot-like. */
export interface BotSignal {
    /** Stable identifier for logging / server-side aggregation. */
    name: string;
    /** Whether this signal fired (i.e. looked bot-like). */
    detected: boolean;
    /** Relative importance; higher == stronger evidence of automation. */
    weight: number;
    /** Optional human-readable explanation of what tripped the signal. */
    detail?: string;
}

export interface SignalReport {
    signals: BotSignal[];
    /** Sum of weights of the signals that fired. */
    score: number;
    /** Sum of weights of every signal evaluated. */
    maxScore: number;
    /** score / maxScore in [0, 1]; 0 when nothing could be evaluated. */
    suspicion: number;
}

const signal = (
    name: string,
    weight: number,
    detected: boolean,
    detail?: string,
): BotSignal => ({ name, weight, detected, detail });

/** Properties injected onto `window`/`document` by common automation tools. */
const AUTOMATION_GLOBAL_KEYS: readonly string[] = [
    "_phantom",
    "callPhantom", // PhantomJS
    "__nightmare", // Nightmare
    "_selenium",
    "calledSelenium",
    "__selenium_evaluate",
    "__selenium_unwrapped",
    "__fxdriver_evaluate",
    "__fxdriver_unwrapped",
    "__driver_evaluate",
    "__driver_unwrapped",
    "__webdriver_evaluate",
    "__webdriver_unwrapped",
    "__webdriver_script_fn",
    "__webdriver_script_func",
    "domAutomation",
    "domAutomationController", // Chrome automation
    "__playwright",
    "__puppeteer",
    "__pw_mangled",
];

const hasWindow = (): boolean => typeof window !== "undefined";

/**
 * `navigator.webdriver` is the spec-mandated flag for automated browsers. Stealth
 * plugins try to delete it, but its presence is a near-certain automation tell.
 */
export const detectWebDriver = (): BotSignal => {
    const detected = hasWindow() && navigator.webdriver === true;
    return signal("webdriver-flag", 4, detected, detected ? "navigator.webdriver === true" : undefined);
};

/** Look for globals that automation frameworks leak onto window/document. */
export const detectAutomationArtifacts = (): BotSignal => {
    if (!hasWindow()) return signal("automation-artifacts", 4, false);

    const win = window as unknown as Record<string, unknown>;
    const found = AUTOMATION_GLOBAL_KEYS.filter((key) => key in win);

    // chromedriver injects keys like `cdc_asdjflasutopfhvcZLmcfl_Array` onto document.
    try {
        const docKeys = Object.keys(document as unknown as Record<string, unknown>);
        if (docKeys.some((k) => k.startsWith("cdc_") || k.startsWith("$cdc_"))) {
            found.push("document.cdc_*");
        }
    } catch {
        /* accessing document keys can throw in odd sandboxes; ignore */
    }

    return signal(
        "automation-artifacts",
        4,
        found.length > 0,
        found.length > 0 ? `found: ${found.join(", ")}` : undefined,
    );
};

/**
 * A UA claiming Chrome/Chromium should expose `window.chrome`. Headless setups
 * that spoof the UA but forget the object are common.
 */
export const detectMissingChromeObject = (): BotSignal => {
    if (!hasWindow()) return signal("missing-window-chrome", 2, false);

    const claimsChrome = /\bChrome\/\d|\bCriOS\/\d/.test(navigator.userAgent);
    const hasChrome = "chrome" in window && (window as { chrome?: unknown }).chrome != null;
    const detected = claimsChrome && !hasChrome;

    return signal(
        "missing-window-chrome",
        2,
        detected,
        detected ? "UA claims Chrome but window.chrome is absent" : undefined,
    );
};

/** Real browsers populate `navigator.languages`; many headless contexts leave it empty. */
export const detectEmptyLanguages = (): BotSignal => {
    if (!hasWindow()) return signal("empty-languages", 2, false);

    const langs = navigator.languages;
    const detected = !langs || langs.length === 0;
    return signal("empty-languages", 2, detected, detected ? "navigator.languages is empty" : undefined);
};

/** A desktop UA reporting 0 logical cores is implausible on real hardware. */
export const detectImplausibleHardware = (): BotSignal => {
    if (!hasWindow()) return signal("implausible-hardware", 1, false);

    // `hardwareConcurrency` is undefined on some legit browsers, so only treat an
    // explicit 0 as suspicious.
    const cores = navigator.hardwareConcurrency;
    const detected = cores === 0;
    return signal("implausible-hardware", 1, detected, detected ? "hardwareConcurrency === 0" : undefined);
};

/**
 * Software renderers (SwiftShader, llvmpipe, Mesa) strongly correlate with
 * headless / virtualized environments that lack a real GPU.
 */
export const detectSoftwareWebGL = (): BotSignal => {
    if (!hasWindow()) return signal("software-webgl", 2, false);

    try {
        const canvas = document.createElement("canvas");
        const gl = (canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
        if (!gl) {
            // No WebGL at all is itself mildly suspicious on a modern desktop browser.
            return signal("software-webgl", 2, true, "no WebGL context available");
        }

        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        if (!ext) return signal("software-webgl", 2, false);

        const renderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? "");
        const detected = /swiftshader|llvmpipe|software|mesa offscreen/i.test(renderer);
        return signal("software-webgl", 2, detected, detected ? `renderer: ${renderer}` : undefined);
    } catch {
        return signal("software-webgl", 2, false);
    }
};

/**
 * The classic headless-Chrome tell: `Notification.permission` reports "denied"
 * while the Permissions API still reports "prompt" for notifications. Async
 * because it queries the Permissions API.
 */
export const detectPermissionsInconsistency = async (): Promise<BotSignal> => {
    const name = "permissions-inconsistency";
    if (!hasWindow() || typeof Notification === "undefined" || !navigator.permissions) {
        return signal(name, 3, false);
    }

    try {
        const status = await navigator.permissions.query({
            name: "notifications" as PermissionName,
        });
        const detected = Notification.permission === "denied" && status.state === "prompt";
        return signal(
            name,
            3,
            detected,
            detected ? "Notification.permission='denied' while Permissions API='prompt'" : undefined,
        );
    } catch {
        return signal(name, 3, false);
    }
};

const toReport = (signals: BotSignal[]): SignalReport => {
    const score = signals.reduce((sum, s) => sum + (s.detected ? s.weight : 0), 0);
    const maxScore = signals.reduce((sum, s) => sum + s.weight, 0);
    return {
        signals,
        score,
        maxScore,
        suspicion: maxScore === 0 ? 0 : score / maxScore,
    };
};

/** Run only the synchronous collectors. Safe to call during render. */
export const collectStaticSignals = (): SignalReport =>
    toReport([
        detectWebDriver(),
        detectAutomationArtifacts(),
        detectMissingChromeObject(),
        detectEmptyLanguages(),
        detectImplausibleHardware(),
        detectSoftwareWebGL(),
    ]);

/** Run every collector, including the async Permissions API check. */
export const collectAllSignals = async (): Promise<SignalReport> => {
    const staticReport = collectStaticSignals();
    const permissions = await detectPermissionsInconsistency();
    return toReport([...staticReport.signals, permissions]);
};

/**
 * Watches for genuine human interaction over time. Real users generate pointer
 * movement with varied timing/geometry; scripted clients tend to teleport the
 * cursor (zero-delta time) or never move it at all. This is the single hardest
 * class of signal for a bot to fake convincingly.
 *
 * Usage:
 *   const monitor = createInteractionMonitor();
 *   // ...later, when deciding whether to gate content...
 *   if (!monitor.hasHumanInteraction()) { report(monitor.getSignal()); }
 *   monitor.dispose();
 */
export interface InteractionMonitor {
    /** True once enough human-like interaction has been observed. */
    hasHumanInteraction(): boolean;
    /** Snapshot of the current evidence as a BotSignal (detected == looks bot-like). */
    getSignal(): BotSignal;
    /** Remove all listeners. Call when the monitor is no longer needed. */
    dispose(): void;
}

export const createInteractionMonitor = (minHumanEvents = 5): InteractionMonitor => {
    let interactions = 0;
    let humanLikeMoves = 0;
    let last: { x: number; y: number; t: number } | null = null;

    const onMove = (e: PointerEvent | MouseEvent): void => {
        const now = typeof performance !== "undefined" ? performance.now() : Date.now();
        if (last) {
            const dx = e.clientX - last.x;
            const dy = e.clientY - last.y;
            const dt = now - last.t;
            // Real movement covers ground over a non-zero, non-instant interval.
            if (dt > 0 && dt < 5000 && (Math.abs(dx) + Math.abs(dy)) > 0) {
                humanLikeMoves++;
            }
        }
        last = { x: e.clientX, y: e.clientY, t: now };
        interactions++;
    };

    const onDiscrete = (): void => {
        interactions++;
    };

    if (hasWindow()) {
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerdown", onDiscrete, { passive: true });
        window.addEventListener("keydown", onDiscrete, { passive: true });
        window.addEventListener("scroll", onDiscrete, { passive: true });
        window.addEventListener("touchstart", onDiscrete, { passive: true });
        window.addEventListener("wheel", onDiscrete, { passive: true });
    }

    const hasHumanInteraction = (): boolean =>
        interactions >= minHumanEvents && humanLikeMoves > 0;

    return {
        hasHumanInteraction,
        getSignal: (): BotSignal =>
            signal(
                "no-human-interaction",
                3,
                !hasHumanInteraction(),
                `interactions=${interactions}, humanLikeMoves=${humanLikeMoves}`,
            ),
        dispose: (): void => {
            if (!hasWindow()) return;
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerdown", onDiscrete);
            window.removeEventListener("keydown", onDiscrete);
            window.removeEventListener("scroll", onDiscrete);
            window.removeEventListener("touchstart", onDiscrete);
            window.removeEventListener("wheel", onDiscrete);
        },
    };
};
