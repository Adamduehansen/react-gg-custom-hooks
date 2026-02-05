import * as React from "react";

interface ScrollPosition {
  x: number;
  y: number;
}

export default function useWindowScroll(): [
  ScrollPosition,
  (...arg2: any) => void,
] {
  const [state, setState] = React.useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    function onScroll(): void {
      setState({
        x: window.scrollX,
        y: window.scrollY,
      });
    }

    window.addEventListener("scroll", onScroll);

    return function () {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = function (arg1: unknown, arg2?: unknown) {
    if (typeof arg1 === "number" && typeof arg2 === "number") {
      window.scrollTo(arg1, arg2);
    } else if (typeof arg1 === "object" && arg1 !== null) {
      window.scrollTo(arg1);
    } else {
      throw new Error();
    }
  };

  return [state, scrollTo];
}
