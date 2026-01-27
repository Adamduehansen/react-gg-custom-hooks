import * as React from "react";
import useDebounce from "../hooks/useDebounce";

export default function App() {
  const [text, setText] = React.useState("Hello, World!");
  const debouncedvalue = useDebounce(text, 300);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };

  React.useEffect(() => {
    setText(debouncedvalue);
  }, [debouncedvalue]);

  return (
    <section>
      <header>
        <h1>useDebounce</h1>
        <input
          name="text"
          placeholder="Enter something..."
          onChange={handleChange}
        />
        <p>Debounced value: {debouncedvalue}</p>
      </header>
    </section>
  );
}
