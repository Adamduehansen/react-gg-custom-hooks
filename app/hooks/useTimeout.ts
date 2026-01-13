import * as React from "react";

export default function useTimeout(cb: () => void, ms: number) {
  const onTimeout = React.useEffectEvent(cb);
  const timeoutId = React.useRef(0);

  React.useEffect(() => {
    timeoutId.current = window.setTimeout(onTimeout, ms);

    return function () {
      window.clearTimeout(timeoutId.current);
    };
  }, [ms]);

  return () => {
    window.clearTimeout(timeoutId.current);
  };
}
