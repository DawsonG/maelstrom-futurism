//([(Mozilla|AppleWebKit|Safari|Chrome|Mobile|Version)\/[\d\.E]+ \([\w\.\ \;]+\)\s)+



export const isRealUserAgent = (agent: string) => {
    // Exclude crawlers that identify themselves with "Headless"
    if (agent.match(/Headless/)) { return false; }

    return true;
};