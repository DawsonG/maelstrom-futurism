import { isRealUserAgent } from "./userAgent";

export interface ProtectionMethodFlags {
    userAgent?: boolean;
    resolutionCheck?: boolean;
    imageResolver?: boolean;
}

export const defaultMethodFlags: ProtectionMethodFlags = {
    userAgent: true,
    resolutionCheck: false,
    imageResolver: false,
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
 * Of course, we want to make these checks configurable since they can trip up disability
 * aids such as screenreaders.
 */

const isBot = (methodFlags: ProtectionMethodFlags) => {
    let rtn = false;
    const getValueOrDefault = (key: keyof ProtectionMethodFlags): boolean =>
        methodFlags[key] === undefined ? defaultMethodFlags[key]! : methodFlags[key];

    if (getValueOrDefault('userAgent')) {
        rtn = isRealUserAgent(navigator.userAgent);
    }

    if (getValueOrDefault('resolutionCheck')) {
        // noop
    }

    if (getValueOrDefault('imageResolver')) {
        // noop
    }

    return rtn;
}

export default isBot;