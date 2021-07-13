import React, { useEffect } from 'react';
import { VscAdd } from 'react-icons/vsc';
import { useStarChartStore as useStore } from '../../global-stores/useStarChartStore';
import useLocalStorage from '../../hooks/useLocalStorage';

export const Controls: React.FC = () => {
  const settings = useStore(state => state.settings);

  const setSettings = useStore((state: any) => state.setSettings);
  const setEquator = useStore((state: any) => state.setEquator);
  const setEcliptic = useStore((state: any) => state.setEcliptic);
  const setSolarSystem = useStore((state: any) => state.setSolarSystem);
  const setConstellationNames = useStore((state: any) => state.setConstellationNames);
  const setConstellationLines = useStore((state: any) => state.setConstellationLines);
  const setDso = useStore((state: any) => state.setDso);
  const setLimitingMagnitude = useStore((state: any) => state.setLimitingMagnitude);
  const setAzimuthOffset = useStore((state: any) => state.setAzimuthOffset);

  const [storageChart, setStorageChart] = useLocalStorage('chart', null);

  useEffect(() => {
    if (storageChart) {
      setSettings(storageChart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setStorageChart(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return (
    <div className="flex-1 flex items-end w-full">
      <div className="w-full">
        <div className="w-full flex text-sm border-t border-solid border-primary-800">
          <div className="w-1/2 px-10 py-6 border-r border-solid border-primary-800">
            <div className="flex justify-between items-center text-primary-200">
              <span className="font-light text-tiny uppercase">Azimuth Offset</span>
              <div className="cursor-pointer">
                <VscAdd size={13}/>
              </div>
            </div>
            <p className="text-xl tracking-wide">{settings.azimuthOffset}°</p>
          </div>
          <div className="w-1/2 px-10 py-6">
            <div className="flex justify-between items-center text-primary-200">
              <span className="font-light text-tiny uppercase">Limiting Magnitude</span>
              <div className="cursor-pointer">
                <VscAdd size={13}/>
              </div>
            </div>
            <p className="text-xl tracking-wide">{settings.limitingMagnitude}</p>
          </div>
        </div>
        <div className="w-full flex text-sm border-t border-solid border-primary-800">
          <div className="w-1/2 px-10 py-6 border-r border-solid border-primary-800">
            <div className="flex items-center">
              <label htmlFor="equator" className="cursor-pointer">
                <input
                  type="checkbox"
                  name="equator"
                  id="equator"
                  className="mr-2"
                  onChange={() => setEquator(!settings.equator)}
                  checked={settings.equator}
                />
                <span className="font-light text-sm select-none">Equator</span>
              </label>
            </div>
          </div>
          <div className="w-1/2 px-10 py-6">
            <div className="flex items-center">
              <label htmlFor="ecliptic">
                <input
                  type="checkbox"
                  name="ecliptic"
                  id="ecliptic"
                  className="mr-2"
                  onChange={() => setEcliptic(!settings.ecliptic)}
                  checked={settings.ecliptic}
                />
                <span className="font-light text-sm select-none">Ecliptic</span>
              </label>
            </div>
          </div>
        </div>
        <div className="w-full flex text-sm border-t border-solid border-primary-800">
          <div className="w-1/2 px-10 py-6 border-r border-solid border-primary-800">
            <div className="flex items-center">
              <label htmlFor="solar_system">
                <input
                  type="checkbox"
                  name="solar_system"
                  id="solar_system"
                  className="mr-2"
                  onChange={() => setSolarSystem(!settings.solarSystem)}
                  checked={settings.solarSystem}
                />
                <span className="font-light text-sm select-none">Planets & Sun</span>
              </label>
            </div>
          </div>
          <div className="w-1/2 px-10 py-6">
            <div className="flex items-center">
              <label htmlFor="con_name">
                <input
                  type="checkbox"
                  name="con_name"
                  id="con_name"
                  className="mr-2"
                  onChange={() => setConstellationNames(!settings.constellationNames)}
                  checked={settings.constellationNames}
                />
                <span className="font-light text-sm select-none">Constellation Names</span>
              </label>
            </div>
          </div>
        </div>
        <div className="w-full flex text-sm border-t border-solid border-primary-800">
          <div className="w-1/2 px-10 py-6 border-r border-solid border-primary-800">
            <div className="flex items-center">
              <label htmlFor="dso">
                <input
                  type="checkbox"
                  name="dso"
                  id="dso"
                  className="mr-2"
                  onChange={() => setDso(!settings.dso)}
                  checked={settings.dso}
                />
                <span className="font-light text-sm select-none">Deep Sky Objects</span>
              </label>
            </div>
          </div>
          <div className="w-1/2 px-10 py-6">
            <div className="flex items-center">
              <label htmlFor="con_line">
                <input
                  type="checkbox"
                  name="con_line"
                  id="con_line"
                  className="mr-2"
                  onChange={() => setConstellationLines(!settings.constellationLines)}
                  checked={settings.constellationLines}
                />
                <span className="font-light text-sm select-none">Constellation Lines</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
