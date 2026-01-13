import * as React from "react";

export default function useWindowSize() {
  const [size, setSize] = React.useState(() => {
    return {
      width: 0,
      height: 0,
    };
  });

  React.useLayoutEffect(() => {
    function onResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    onResize();

    window.addEventListener("resize", onResize);

    return function () {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return size;
}
