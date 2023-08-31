import { useContext } from 'react';
import { NavContext } from './providers/nav-provider';
import { useBodyStyle } from './hooks/useBodyEl';


export const BodyStyleUpdater: React.FC = () => {
  const { isNavOpen, lockScroll } = useContext(NavContext);
  useBodyStyle(isNavOpen, lockScroll);

  return null;
};
