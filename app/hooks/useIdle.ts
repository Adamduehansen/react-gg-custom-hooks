// deno-lint-ignore-file no-window no-window-prefix
import * as React from "react";

function throttle(cb: () => void, ms: number) {
  let lastTime = 0;
  return () => {
    const now = Date.now();
    if (now - lastTime >= ms) {
      cb();
      lastTime = now;
    }
  };
}

export default function useIdle(ms = 1000 * 20) {
  const [idle, setIdle] = React.useState(false);

  React.useEffect(() => {
    let timeoutId = 0;

    function handleTimeout() {
      setIdle(true);
    }

    const handleEvent = throttle(() => {
      setIdle(false);
      window.clearTimeout(timeoutId);
      timeoutId = setTimeout(handleTimeout, ms);
    }, ms);

    timeoutId = window.setTimeout(handleTimeout, ms);

    window.addEventListener("mousemove", handleEvent);
    window.addEventListener("mousedown", handleEvent);
    window.addEventListener("resize", handleEvent);
    window.addEventListener("keydown", handleEvent);
    window.addEventListener("touchstart", handleEvent);
    window.addEventListener("wheel", handleEvent);
    document.addEventListener("visibilitychange", handleEvent);

    return function () {
      window.clearTimeout(timeoutId);
      window.removeEventListener("mousemove", handleEvent);
      window.removeEventListener("mousedown", handleEvent);
      window.removeEventListener("resize", handleEvent);
      window.removeEventListener("keydown", handleEvent);
      window.removeEventListener("touchstart", handleEvent);
      window.removeEventListener("wheel", handleEvent);
      document.removeEventListener("visibilitychange", handleEvent);
      window.clearTimeout(timeoutId);
    };
  }, [ms]);

  return idle;
}
