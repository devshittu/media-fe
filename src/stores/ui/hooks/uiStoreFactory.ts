import { createStore, useStore } from 'zustand';
import React from 'react';

export type UIContentProps = {
  onClose: () => void;
};

export type UIContentComponent = React.ReactElement<UIContentProps>;

export type UIStore = {
  content: UIContentComponent | null;
  isOpen: boolean;
  show: (content: UIContentComponent) => void;
  close: () => void;
};
type UIStoreType = { initialIsOpen?: boolean; closeDelay?: number };
export const createUIStore = ({
  initialIsOpen = false,
  closeDelay = 0,
}: UIStoreType) => {
  return createStore<UIStore>((set) => ({
    content: null,
    isOpen: initialIsOpen,
    show: (content) => {
      set({ content, isOpen: true });
    },
    close: () => {
      setTimeout(() => {
        set({ content: null, isOpen: false });
      }, closeDelay);
    },
  }));
};

export const useUIStore = (store: ReturnType<typeof createUIStore>) =>
  useStore(store);

// Path: media-fe/src/stores/ui/hooks/uiStoreFactory.ts
