import React from 'react';
import { Chart } from './Chart';
import { Controls } from './Controls';
import { Overview } from './Overview';

export const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-2/3 lg:h-screen flex items-center justify-center p-5" style={{ minWidth: '950px' }}>
        <Chart/>
      </div>
      <div className="border-l border-solid border-primary-800 mt-32 lg:mt-0 lg:min-w-620 w-full lg:w-1/3">
        <div className="flex flex-col min-h-full">
          <Overview/>
          <Controls/>
        </div>
      </div>
    </div>
  )
}

