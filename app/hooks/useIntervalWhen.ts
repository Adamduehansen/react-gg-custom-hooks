import * as React from "react";

// React.useEffectEvent = React.experimental_useEffectEvent;

interface Options {
  ms: number;
  when: boolean;
  startImmediately: boolean;
}

export default function useIntervalWhen(
  cb: () => void,
  { ms, when, startImmediately }: Options,
) {
  const onInterval = React.useEffectEvent(cb);
  const intervalId = React.useRef(0);

  React.useEffect(() => {
    if (when && startImmediately) {
      onInterval();
    }

    intervalId.current = window.setInterval(() => {
      if (when === false) {
        return;
      }

      onInterval();
    }, ms);

    return function () {
      window.clearInterval(intervalId.current);
    };
  }, [ms, when, startImmediately]);

  return function () {
    window.clearInterval(intervalId.current);
  };
}
