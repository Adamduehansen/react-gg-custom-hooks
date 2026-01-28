import * as React from "react";
import useEventListener from "../hooks/useEventListener";

export default function App() {
  const ref = React.useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = (e: MouseEvent) => {
    if (ref.current === null || e.target === null) {
      return;
    }

    const element = ref.current;
    if (element && !element.contains(e.target as Element)) {
      setIsOpen(false);
    }
  };

  useEventListener(document, "mousedown", handleClick);

  return (
    <section>
      <h1>useEventListener</h1>
      <div style={{ minHeight: "200vh" }}>
        <button className="link" onClick={() => setIsOpen(true)}>
          Click me
        </button>
      </div>
      {isOpen && (
        <dialog ref={ref}>
          <button onClick={() => setIsOpen(false)}>Close</button>
          <h2>Modal</h2>
          <p>
            Click outside the modal to close (or use the button) whatever you
            prefer.
          </p>
        </dialog>
      )}
    </section>
  );
}
