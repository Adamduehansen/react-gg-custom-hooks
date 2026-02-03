import * as React from "react";

interface Mouse {
  x: number;
  y: number;
  elementX: number;
  elementY: number;
  elementPositionX: number;
  elementPositionY: number;
}

export default function useMouse(): [
  Mouse,
  React.RefObject<HTMLElement | null>,
] {
  const [state, setState] = React.useState({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
  });

  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    function mouseoverHandler(event: MouseEvent) {
      if (ref.current === null) {
        setState((current) => {
          return {
            ...current,
            x: event.clientX,
            y: event.clientY,
          };
        });
      } else {
        const { x, y } = ref.current.getBoundingClientRect();
        setState((current) => {
          return {
            x: event.clientX,
            y: event.clientY,
            elementX: event.clientX - x,
            elementY: event.clientY - y,
            elementPositionX: x,
            elementPositionY: y,
          };
        });
      }
    }

    document.addEventListener("mousemove", mouseoverHandler);

    return function () {
      document.removeEventListener("mousemove", mouseoverHandler);
    };
  }, []);

  return [state, ref];
}
