import * as React from 'react';
import { usePopup } from './hooks/usePopup';
import { PopupOptions } from './types';
import { PopupContext } from './hooks/usePopupContext';
export const Popup: React.FC<
  {
    children: React.ReactNode;
  } & PopupOptions
> = ({ children, ...options }) => {
  const dialog = usePopup(options);
  return (
    <PopupContext.Provider value={dialog}>{children}</PopupContext.Provider>
  );
};
