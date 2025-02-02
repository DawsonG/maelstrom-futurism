export const isFunction = (analysisTarget: any) =>
  analysisTarget && {}.toString.call(analysisTarget) === "[object Function]";
