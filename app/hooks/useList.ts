import * as React from "react";

const placeholder = () => {};

export default function useList<T>(defaultList: T[] = []): [T[], {
  set: (values: T[]) => void;
  push: (value: T) => void;
  removeAt: (index: number) => void;
  insertAt: (index: number, value: T) => void;
  updateAt: (index: number, value: T) => void;
  clear: () => void;
}] {
  const [list, setList] = React.useState(defaultList);

  function set(values: T[]): void {
    setList(values);
  }

  function push(value: T): void {
    setList((current) => [...current, value]);
  }

  function removeAt(index: number): void {
    const elementsBeforeIndex = list.slice(0, index);
    const elementsAfterIndex = list.slice(index + 1);
    setList([...elementsBeforeIndex, ...elementsAfterIndex]);
  }

  function insertAt(index: number, value: T): void {
    const elementsBeforeIndex = list.slice(0, index);
    const elementsAfterIndex = list.slice(index);
    setList([...elementsBeforeIndex, value, ...elementsAfterIndex]);
  }

  function updateAt(index: number, value: T): void {
    setList((current) => {
      return current.map((mapValue, mapIndex) => {
        if (mapIndex === index) {
          return value;
        } else {
          return mapValue;
        }
      });
    });
  }

  function clear(): void {
    setList([]);
  }

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
}
