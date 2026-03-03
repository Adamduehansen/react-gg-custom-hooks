// deno-lint-ignore-file no-window no-window-prefix
import * as React from "react";

export function isTouchEvent({ nativeEvent }: React.SyntheticEvent) {
  return window.TouchEvent
    ? nativeEvent instanceof TouchEvent
    : "touches" in nativeEvent;
}

export function isMouseEvent(event: React.SyntheticEvent) {
  return event.nativeEvent instanceof MouseEvent;
}

interface Options {
  threshold?: number;
  onStart?: (event: React.SyntheticEvent) => void;
  onFinish?: (event: React.SyntheticEvent) => void;
  onCancel?: (event: React.SyntheticEvent) => void;
}

export default function useLongPress(
  callback: () => void,
  options: Options = {},
) {
  const timeoutId = React.useRef<number>(undefined);
  const { threshold = 400, onStart, onFinish, onCancel } = options;

  return React.useMemo(() => {
    if (typeof callback !== "function") {
      return {};
    }

    function start(event: React.SyntheticEvent) {
      if (isTouchEvent(event) === false && isMouseEvent(event) === false) {
        return;
      }

      if (onStart) {
        onStart(event);
      }

      timeoutId.current = window.setTimeout(() => {
        timeoutId.current = undefined;
        if (onFinish) {
          onFinish(event);
        }
        callback();
      }, threshold);
    }

    function cancel(event: React.SyntheticEvent) {
      if (timeoutId.current && onCancel) {
        onCancel(event);
        window.clearTimeout(timeoutId.current);
      }
    }

    const mouseHandlers = {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
    };

    const touchHandlers = {
      onTouchStart: start,
      onTouchEnd: cancel,
    };

    return {
      ...mouseHandlers,
      ...touchHandlers,
    };
  }, [callback, threshold, onCancel, onFinish, onStart]);
}
