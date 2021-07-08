import { useMediaQuery } from 'react-responsive';

export const useScreenType = (): string => {
  const desktop = useMediaQuery({ minWidth: 768 });

  if (desktop) {
    return 'desktop';
  }

  return 'mobile';
};
