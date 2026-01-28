import * as React from "react";

// React.useEffectEvent = React.experimental_useEffectEvent;

export default function useEventListener(
  target: Node,
  eventName: string,
  handler: (...args: any[]) => void,
  options = {},
) {
  const onHandle = React.useEffectEvent(handler);

  React.useEffect(() => {
    if (target.addEventListener) {
      target.addEventListener(eventName, onHandle);
    }

    return function () {
      target.removeEventListener(eventName, onHandle);
    };
  }, [target, eventName, handler]);
}
