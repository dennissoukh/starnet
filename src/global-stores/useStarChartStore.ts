import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useStarChartStore = create(
  combine(
    {
      settings: {
        equator: false,
        ecliptic: false,
        solarSystem: false,
        constellationNames: false,
        constellationLines: false,
        dso: false,
        galacticCenter: false,
        limitingMagnitude: 5.3,
        azimuthOffset: 0,
      }
    },
    (set) => ({
      setSettings: (settings: any) => set((state) => ({ ...state.settings, settings })),
      setEquator: (equator: boolean) => set((state) => ({ settings: { ...state.settings, equator }})),
      setEcliptic: (ecliptic: boolean) => set((state) => ({ settings: { ...state.settings, ecliptic }})),
      setSolarSystem: (solarSystem: boolean) => set((state) => ({ settings: { ...state.settings, solarSystem }})),
      setConstellationNames: (constellationNames: boolean) => set((state) => ({ settings: { ...state.settings, constellationNames }})),
      setConstellationLines: (constellationLines: boolean) => set((state) => ({ settings: { ...state.settings, constellationLines }})),
      setDso: (dso: boolean) => set((state) => ({ settings: { ...state.settings, dso }})),
      setGalacticCenter: (galacticCenter: boolean) => set((state) => ({ settings: { ...state.settings, galacticCenter }})),
      setLimitingMagnitude: (limitingMagnitude: number) => set((state) => ({ settings: { ...state.settings, limitingMagnitude }})),
      setAzimuthOffset: (azimuthOffset: number) => set((state) => ({ settings: { ...state.settings, azimuthOffset }})),
    }),
  ),
);
