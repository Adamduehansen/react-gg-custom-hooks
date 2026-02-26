// deno-lint-ignore-file no-window no-window-prefix
import * as React from "react";

const dispatchStorageEvent = (
  key: string,
  newValue: string | null | undefined,
) => {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
};

const setItem = (key: string, value: string | number) => {
  const stringifiedValue = JSON.stringify(value);
  window.sessionStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeItem = (key: string) => {
  window.sessionStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const getItem = (key: string) => {
  return window.sessionStorage.getItem(key);
};

const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);

  return function () {
    window.removeEventListener("storage", cb);
  };
};

const getServerSnapshot = () => {
  throw Error("useSessionStorage is a client-only hook");
};

export default function useSessionStorage(
  key: string,
  initialValue: string | number,
) {
  const getSnapshot = () => {
    return getItem(key);
  };

  const store = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setState = (value: string | ((value: string) => string | null)) => {
    const nextState = typeof value === "function"
      ? value(JSON.parse(store || ""))
      : value;

    if (nextState === null) {
      removeItem(key);
    } else {
      setItem(key, nextState);
    }
  };

  return [store ? JSON.parse(store) : initialValue, setState];
}
