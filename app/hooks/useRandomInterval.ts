import * as React from "react";

// React.useEffectEvent = React.experimental_useEffectEvent;

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface Options {
  minDelay: number;
  maxDelay: number;
}

export default function useRandomInterval(
  cb: () => void,
  { minDelay, maxDelay }: Options,
) {
  const handler = React.useEffectEvent(cb);
  const timeoutId = React.useRef(0);

  React.useEffect(() => {
    const interval = getRandomNumber(minDelay, maxDelay);
    timeoutId.current = window.setTimeout(handler, interval);
  }, [minDelay, maxDelay]);

  return function () {
    window.clearInterval(timeoutId.current);
  };
}
