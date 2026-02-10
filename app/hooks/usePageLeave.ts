import * as React from "react";

export default function usePageLeave(cb: () => void) {
  const callback = React.useEffectEvent(cb);

  React.useEffect(() => {
    function onMouseOut(event: MouseEvent) {
      const to = event.relatedTarget || event.toElement;
      if (!to || to.nodeName === "HTML") {
        callback();
      }
    }

    document.addEventListener("mouseout", onMouseOut);

    return function () {
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);
}
