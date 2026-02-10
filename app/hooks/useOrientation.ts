// deno-lint-ignore-file no-window no-window-prefix
import * as React from "react";

export default function useOrientation() {
  const [orientation, setOrientation] = React.useState({
    angle: 0,
    type: "UNKNOWN",
  });

  React.useLayoutEffect(() => {
    function handleScreenChange() {
      const { angle, type } = window.screen.orientation;

      setOrientation({
        angle: angle,
        type: type,
      });
    }

    function handleOrientationChange() {
      setOrientation({
        type: "UNKNOWN",
        angle: window.orientation,
      });
    }

    if (window.screen?.orientation) {
      handleScreenChange();
      window.screen.orientation.addEventListener("change", handleScreenChange);
    } else {
      handleOrientationChange();
      window.addEventListener("orientationchange", handleOrientationChange);
    }

    return function () {
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener(
          "change",
          handleScreenChange,
        );
      } else {
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange,
        );
      }
    };
  }, []);

  return orientation;
}
