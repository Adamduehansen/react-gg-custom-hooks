import * as React from "react";

// React.useEffectEvent = React.experimental_useEffectEvent;

export default function useLogger(name: string, ...args: unknown[]) {
  const initialRender = React.useRef(true);

  const handleLog = React.useEffectEvent((event: string) => {
    console.log(`${name} ${event}:`, args);
  });

  React.useEffect(() => {
    handleLog("mounted");
    initialRender.current = false;

    return function () {
      initialRender.current = true;
      handleLog("unmounted");
    };
  }, []);

  React.useEffect(() => {
    if (initialRender.current === false) {
      handleLog("updated");
    }
  }, [args]);
}
