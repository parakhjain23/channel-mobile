export function Throttling(func, delay) {
  const throttle = (func, delay) => {
    let timeoutId;
    let shouldExecute = false;

    const throttledFunc = (...args) => {
      if (!shouldExecute) {
        shouldExecute = true;
        // func(...args);
        timeoutId = setTimeout(() => {
          func(...args);
          shouldExecute = false;
        }, delay);
      }
    };

    throttledFunc.cancel = () => {
      clearTimeout(timeoutId);
      shouldExecute = false;
    };

    return throttledFunc;
  };

  const throttledFetchData = throttle(func, delay); // Throttle to execute at most once every 1000ms (1 second)

  throttledFetchData(); // Throttled API call

  return () => {
    throttledFetchData.cancel(); // Cancel the throttle when component unmounts
  };
}
