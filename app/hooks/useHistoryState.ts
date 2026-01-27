import * as React from "react";

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

const initialState: HistoryState<any> = {
  past: [],
  present: null,
  future: [],
};

type Action<T> =
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET"; newPresent: T }
  | { type: "CLEAR"; initialPresent: T };

const reducer = <T>(state: HistoryState<T>, action: Action<T>) => {
  const { past, present, future } = state;

  if (action.type === "UNDO") {
    return {
      past: past.slice(0, past.length - 1),
      present: past[past.length - 1],
      future: [present, ...future],
    };
  } else if (action.type === "REDO") {
    return {
      past: [...past, present],
      present: future[0],
      future: future.slice(1),
    };
  } else if (action.type === "SET") {
    const { newPresent } = action;

    if (action.newPresent === present) {
      return state;
    }

    return {
      past: [...past, present],
      present: newPresent,
      future: [],
    };
  } else if (action.type === "CLEAR") {
    return {
      ...initialState,
      present: action.initialPresent,
    };
  } else {
    throw new Error("Unsupported action type");
  }
};

interface UseHistoryStateReturn<T> {
  state: T;
  canUndo: boolean;
  canRedo: boolean;
  set: (state: T) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
}

export default function useHistoryState<T extends Record<string, unknown>>(
  initialPresent: T = {} as T,
): UseHistoryStateReturn<T> {
  const [{ past, present, future }, dispatch] = React.useReducer(
    reducer,
    {
      past: [],
      present: initialPresent,
      future: [],
    } as HistoryState<T>,
  );

  return {
    state: present,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    set: (state: T) => dispatch({ type: "SET", newPresent: state }),
    undo: () => dispatch({ type: "UNDO" }),
    redo: () => dispatch({ type: "REDO" }),
    clear: () => dispatch({ type: "CLEAR", initialPresent: initialPresent }),
  };
}
