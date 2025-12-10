import { useState, useCallback } from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface GeolocationState {
  location: Coordinates | null;
  error: string | null;
  loading: boolean;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    loading: false,
  });

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false,
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error: null,
          loading: false,
        });
      },
      (geoError) => {
        let errorMessage = 'An unknown error occurred';
        switch (geoError.code) {
          case geoError.PERMISSION_DENIED:
            errorMessage = 'User denied the request for Geolocation.';
            break;
          case geoError.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case geoError.TIMEOUT:
            errorMessage = 'The request to get user location timed out.';
            break;
          default:
            errorMessage = geoError.message;
        }
        setState({
          location: null,
          error: errorMessage,
          loading: false,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 60000
      }
    );
  }, []);

  return { ...state, getLocation };
};
