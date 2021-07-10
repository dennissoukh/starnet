import React from 'react';
import { VscAdd, VscSearch } from 'react-icons/vsc';
import { useApplicationStore } from '../../global-stores/useApplicationStore';
import { convertCoordinatesDMS } from '../../utils/converters';

export const Overview: React.FC = () => {
  const geolocation = useApplicationStore(state => state.geolocation);

  return (
    <div className="flex flex-col min-h-full">
      <div>
        <div className="px-10 py-6 border-b border-solid border-primary-800">
          <div className="flex justify-between items-center text-primary-200">
            <span className="font-light text-tiny uppercase">Date &amp; Time</span>
            <div className="cursor-pointer">
              <VscAdd size={13}/>
            </div>
          </div>
          <p className="text-xl tracking-wide">20:02:04, 09th July 2021 UTC+01:00</p>
        </div>
        <div className="px-10 py-6 border-b border-solid border-primary-800">
          <div className="flex justify-between items-center text-primary-200">
            <span className="font-light text-tiny uppercase">Location</span>
            <div className="cursor-pointer">
              <VscAdd size={13}/>
            </div>
          </div>
          <p className="text-xl tracking-wide">Earth, {convertCoordinatesDMS(geolocation.latitude)}, {convertCoordinatesDMS(geolocation.longitude)}</p>
        </div>
        <div className="border-b border-solid border-primary-800 flex">
          <div className="w-1/2 px-10 py-6 border-r border-solid border-primary-800">
            <div className="flex justify-between items-center text-primary-200">
              <span className="font-light text-tiny uppercase">Astronomical Sunrise</span>
            </div>
            <p className="text-xl tracking-wide">04:20</p>
          </div>
          <div className="w-1/2 px-10 py-6">
            <div className="flex justify-between items-center text-primary-200">
              <span className="font-light text-tiny uppercase">Astronomical Sunset</span>
              <div className="cursor-pointer">
                <VscSearch size={13}/>
              </div>
            </div>
            <p className="text-xl tracking-wide">22:23</p>
          </div>
        </div>
      </div>
    </div>
  )
}
