import { useContext } from 'react';
import { NavContext } from './providers/nav-provider';
import { useBodyClass, useBodyStyle } from './hooks/useBodyEl';

export const BodyClassUpdater: React.FC = () => {
  const { bodyClass } = useContext(NavContext);
  useBodyClass(bodyClass);

  return null;
};

export const BodyStyleUpdater: React.FC = () => {
  const { isNavOpen } = useContext(NavContext);
  useBodyStyle(isNavOpen);

  return null;
};
