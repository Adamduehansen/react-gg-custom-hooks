// deno-lint-ignore-file no-window-prefix no-window
import * as React from "react";

export default function useThrottle<T>(value: T, interval = 500) {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastUpdated = React.useRef<number>(undefined);

  React.useEffect(() => {
    const now = new Date().getTime();
    if (
      lastUpdated.current !== undefined &&
      now > lastUpdated.current + interval
    ) {
      setThrottledValue(value);
      lastUpdated.current = new Date().getTime();
    } else {
      const id = window.setTimeout(() => {
        setThrottledValue(value);
        lastUpdated.current = new Date().getTime();
      }, interval);

      return function () {
        window.clearTimeout(id);
      };
    }
  }, [value]);

  return throttledValue;
}
