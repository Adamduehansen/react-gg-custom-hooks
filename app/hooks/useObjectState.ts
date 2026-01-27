import * as React from "react";

const isPlainObject = (value: unknown) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

type SetObjectStateAction<T> = Partial<T> | ((s: T) => Partial<T>);

export default function useObjectState<T extends Record<string, unknown>>(
  initialValue: T,
): [T, (newState: SetObjectStateAction<T>) => void] {
  const [value, setValue] = React.useState<T>(initialValue);

  const updateState = React.useCallback((arg: SetObjectStateAction<T>) => {
    if (typeof arg === "function") {
      setValue((current) => {
        const newState = arg(value);
        if (isPlainObject(newState)) {
          return {
            ...current,
            ...newState,
          };
        } else {
          return current;
        }
      });
    } else {
      if (isPlainObject(arg)) {
        setValue((current) => {
          return {
            ...current,
            ...arg,
          };
        });
      }
    }
  }, []);

  return [value, updateState];
}
