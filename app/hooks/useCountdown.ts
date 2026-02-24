// deno-lint-ignore-file no-window no-window-prefix
import * as React from "react";

// React.useEffectEvent = React.experimental_useEffectEvent;

interface Options {
  interval: number;
  onTick: () => void;
  onComplete: (time: number) => void;
}

export default function useCountdown(endTime: Date, options: Options) {
  const [count, setCount] = React.useState(
    Math.round((endTime - Date.now()) / options.interval),
  );
  const intervalId = React.useRef(0);

  function clearInterval() {
    window.clearInterval(intervalId.current);
  }

  const onTick = React.useEffectEvent(() => {
    if (count === 0) {
      clearInterval();
      options.onComplete();
    } else {
      setCount((current) => current - 1);
      options.onTick();
    }
  });

  React.useEffect(() => {
    setCount(Math.round((endTime - Date.now()) / options.interval));
  }, [endTime, options.interval]);

  React.useEffect(() => {
    intervalId.current = window.setInterval(onTick, options.interval);

    return function () {
      clearInterval();
    };
  }, [options.interval]);

  return count;
}
