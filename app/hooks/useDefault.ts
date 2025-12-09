import * as React from "react";

export default function useDefault<T>(
  initialState: T,
  defaultState: T,
): [T, (state: T | null | undefined) => void] {
  const cachedDefaultValue = React.useRef<T>(defaultState);
  const [state, setState] = React.useState<T | null | undefined>(initialState);

  function updateState(value: T | null | undefined) {
    setState(value);
  }

  return [state || cachedDefaultValue.current, updateState];
}
