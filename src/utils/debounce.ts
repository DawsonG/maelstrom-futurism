export default (func: () => void, delay: number) => {
  let inDebounce: ReturnType<typeof setTimeout> | undefined = undefined;

  return function (this: unknown) {
    const context = this;
    const args = arguments;
    if (inDebounce) clearTimeout(inDebounce);
    inDebounce = setTimeout(() => {
      return func.apply(context, args);
    }, delay);
    return inDebounce;
  };
};
