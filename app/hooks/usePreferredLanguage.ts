import * as React from "react";

function subscribe(callback: () => void) {
  window.addEventListener("languagechange", callback);

  return function () {
    window.removeEventListener("languagechange", callback);
  };
}

function getSnapshot(): string {
  return navigator.language;
}

export default function usePreferredLanguage(): string {
  return React.useSyncExternalStore(subscribe, getSnapshot);
}
