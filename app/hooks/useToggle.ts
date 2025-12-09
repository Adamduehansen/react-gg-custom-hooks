import * as React from "react";

export default function useToggle(
  defaultState: unknown,
): [boolean, (newState?: unknown) => void] {
  const [value, setValue] = React.useState(Boolean(defaultState));

  function updateValue(newValue: unknown) {
    if (typeof newValue === "boolean") {
      if (newValue !== value) {
        setValue(newValue);
      }
    } else {
      setValue((current) => !current);
    }
  }

  return [value, updateValue];
}
