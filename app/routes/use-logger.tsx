import * as React from "react";
import useLogger from "../hooks/useLogger.ts";

interface FirstChildProps {
  name: string;
  isActive: boolean;
  count: number;
}

function FirstChild(props: FirstChildProps) {
  useLogger(props.name, props);

  return (
    <li className={props.isActive ? "active" : ""}>
      <h5>{props.name}</h5>
      <p>{props.count}</p>
    </li>
  );
}

export default function App() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => setCount(count + 1);

  return (
    <section>
      <h1>useLogger</h1>
      <h6>(Check the console)</h6>
      <button type="button" className="primary" onClick={handleClick}>
        Increment Count
      </button>
      <ul>
        {["First", "Second", "Third"].map((item, index) => {
          const isActive = count % 3 === index;
          return (
            <FirstChild
              key={index}
              name={item}
              isActive={isActive}
              count={count}
            />
          );
        })}
      </ul>
    </section>
  );
}
