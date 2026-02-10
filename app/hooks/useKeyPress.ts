import * as React from "react";

// React.useEffectEvent = React.experimental_useEffectEvent;

type KeyEvent = keyof Pick<WindowEventMap, "keydown" | "keypress" | "keyup">;

interface Options {
  event?: KeyEvent;
  target?: Window;
  eventOptions?: unknown;
}

export default function useKeyPress(
  key: string,
  cb: () => void,
  options: Options = {},
) {
  const { event = "keydown", target = window ?? null, eventOptions } = options;
  const callback = React.useEffectEvent(cb);

  React.useEffect(() => {
    function onKeyEvent(event: Event) {
      if (event.key === key) {
        callback();
      }
    }

    target.addEventListener(event, onKeyEvent, eventOptions);

    return function () {
      target.removeEventListener(event, onKeyEvent);
    };
  }, []);
}
