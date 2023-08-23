// src/stores/popup/popup.ts
import { createStore, useStore } from 'zustand';
import React from 'react';

export type PopupContentProps = {
  onClose: () => void;
};

export type PopupContentComponent = React.ReactElement<PopupContentProps>;

export type PopupStore = {
  content: PopupContentComponent | null;
  isOpen: boolean;
  showPopup: (content: PopupContentComponent) => void;
  closePopup: () => void;
};

export const popupStore = createStore<PopupStore>((set) => ({
  content: null,
  isOpen: false,
  showPopup: (content) => {
    set({ content, isOpen: true });
  },
  closePopup: () => {
    set({ content: null, isOpen: false });
  },
}));

export const usePopup = () => useStore(popupStore);
