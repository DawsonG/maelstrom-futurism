import { evaluateRealUserAgent } from "./userAgent";
import { Confidence } from "./types";

export interface ProtectionMethodFlags {
    userAgent?: boolean;
    resolutionCheck?: boolean;
    imageResolver?: boolean;
    cssSupported?: boolean;
}

export const defaultMethodFlags: ProtectionMethodFlags = {
    userAgent: true,
    resolutionCheck: false,
    imageResolver: false,
    cssSupported: false,
}

/**
 * We're using a smattering of methods from an old file posted to Github
 * https://github.com/JonasCz/How-To-Prevent-Scraping/blob/master/README.md
 * 
 * Large companies usually have server side lists of bad actors that they can refer to,
 * but we don't.  In fact, we have to do all of this client side.
 * 
 * The gist is, we'll first check to see if the bot is sloppily written or perhaps
 * well behaved (ie. it identified itself as a bot) before we move on to other methods.
 * Next we'll see if we have a resolution and if that resolution makes sense. Finally
 * we'll look at whether or not it requests resources like CSS and images.
 * 
 * Of course, we want to make these checks configurable since they can trip up accessibility
 * aids such as screenreaders.
 */

const isBot = async (methodFlags: ProtectionMethodFlags) => {
    // Every method contributes to `score` on the SAME scale: higher == more
    // bot-like. `maxScore` is the total weight of the enabled methods, so the
    // final decision is "did the majority of available evidence point to a bot".
    let score = 0;
    let maxScore = 0;
    const getValueOrDefault = (key: keyof ProtectionMethodFlags): boolean =>
        methodFlags[key] === undefined ? defaultMethodFlags[key]! : methodFlags[key];

    if (getValueOrDefault('userAgent')) {
        // evaluateRealUserAgent is a *realness* score (higher == more human),
        // so invert it into bot points before adding it to the bot score.
        score += Confidence.YES - evaluateRealUserAgent(navigator.userAgent);
        maxScore += Confidence.YES;
    }

    if (getValueOrDefault('resolutionCheck')) {
        score += evaluateResolution(window.innerWidth, window.innerHeight);
        maxScore += 1;
    }

    if (getValueOrDefault('imageResolver')) {
        score += await evaluateImageLoading();
        maxScore += 1;
    }

    if (getValueOrDefault('cssSupported')) {
        score += evaluateCssSupported();
        maxScore += 1;
    }

    // No checks enabled means we have no evidence either way; never accuse.
    if (maxScore === 0) return false;

    return score > maxScore / 2;
}

const evaluateResolution = (w: number, h: number): number => {
    return w * h > 4400 ? 0 : 1;
}

const evaluateImageLoading = (): Promise<number> => new Promise((resolve) => {
    const img = new Image();

    img.onload = function() {
        // A decoded 1x1 pixel reports non-zero natural dimensions; a client that
        // fires onload without actually decoding (0x0) is behaving bot-like.
        resolve(img.naturalWidth === 0 && img.naturalHeight === 0 ? 1 : 0);
    };

    img.onerror = function() {
        resolve(1);
    };

    // a png of 1px by 1px
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAD0lEQVR4AQEEAPv/AIQfFQHjALmSOz/DAAAAAElFTkSuQmCC';
});

const evaluateCssSupported = () => {
    if (!CSS.supports('display: block')) return 1; // no way

    return 0;
};

export default isBot;