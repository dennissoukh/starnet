import React from 'react';
import { useTimeStore as useStore } from '../../global-stores/useTimeStore';

interface Props {
  custom: boolean,
  setCustom: Function,
}

export const TimeModal: React.FC<Props> = ({
  custom,
  setCustom,
}) => {
  const timestamp = useStore(state => state.timestamp);
  const setTimestamp = useStore((state: any) => state.setTimestamp);
  const setDate = useStore((state: any) => state.setDate);

  const setTimestampValue = (value: string, type: string) => {
    switch (type) {
      case 'day':
        let day = parseInt(value);
        let months;

        if (timestamp.year % 4 === 0) {
          months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        } else {
          months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }

        if (typeof day === 'number' && day >= 1 && day <= months[timestamp.month]) {
          setTimestamp({ ...timestamp, day });
        }

        break;
      case 'month':
        let month = parseInt(value);

        if (typeof month === 'number' && month >= 1 && month <= 12) {
          setTimestamp({ ...timestamp, month });
        }

        break;
      case 'year':
        let year = parseInt(value);

        if (typeof year === 'number' && year >= 0 && year <= 5000) {
          setTimestamp({ ...timestamp, year });
        }

        break;
      case 'hour':
        let hours = parseInt(value);

        if (typeof hours === 'number' && hours >= 0 && hours <= 24) {
          setTimestamp({ ...timestamp, hours });
        }

        break;
      case 'minute':
        let minutes = parseInt(value);

        if (typeof minutes === 'number' && minutes >= 0 && minutes < 60) {
          setTimestamp({ ...timestamp, minutes });
        }

        break;
      case 'second':
        let seconds = parseInt(value);

        if (typeof seconds === 'number' && seconds >= 0 && seconds < 60) {
          setTimestamp({ ...timestamp, seconds });
        }

        break;
      default:
        break;
    }
  }

  const setCustomTime = () => {
    const date = new Date(
      timestamp.year,
      timestamp.month - 1,
      timestamp.day,
      timestamp.hours,
      timestamp.minutes,
      timestamp.seconds,
      0,
    );

    setDate(date);
  }

  return (
    <div className="mt-7">
      <div>
        <label htmlFor="current_time" className="cursor-pointer">
          <input
            type="checkbox"
            name="current_time"
            id="current_time"
            className="mr-2"
            onChange={() => setCustom(!custom)}
            checked={custom}
          />
          <span className="text-sm select-none tracking-wide">Use Custom Time</span>
        </label>
      </div>
      <div className={custom ? 'flex flex-wrap mt-4 relative transition-opacity' : 'flex flex-wrap mt-4 relative opacity-50 transition-opacity'}>
        {!custom && <div className="absolute w-full h-full"></div>}
        <div className="w-full md:w-1/2 flex items-center">
          <div className="flex flex-col w-1/5">
            <span className="text-tiny">Day</span>
            <input
              type="text"
              value={timestamp.day}
              onChange={(e) => setTimestampValue(e.target.value, 'day')}
              className="w-full py-2 px-3 mt-1 border border-solid border-primary-200 focus:border-primary-300 transition"
            />
          </div>
          <p className="px-2" style={{ paddingTop: '17.4px' }}>-</p>
          <div className="flex flex-col w-1/5">
            <span className="text-tiny">Month</span>
            <input
              type="text"
              value={timestamp.month}
              onChange={(e) => setTimestampValue(e.target.value, 'month')}
              className="w-full py-2 px-3 mt-1 border border-solid border-primary-200 focus:border-primary-300 transition"
            />
          </div>
          <p className="px-2" style={{ paddingTop: '17.4px' }}>-</p>
          <div className="flex flex-col w-2/5">
            <span className="text-tiny">Year</span>
            <input
              type="text"
              value={timestamp.year}
              onChange={(e) => setTimestampValue(e.target.value, 'year')}
              className="w-full py-2 px-3 mt-1 border border-solid border-primary-200 focus:border-primary-300 transition"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0 flex items-center">
          <div className="flex flex-col w-1/5">
            <span className="text-tiny">Hour</span>
            <input
              type="text"
              value={timestamp.hours}
              onChange={(e) => setTimestampValue(e.target.value, 'hour')}
              className="w-full py-2 px-3 mt-1 border border-solid border-primary-200 focus:border-primary-300 transition"
            />
          </div>
          <p className="px-2" style={{ paddingTop: '17.4px' }}>:</p>
          <div className="flex flex-col w-1/5">
            <span className="text-tiny">Minute</span>
            <input
              type="text"
              value={timestamp.minutes}
              onChange={(e) => setTimestampValue(e.target.value, 'minute')}
              className="w-full py-2 px-3 mt-1 border border-solid border-primary-200 focus:border-primary-300 transition"
            />
          </div>
          <p className="px-2" style={{ paddingTop: '17.4px' }}>:</p>
          <div className="flex flex-col w-1/5">
            <span className="text-tiny">Second</span>
            <input
              type="text"
              value={timestamp.seconds}
              onChange={(e) => setTimestampValue(e.target.value, 'second')}
              className="w-full py-2 px-3 mt-1 border border-solid border-primary-200 focus:border-primary-300 transition"
            />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="text-sm tracking-wide bg-primary-200 px-6 py-3 hover:bg-primary-300 transition-colors"
          onClick={setCustomTime}
          disabled={!custom}
        >
          Set Time
        </button>
      </div>
    </div>
  )
}
