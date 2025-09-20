import { evaluateRealUserAgent } from "./userAgent";

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
    let score = 0;
    let thresholdScore = 0; // Each method we use raises the threshold score for surity of "bot"
    const getValueOrDefault = (key: keyof ProtectionMethodFlags): boolean =>
        methodFlags[key] === undefined ? defaultMethodFlags[key]! : methodFlags[key];

    if (getValueOrDefault('userAgent')) {
        score += evaluateRealUserAgent(navigator.userAgent);
        thresholdScore += 2;
    }

    if (getValueOrDefault('resolutionCheck')) {
        score += evaluateResolution(window.innerWidth, window.innerHeight);
        thresholdScore += 1;
    }

    if (getValueOrDefault('imageResolver')) {
        score += await evaluateImageLoading();
        thresholdScore += 1;
    }

    if (getValueOrDefault('cssSupported')) {
        score += evaluateCssSupported();
        thresholdScore += 1;
    }

    return score >= thresholdScore;
}

const evaluateResolution = (w: number, h: number): number => {
    return w * h > 4400 ? 0 : 1;
}

const evaluateImageLoading = (): Promise<number> => new Promise((resolve) => {
    const img = new Image();

    img.onload = function() {
        if (img.naturalWidth === 0 && img.naturalHeight === 0) {
            resolve(1);
        }

        resolve(0);
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