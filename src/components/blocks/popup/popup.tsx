'use client';
import * as React from 'react';
import { usePopup } from './hooks/usePopup';
import { PopupOptions } from './types';
import { PopupContext } from './hooks/usePopupContext';
export const Popup = ({
  children,
  modal = false,
  ...restOptions
}: {
  children: React.ReactNode;
} & PopupOptions) => {
  const popup = usePopup({ modal, ...restOptions });
  return (
    <PopupContext.Provider value={popup}>{children}</PopupContext.Provider>
  );
};

// Path: src/components/blocks/popup/popup.tsx
