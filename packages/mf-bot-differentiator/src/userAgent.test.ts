import { describe, expect, test } from "vitest";
import { evaluateRealUserAgent, isRealUserAgent } from "./userAgent";
import { Confidence } from "./types";

describe("userAgent", () => {
    const realAgents = [
        // Chrome
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/133.0.6943.84 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.6943.89 Mobile Safari/537.36",
        // Mozilla
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.7; rv:135.0) Gecko/20100101 Firefox/135.0",
        "Mozilla/5.0 (X11; Linux i686; rv:135.0) Gecko/20100101 Firefox/135.0",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/135.0 Mobile/15E148 Safari/605.1.15",
        "Mozilla/5.0 (Android 15; Mobile; rv:135.0) Gecko/135.0 Firefox/135.0",
        // Edge
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/131.0.2903.86",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/131.0.2903.86",
        "Mozilla/5.0 (Linux; Android 10; HD1913) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.6943.89 Mobile Safari/537.36 EdgA/131.0.2903.87",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 EdgiOS/131.2903.92 Mobile/15E148 Safari/605.1.15"
    ];

    const fakeAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 HeadlessFirefox/135.0",
        "libcurl",
        "Mozilla",
        "BIZCO EasyScraping Studio 2.0",
        "Java stuff/143.15",
        "Mozilla/153.0 (OpenAI scraper)",
        "Mozilla/5.0",
        undefined,
        null,
        "",
        " ",
    ];

    describe("real agents", () => {
        realAgents.forEach(agent => {
            test(`should return true for real browser user agents - ${agent}`, () => {
                expect(isRealUserAgent(agent)).toBe(true);
            });
        });
    });

    describe("headless/fake agents", () => {
        fakeAgents.forEach(agent => {
            test(`should return false for headless/fake user agents - ${agent}`, () => {
                expect(isRealUserAgent(agent)).toBe(false);
            });
        });
    });

    describe('evaluateRealUserAgent', () => {
        test("should return Confidence.NO when the userAgent doesn't start with " +
            "Mozilla/5.0 and doesn't contain a valid rendering engine", () => {
            const userAgent = 'Fakezilla/5.0; and nothing else';
            expect(evaluateRealUserAgent(userAgent)).toBe(Confidence.NO);
        });

        test("should return Confidence.PROBABLY_NO when the userAgent is " +
            "missing Mozilla/5.0 or missing valid rendering engine", () => {

            expect(evaluateRealUserAgent('Mozilla/5.0 but no rendering engine'))
                .toBe(Confidence.PROBABLY_NO);
            expect(evaluateRealUserAgent('Fakezilla/5.0 Blink 05.44.55'))
                .toBe(Confidence.PROBABLY_NO);
        });
    });
});