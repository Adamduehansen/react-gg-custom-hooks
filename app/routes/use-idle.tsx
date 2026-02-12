import * as React from "react";
import useIdle from "../hooks/useIdle.ts";

export default function App() {
  const idle = useIdle(5000);

  return (
    <section>
      <h1>useIdle</h1>
      <div>
        <span className={idle ? "idle" : ""} />
        <label>Status: {idle ? "Idle" : "Active"}</label>
      </div>
      {idle ? <p>Time to move your mouse</p> : <p>Hold still and wait</p>}
    </section>
  );
}
