import React from 'react';
import { useScreenType } from '../../hooks/useScreenType';

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
      <div>
        {children}
      </div>
    </>
  )
};

export default ApplicationLayout;
