import React, { useState } from 'react';
import { VscAdd, VscSearch } from 'react-icons/vsc';
import { useApplicationStore } from '../../global-stores/useApplicationStore';
import { convertCoordinatesDMS } from '../../utils/converters';
import { Modal } from '../../shared-components/Modal';
import { LocationModal } from './LocationModal';
import Time from './Time';

export const Overview: React.FC = () => {
  const [modalActive, setModalActive] = useState(false);
  const geolocation = useApplicationStore(state => state.geolocation);

  return (
    <div className="flex flex-col min-h-full">
      <div>
        <Time/>
        <div className="px-10 py-6 border-b border-solid border-primary-800">
          <div className="flex justify-between items-center text-primary-200">
            <span className="font-light text-tiny uppercase">Location</span>
            <div className="cursor-pointer" onClick={() => setModalActive(!modalActive)}>
              <VscAdd size={13}/>
            </div>
          </div>
          <p className="text-xl tracking-wide">Earth, {convertCoordinatesDMS(geolocation.latitude)}, {convertCoordinatesDMS(geolocation.longitude)}</p>
          <Modal
            callback={setModalActive}
            isVisible={modalActive}
            title="Location"
          >
            <LocationModal/>
          </Modal>
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
