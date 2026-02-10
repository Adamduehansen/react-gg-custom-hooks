import useBattery from "../hooks/useBattery.ts";
// import Battery from "./Battery";

export default function App() {
  const {
    loading,
    level,
    charging,
    chargingTime,
    dischargingTime,
  } = useBattery();

  return (
    <>
      <div className="wrapper">
        <h1>useBattery</h1>
        {!loading
          ? (
            // <Battery
            //   level={level * 100}
            //   charging={charging}
            //   chargingTime={chargingTime}
            //   dischargingTime={dischargingTime}
            // />
            <div>
              <p>level={level * 100}</p>
              <p>charging={charging}</p>
              <p>chargingTime={chargingTime}</p>
              <p>dischargingTime={dischargingTime}</p>
            </div>
          )
          : <h2>Loading...</h2>}
      </div>
    </>
  );
}
