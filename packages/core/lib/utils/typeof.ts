export const isFunction = (analysisTarget: unknown) =>
  analysisTarget && Object.prototype.toString.call(analysisTarget) === '[object Function]';

export const isString = (analysisTarget: unknown) =>
  typeof analysisTarget === 'string' || analysisTarget instanceof String;
