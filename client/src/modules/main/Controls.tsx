import React from 'react';
import { VscAdd } from 'react-icons/vsc';

export const Controls: React.FC = () => {
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
          <p className="text-xl tracking-wide">0°</p>
        </div>
        <div className="w-1/2 px-10 py-6">
          <div className="flex justify-between items-center text-primary-200">
            <span className="font-light text-tiny uppercase">Limiting Magnitude</span>
            <div className="cursor-pointer">
              <VscAdd size={13}/>
            </div>
          </div>
          <p className="text-xl tracking-wide">5.3</p>
        </div>
      </div>
      <div className="w-full flex text-sm border-t border-solid border-primary-800">
        <div className="w-1/2 px-10 py-6 border-r border-solid border-primary-800">
          <div className="flex items-center">
            <label htmlFor="equator">
              <input type="checkbox" name="equator" id="equator" className="mr-2"/>
              <span className="font-light text-sm select-none">Equator</span>
            </label>
          </div>
        </div>
        <div className="w-1/2 px-10 py-6">
          <div className="flex items-center">
            <label htmlFor="ecliptic">
              <input type="checkbox" name="ecliptic" id="ecliptic" className="mr-2"/>
              <span className="font-light text-sm select-none">Ecliptic</span>
            </label>
          </div>
        </div>
      </div>
      <div className="w-full flex text-sm border-t border-solid border-primary-800">
        <div className="w-1/2 px-10 py-6 border-r border-solid border-primary-800">
          <div className="flex items-center">
            <label htmlFor="solar_system">
              <input type="checkbox" name="solar_system" id="solar_system" className="mr-2"/>
              <span className="font-light text-sm select-none">Planets & Sun</span>
            </label>
          </div>
        </div>
        <div className="w-1/2 px-10 py-6">
          <div className="flex items-center">
            <label htmlFor="con_name">
              <input type="checkbox" name="con_name" id="con_name" className="mr-2"/>
              <span className="font-light text-sm select-none">Constellation Names</span>
            </label>
          </div>
        </div>
      </div>
      <div className="w-full flex text-sm border-t border-solid border-primary-800">
        <div className="w-1/2 px-10 py-6 border-r border-solid border-primary-800">
          <div className="flex items-center">
            <label htmlFor="dso">
              <input type="checkbox" name="dso" id="dso" className="mr-2"/>
              <span className="font-light text-sm select-none">Deep Sky Objects</span>
            </label>
          </div>
        </div>
        <div className="w-1/2 px-10 py-6">
          <div className="flex items-center">
            <label htmlFor="con_line">
              <input type="checkbox" name="con_line" id="con_line" className="mr-2"/>
              <span className="font-light text-sm select-none">Constellation Lines</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
