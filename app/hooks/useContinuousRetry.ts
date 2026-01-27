import * as React from "react";

// React.useEffectEvent = React.experimental_useEffectEvent;

interface Options {
  maxRetries?: number;
}

export default function useContinuousRetry(
  callback: () => boolean,
  interval: number = 100,
  options: Options = {},
) {
  const { maxRetries = Infinity } = options;
  const [hasResolved, setHasResolved] = React.useState(false);
  const onInterval = React.useEffectEvent(callback);
  const intervalId = React.useRef(0);

  React.useEffect(() => {
    let counter = 0;
    intervalId.current = window.setInterval(() => {
      if (onInterval() === true || counter++ >= maxRetries) {
        window.clearInterval(intervalId.current);
        setHasResolved(true);
      }
    }, interval);

    return function () {
      window.clearInterval(intervalId.current);
    };
  }, [interval, maxRetries]);

  return hasResolved;
}
