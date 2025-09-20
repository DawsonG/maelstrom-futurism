//([(Mozilla|AppleWebKit|Safari|Chrome|Mobile|Version)\/[\d\.E]+ \([\w\.\ \;]+\)\s)+

import { Confidence } from "./types";

const containsOneOf = (agent: string, searchValues: string[]): boolean => {
    const rtnValues = searchValues.filter(value => agent.includes(value));

    if (rtnValues.length !== 1) {
        // must contain EXACTLY ONE MATCH
        return false;
    }

    return true;
};

// Get a confidence interval
export const evaluateRealUserAgent = (agent?: string | null): Confidence => {
    // Exclude anything that doesn't send a user agent at all
    if (!agent || (agent?.trim()?.length || 0) <= 0) return Confidence.NO;

    // Exclude crawlers that identify themselves with "Headless"
    if (agent!.match(/Headless/gi)) return Confidence.NO;

    let conditionalChecks = 0;
    // All valid userAgent strings start with Mozilla/5.0
    if (!agent?.startsWith('Mozilla/5.0')) conditionalChecks++;

    // Should contain a valid rendering engine
    if (!containsOneOf(agent, ['Blink', 'Gecko', 'Webkit', 'Trident', 'Presto'])) conditionalChecks++;

    if (conditionalChecks === 2) return Confidence.NO;
    else if (conditionalChecks === 1) return Confidence.PROBABLY_NO;
    
    return Confidence.YES;
};

// Convert confidence interval to true/false
export const isRealUserAgent = (agent?: string | null): boolean => 
    evaluateRealUserAgent(agent) >= 2;