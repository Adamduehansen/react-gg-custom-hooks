import * as React from "react";

function subscribe(cb: () => void): () => void {
  return function () {};
}

function getSnapshot(): boolean {
  return false;
}

export default function useMediaQuery(mediaQuery: string): boolean {
  const subscribe = React.useCallback((cb: () => void) => {
    const matchMedia = window.matchMedia(mediaQuery);

    matchMedia.addEventListener("change", cb);

    return function () {
      matchMedia.removeEventListener("change", cb);
    };
  }, [mediaQuery]);

  const getSnapshot = React.useCallback(() => {
    return window.matchMedia(mediaQuery).matches;
  }, [mediaQuery]);

  return React.useSyncExternalStore(subscribe, getSnapshot);
}
