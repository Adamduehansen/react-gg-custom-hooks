import useGeolocation from "../hooks/useGeolocation.ts";
// import Demo from "../hooks/Demo";

function Location() {
  const state = useGeolocation();

  if (state.loading) {
    return <p>loading... (you may need to enable permissions)</p>;
  }

  if (state.error) {
    return <p>Enable permissions to access your location data</p>;
  }

  return <pre>{JSON.stringify(state)}</pre>;
}

export default function App() {
  return (
    <section>
      <h1>useGeolocation</h1>
      <Location />
    </section>
  );
}
