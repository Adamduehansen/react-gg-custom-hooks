// deno-lint-ignore-file no-window no-window-prefix
import * as React from "react";

const isShallowEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};

function getConnection() {
  return (
    navigator?.connection ||
    navigator?.mozConnection ||
    navigator?.webkitConnection
  );
}

function subscribe(cb: () => void): () => void {
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);

  const connection = getConnection();

  if (connection) {
    connection.addEventListener("change", cb, { passive: true });
  }

  return function () {
    window.removeEventListener("online", cb);
    window.removeEventListener("offline", cb);

    if (connection) {
      connection.removeEventListener("change", cb);
    }
  };
}

function getServerSnapshot(): unknown {
  throw new Error("useNetworkState is a client-only hook");
}

export default function useNetworkState() {
  const cache = React.useRef({});

  function getSnapshot() {
    const online = navigator.onLine;
    const connection = getConnection();

    const nextState = {
      online,
      downlink: connection?.downlink,
      downlinkMax: connection?.downlinkMax,
      effectiveType: connection?.effectiveType,
      rtt: connection?.rtt,
      saveData: connection?.saveData,
      type: connection?.type,
    };

    if (isShallowEqual(cache.current, nextState)) {
      return cache.current;
    } else {
      cache.current = nextState;
      return nextState;
    }
  }

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
