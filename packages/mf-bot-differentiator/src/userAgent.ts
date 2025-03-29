//([(Mozilla|AppleWebKit|Safari|Chrome|Mobile|Version)\/[\d\.E]+ \([\w\.\ \;]+\)\s)+



export const isRealUserAgent = (agent?: string | null) => {
    // Exclude anything that doesn't send a user agent at all
    if ((agent?.trim()?.length || 0) <= 0) return false;

    // Exclude crawlers that identify themselves with "Headless"
    if (agent!.match(/Headless/gi)) return false;

    return true;
};