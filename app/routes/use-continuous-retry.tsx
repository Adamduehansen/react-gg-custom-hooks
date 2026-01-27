import * as React from "react";
import useContinuousRetry from "../hooks/useContinuousRetry";

export default function App() {
  const [count, setCount] = React.useState(0);
  const hasResolved = useContinuousRetry(
    () => {
      return count > 5;
    },
    1000,
    {
      maxRetries: 2,
    },
  );

  return (
    <section>
      <h1>useContinuousRetry</h1>
      <button className="primary" onClick={() => setCount(count + 1)}>
        {count}
      </button>
      <pre>{JSON.stringify({ hasResolved, count }, null, 2)}</pre>
    </section>
  );
}
