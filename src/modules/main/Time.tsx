import React, { useEffect, useState } from 'react';
import { VscAdd } from 'react-icons/vsc';
import { useTimeStore as useStore } from '../../global-stores/useTimeStore';
import { Modal } from '../../shared-components/Modal';
import { createTimeString } from '../../utils/converters';
import { TimeModal } from './TimeModal';

const Time: React.FC = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [custom, setCustom] = useState<boolean>(false);

  const date = useStore(state => state.date);
  const setDate = useStore((state: any) => state.setDate);

  const setTimestamp = useStore((state: any) => state.setTimestamp);

  useEffect(() => {
    let t = setInterval(() => {
      if (!custom) {
        const current = new Date();

        setDate(current);

        setTimestamp({
          day: current.getUTCDate(),
          month: current.getMonth() + 1,
          year: current.getFullYear(),
          hours: current.getHours(),
          minutes: current.getMinutes(),
          seconds: current.getSeconds(),
        });
      }
    }, 1000);

    return () => {
      clearInterval(t);
    }
  });

  return (
    <div className="px-5 lg:px-10 py-6 border-b border-solid border-primary-800">
      <div className="flex justify-between items-center text-primary-200">
        <span className="font-light text-tiny uppercase">Date &amp; Time</span>
        <div className="cursor-pointer" onClick={() => setModalActive(!modalActive)}>
          <VscAdd size={13}/>
        </div>
      </div>
      {/* <p className="text-xl tracking-wide">20:02:04, 09th July 2021 UTC+01:00</p> */}
      <p className="text-lg lg:text-xl tracking-wide">{createTimeString(date)}</p>
      <Modal
        callback={setModalActive}
        isVisible={modalActive}
        title="Date &amp; Time"
      >
        <TimeModal
          custom={custom}
          setCustom={setCustom}
        />
      </Modal>
    </div>
  )
}

export default Time;
