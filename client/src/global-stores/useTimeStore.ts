import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useTimeStore = create(
  combine(
    {
      date: new Date(),
      timestamp: {
        day: 0,
        month: 0,
        year: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    },
    (set) => ({
      setTimestamp: (timestamp: any) => set(() => ({ timestamp })),
      setDate: (date: Date) => set(() => ({ date })),
    }),
  ),
);
