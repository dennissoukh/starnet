import React, { useEffect } from 'react';
import { useApplicationStore } from '../global-stores/useApplicationStore';
import useGeolocation from '../hooks/useGeolocation';
import useLocalStorage from '../hooks/useLocalStorage';

export const Geolocation: React.FC = () => {
//   const { coords } = useGeolocation();
  const setGeolocation = useApplicationStore((state: any) => state.setGeolocation);
  const [, setStorageGeolocation] = useLocalStorage('geolocation', null);

//   useEffect(() => {
//     if (coords) {
//       setGeolocation(coords);
//       setStorageGeolocation({
//         latitude: coords.latitude,
//         longitude: coords.longitude,
//       });
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [coords]);

  return (<></>);
}

export const StoredGeolocation: React.FC = () => {
  const [storageGeolocation] = useLocalStorage('geolocation', null)
  const setGeolocation = useApplicationStore((state: any) => state.setGeolocation);

  setGeolocation({
    latitude: storageGeolocation.latitude,
    longitude: storageGeolocation.longitude,
  })

  return (<></>);
}
