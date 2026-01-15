import * as React from "react";

function getSnapshot() {
  return document.visibilityState;
}

function subscribe(cb: () => void): () => void {
  document.addEventListener("visibilitychange", cb);

  return function () {
    document.removeEventListener("visibilitychange", cb);
  };
}

export default function useVisibilityChange() {
  const visibilityState = React.useSyncExternalStore(subscribe, getSnapshot);
  return visibilityState === "visible";
}
