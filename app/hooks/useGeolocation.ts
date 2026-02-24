import * as React from "react";

interface State {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: GeolocationPositionError | null;
}

export default function useGeolocation(options = {}) {
  const [state, setState] = React.useState<State>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });
  const watchId = React.useRef(0);

  React.useEffect(() => {
    if (navigator.geolocation) {
      function successHandler(position: GeolocationPosition) {
        setState({
          loading: false,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          speed: position.coords.speed,
          timestamp: position.timestamp,
          error: null,
        });
      }
      function errorHandler(error: GeolocationPositionError) {
        setState({
          loading: false,
          accuracy: null,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          latitude: null,
          longitude: null,
          speed: null,
          timestamp: null,
          error: error,
        });
      }

      navigator.geolocation.getCurrentPosition(
        successHandler,
        errorHandler,
      );

      watchId.current = navigator.geolocation.watchPosition(
        successHandler,
        errorHandler,
      );

      return function () {
        navigator.geolocation.clearWatch(watchId.current);
      };
    }
  }, []);

  return state;
}
