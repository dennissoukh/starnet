import React from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import { Chart } from './Chart';
import { Controls } from './Controls';
import { Overview } from './Overview';

export const MainPage: React.FC = () => {
  const { isEnabled, coords } = useGeolocation();

  console.log(coords?.latitude + ', ' + coords?.longitude)

  return (
    <div className="flex">
      <div className="w-2/3 h-screen flex items-center justify-center">
        <Chart/>
      </div>
      <div className="w-1/3 border-l border-solid border-primary-800">
        <div className="flex flex-col min-h-full">
          <Overview/>
          <Controls/>
        </div>
      </div>
    </div>
  )
}

