import { afterEach, describe, expect, test, vi } from "vitest";

import isBot from "./isBot";

const setUserAgent = (value: string) => {
    Object.defineProperty(navigator, "userAgent", {
        value,
        configurable: true,
    });
};

const CHROME_UA =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36";

describe("isBot", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("default config (userAgent only)", () => {
        test("classifies a real browser user agent as NOT a bot", async () => {
            setUserAgent(CHROME_UA);
            expect(await isBot({})).toBe(false);
        });

        test("classifies a missing/garbage user agent AS a bot", async () => {
            setUserAgent("");
            expect(await isBot({})).toBe(true);

            setUserAgent("libcurl");
            expect(await isBot({})).toBe(true);
        });
    });

    test("returns false when no methods are enabled (no evidence)", async () => {
        setUserAgent("libcurl");
        expect(
            await isBot({
                userAgent: false,
                resolutionCheck: false,
                imageResolver: false,
                cssSupported: false,
            }),
        ).toBe(false);
    });
});
