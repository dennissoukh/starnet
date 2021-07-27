import React, { useEffect } from 'react';
import { Chart } from './Chart';
import { Controls } from './Controls';
import { Overview } from './Overview';

export const MainPage: React.FC = () => {
  return (
    <div className="flex">
      <div className="w-2/3 h-screen flex items-center justify-center" style={{ minWidth: '950px' }}>
        <Chart/>
      </div>
      <div className="w-1/3 border-l border-solid border-primary-800" style={{ minWidth: '620px' }}>
        <div className="flex flex-col min-h-full">
          <Overview/>
          <Controls/>
        </div>
      </div>
    </div>
  )
}

