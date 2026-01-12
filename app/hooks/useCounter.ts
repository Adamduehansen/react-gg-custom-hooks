import * as React from "react";

interface Options {
  min?: number;
  max?: number;
}

export default function useCounter(
  startingValue = 0,
  options: Options = {},
): [number, {
  increment: () => void;
  decrement: () => void;
  set: (value: number) => void;
  reset: () => void;
}] {
  const { min, max } = options;

  if (typeof min === "number" && startingValue < min) {
    throw new Error(
      `Your starting value of ${startingValue} is less than your min of ${min}.`,
    );
  }

  if (typeof max === "number" && startingValue > max) {
    throw new Error(
      `Your starting value of ${startingValue} is greater than your max of ${max}.`,
    );
  }

  const [count, setCount] = React.useState(startingValue);

  function increment() {
    if (count === max) {
      return;
    }

    setCount((current) => current + 1);
  }

  function decrement() {
    if (count === min) {
      return;
    }

    setCount((current) => current - 1);
  }

  function set(value: number) {
    if (max !== undefined && value > max || min !== undefined && value < min) {
      return;
    }

    setCount(value);
  }

  function reset() {}

  return [
    count,
    {
      increment,
      decrement,
      set,
      reset,
    },
  ];
}
