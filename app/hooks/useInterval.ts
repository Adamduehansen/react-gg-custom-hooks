import * as React from "react";

// React.useEffectEvent = React.experimental_useEffectEvent;

export default function useInterval(cb: () => void, ms: number): () => void {
  const timerId = React.useRef(0);
  const onInterval = React.useEffectEvent(cb);
  const clear = React.useCallback(() => {
    window.clearInterval(timerId.current);
  }, []);

  React.useEffect(() => {
    timerId.current = window.setInterval(onInterval, ms);
    return clear;
  }, []);

  return clear;
}
