export const isFunction = (analysisTarget: any) =>
    analysisTarget && Object.prototype.toString.call(analysisTarget) === "[object Function]";

export const isString = (analysisTarget: any) =>
    typeof analysisTarget === 'string' || analysisTarget instanceof String;