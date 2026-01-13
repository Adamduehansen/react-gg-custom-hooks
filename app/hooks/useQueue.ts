import * as React from "react";

export default function useQueue<T>(initialValue: T[] = []) {
  const [queue, setQueue] = React.useState(initialValue);

  function add(value: T): void {
    setQueue((current) => [...current, value]);
  }

  function remove(): T | undefined {
    const firstElement = queue.at(0);
    setQueue((current) => current.slice(1));
    return firstElement;
  }

  function clear() {
    setQueue([]);
  }

  return {
    add: add,
    remove: remove,
    clear: clear,
    first: queue.at(0),
    last: queue.at(-1),
    size: queue.length,
    queue: queue,
  };
}
