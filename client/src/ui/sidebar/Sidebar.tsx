import React from 'react';
import { HiHome, HiCog, HiGlobe, HiSun, HiMoon, HiSparkles } from 'react-icons/hi';

const Sidebar: React.FC = () => {
  return (
    <div
      style={{ width: '90px', height: '100vh' }}
      className="absolute top-0 left-0 flex items-center justify-center bg-primary-800"
    >
      <div className="text-primary-300">
        <div className="bg-primary-700 p-3 rounded-lg">
          <a href="/">
            <HiHome size={25}/>
          </a>
        </div>
        <div className="mt-4 p-3">
          <a href="/">
            <HiSparkles size={25}/>
          </a>
        </div>
        <div className="mt-4 p-3">
          <a href="/">
            <HiGlobe size={25}/>
          </a>
        </div>
        <div className="mt-4 p-3">
          <a href="/">
            <HiSun size={25}/>
          </a>
        </div>
        <div className="mt-4 p-3">
          <a href="/">
            <HiMoon size={25}/>
          </a>
        </div>
        <div className="mt-4 p-3">
          <a href="/">
            <HiCog size={25}/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
