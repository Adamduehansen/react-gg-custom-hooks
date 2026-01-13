import useWindowSize from "../hooks/useWindowSize";

interface BrowserProps {
  size: {
    width: number;
    height: number;
  };
}

function Browser({ size }: BrowserProps) {
  return (
    <div
      data-testid="browser"
      className="browser"
      style={{ width: size.width / 4, height: size.height / 4 }}
    />
  );
}

export default function App() {
  const size = useWindowSize();

  return (
    <section>
      <h1>useWindowSize</h1>
      <p>Resize the window</p>
      <table>
        <tbody>
          <tr>
            <th>width</th>
            <td>{size.width}</td>
          </tr>
          <tr>
            <th>height</th>
            <td>{size.height}</td>
          </tr>
        </tbody>
      </table>
      <Browser size={size} />
    </section>
  );
}
