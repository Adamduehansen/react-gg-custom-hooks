import * as React from "react";

// React.useEffectEvent = React.experimental_useEffectEvent;

export default function useClickAway<T extends HTMLElement>(
  cb: (event: MouseEvent | TouchEvent) => void,
): React.RefObject<T | null> {
  const ref = React.useRef<T>(null);

  const clickHandler = React.useEffectEvent(
    (event: MouseEvent | TouchEvent) => {
      if (ref.current === null || event.target === null) {
        return;
      }

      if (!ref.current.contains(event.target)) {
        cb(event);
      }
    },
  );

  React.useEffect(() => {
    document.addEventListener("click", clickHandler);
    document.addEventListener("touchstart", clickHandler);

    return function () {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("touchstart", clickHandler);
    };
  }, []);

  return ref;
}
