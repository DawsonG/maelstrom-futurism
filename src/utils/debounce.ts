export default (func, delay) => {
  let inDebounce = undefined;

  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    return (inDebounce = setTimeout(function() {
      return func.apply(context, args);
    }, delay));
  };
};
