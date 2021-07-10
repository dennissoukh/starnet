import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useApplicationStore = create(
  combine(
    {
      geolocation: {
        accuracy: 0,
        altitude: 0,
        altitudeAccuracy: 0,
        heading: 0,
        latitude: 0,
        longitude: 0,
        speed: 0,
      }
    },
    (set) => ({
      setGeolocation: (geolocation: any) => set(() => ({ geolocation })),
    })
  )
);
