import * as React from "react";

export default function useLockBodyScroll() {
  React.useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return function () {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
}
