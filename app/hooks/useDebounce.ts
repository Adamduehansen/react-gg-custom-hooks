import * as React from "react";

export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  const timeoutId = React.useRef(0);

  React.useEffect(() => {
    timeoutId.current = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return function () {
      window.clearTimeout(timeoutId.current);
    };
  }, [value]);

  return debouncedValue;
}
