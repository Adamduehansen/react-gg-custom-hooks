import * as React from "react";

interface Battery {
  loading: boolean;
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

export default function useBattery(): Battery {
  const [loading, setLoading] = React.useState(!!navigator.getBattery);
  const [supported, setSupported] = React.useState(!!navigator.getBattery);
  const [level, setLevel] = React.useState(100);
  const [charging, setCharging] = React.useState(100);
  const [chargingTime, setChargingTime] = React.useState(100);
  const [dischargingTime, setDischargingTime] = React.useState(true);
  const batteryRef = React.useRef(null);

  React.useEffect(() => {
    if (supported === false) {
      return;
    }

    function onChargingChange(event) {
      console.log(event);
    }

    navigator.getBattery().then((battery) => {
      batteryRef.current = battery;
      setLoading(false);
      setLevel(battery.level);
      setCharging(battery.charging);
      setChargingTime(battery.chargingTime);
      setDischargingTime(battery.dischargingTime);

      battery.addEventListener("chargingchange", onChargingChange);
      battery.addEventListener("chargingtimechange", onChargingChange);
      battery.addEventListener("dischargingtimechange", onChargingChange);
      battery.addEventListener("levelchange", onChargingChange);
    });

    return function () {
      if (batteryRef.current !== null) {
        batteryRef.current.removeEventListener(
          "chargingchange",
          onChargingChange,
        );
        batteryRef.current.removeEventListener(
          "chargingtimechange",
          onChargingChange,
        );
        batteryRef.current.removeEventListener(
          "dischargingtimechange",
          onChargingChange,
        );
        batteryRef.current.removeEventListener("levelchange", onChargingChange);
      }
    };
  }, []);

  return {
    loading: loading,
    supported: supported,
    level: level,
    charging: charging,
    chargingTime: chargingTime,
    dischargingTime: dischargingTime,
  };
}
