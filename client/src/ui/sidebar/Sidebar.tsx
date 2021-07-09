import React from 'react';
import { HiHome, HiCog, HiGlobe, HiSun, HiMoon, HiSparkles } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div
      style={{ width: '90px', height: '100vh' }}
      className="absolute top-0 left-0 flex items-center justify-center bg-primary-800"
    >
      <div className="text-primary-300">
        <div className={location.pathname === '/' ?
          "bg-primary-700 mt-4 p-3 rounded-lg" :
          "mt-4 p-3"
        }>
          <Link to="/">
            <HiHome size={25}/>
          </Link>
        </div>
        <div className={location.pathname === '/stars' ?
          "bg-primary-700 mt-4 p-3 rounded-lg" :
          "mt-4 p-3"
        }>
          <Link to="/stars">
            <HiSparkles size={25}/>
          </Link>
        </div>
        <div className={location.pathname === '/dso' ?
          "bg-primary-700 mt-4 p-3 rounded-lg" :
          "mt-4 p-3"
        }>
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
