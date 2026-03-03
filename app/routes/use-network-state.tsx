import useNetworkState from "../hooks/useNetworkState.ts";

export default function App() {
  const network = useNetworkState();

  return (
    <section>
      <h1>useNetworkState</h1>

      <table>
        <tbody>
          {Object.entries(network).map(([key, value]) => {
            return (
              <tr key={key} className={key}>
                <th>{key}</th>
                <td>{`${value}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
