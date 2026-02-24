// deno-lint-ignore-file no-window no-window-prefix
import * as React from "react";

const dispatchStorageEvent = (
  key: string,
  newValue: string | null | undefined,
) => {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
};

const setItem = (key: string, value: string) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const getItem = (key: string) => {
  return window.localStorage.getItem(key);
};

const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);

  return function () {
    window.removeEventListener("storage", cb);
  };
};

const getServerSnapshot = () => {
  throw Error("useLocalStorage is a client-only hook");
};

export default function useLocalStorage(
  key: string,
  initialValue: string | null,
) {
  const getSnapshot = () => {
    return getItem(key);
  };

  const store = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  function setState(value: string | ((value: string) => string | null)) {
    if (store === null) {
      return;
    }

    const nextState = typeof value === "function"
      ? value(JSON.parse(store))
      : value;

    if (nextState === null) {
      removeItem(key);
    } else {
      setItem(key, nextState);
    }
  }

  return [store ? JSON.parse(store) : initialValue, setState];
}
