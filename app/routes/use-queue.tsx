import useQueue from "../hooks/useQueue";

interface QueueDemoProps<T> {
  first: T;
  last: T;
  size: number;
  queue: T[];
}

function QueueDemo<T>({ first, last, size, queue }: QueueDemoProps<T>) {
  return (
    <figure>
      <article>
        <p>Front</p>
        <ul>
          {queue.map((item, i) => {
            const isFirst = first === item;
            const isLast = last === item;
            if (isFirst) {
              return <li key={i}>First: {String(item)}</li>;
            }
            if (isLast) {
              return <li key={i}>Last: {String(item)}</li>;
            }
            return <li key={i}>Item: {String(item)}</li>;
          })}
        </ul>
        <p>Back</p>
      </article>
      <figcaption>{size} items in the queue</figcaption>
    </figure>
  );
}

export default function App() {
  const { add, remove, clear, first, last, size, queue } = useQueue([1, 2, 3]);

  return (
    <div>
      <header>
        <h1>UseQueue</h1>
        <button className="link" onClick={() => add((last || 0) + 1)}>
          Add
        </button>
        <button disabled={size === 0} className="link" onClick={() => remove()}>
          Remove
        </button>
        <button disabled={size === 0} className="link" onClick={() => clear()}>
          Clear
        </button>
      </header>
      <QueueDemo queue={queue} size={size} first={first} last={last} />
    </div>
  );
}
