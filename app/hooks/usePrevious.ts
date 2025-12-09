import * as React from "react";

interface ReducerState<T> {
  previous: T | null;
  current: T | null;
}

export default function usePrevious<T>(value: T): T | null {
  const [state, dispatch] = React.useReducer<ReducerState<T>, [T]>(
    (state, payload) => {
      return {
        current: payload,
        previous: state.current,
      };
    },
    {
      current: null,
      previous: null,
    },
  );

  React.useEffect(() => {
    dispatch(value);
  }, [value]);

  return state.previous;
}
