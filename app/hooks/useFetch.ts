import * as React from "react";

// React.useEffectEvent = React.experimental_useEffectEvent;

interface Options {}

interface State<T> {
  error: unknown;
  data: T;
}

interface LoadingAction {
  type: "loading";
}

interface FetchedAction<T> {
  type: "fetched";
  payload: T;
}

interface ErrorAction {
  type: "error";
  payload: unknown;
}

type Action<T> = LoadingAction | FetchedAction<T> | ErrorAction;

const initialState = {
  error: undefined,
  data: undefined,
};

const reducer = <T>(state: State<T>, action: Action<T>) => {
  switch (action.type) {
    case "loading":
      return { ...initialState };
    case "fetched":
      return { ...initialState, data: action.payload };
    case "error":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default function useFetch(url: string, options?: Options) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const cache = React.useRef<Record<string, any>>({});

  const onFetch = React.useEffectEvent((url: string) => {
    return fetch(url);
  });

  React.useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const cachedResult = cache.current[url];
      if (cachedResult) {
        dispatch({
          "type": "fetched",
          payload: cachedResult,
        });
      }

      dispatch({ type: "loading" });

      try {
        const response = await onFetch(url);
        const json = await response.json();

        if (ignore === true) {
          return;
        }

        dispatch({
          type: "fetched",
          payload: json,
        });
        cache.current[url] = json;
      } catch (err) {
        if (ignore === true) {
          return;
        }

        dispatch({
          type: "error",
          payload: err,
        });
      }
    }

    fetchData();

    return function () {
      ignore = true;
    };
  }, [url]);

  return state;
}
