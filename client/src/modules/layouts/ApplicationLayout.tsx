import React from 'react';
import { useScreenType } from '../../hooks/useScreenType';
import Sidebar from '../../ui/sidebar/Sidebar';

const ApplicationLayout: React.FC = ({ children }) => {
  const screenType = useScreenType();

  const isDesktop = () => {
    return !!(screenType === 'desktop');
  }

  return (
    <>
      {isDesktop()
        ? null
        : null
      }
      <Sidebar/>
      <div style={{ paddingLeft: '90px' }}>
        {children}
      </div>
    </>
  )
};

export default ApplicationLayout;
