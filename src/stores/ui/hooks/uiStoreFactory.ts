import { createStore, StateCreator, StoreApi, useStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import React from 'react';

export type UIContentProps = {
  onClose: () => void;
  isOpen: boolean;
};

export type UIContentComponent = React.ReactElement<UIContentProps>;

export type UIStore = {
  content: UIContentComponent | null;
  isOpen: boolean;
  show: (content: UIContentComponent) => void;
  isClosing: boolean; // New state property
  close: () => void;
};
// type UIStoreType = { initialIsOpen?: boolean; closeDelay?: number };
type StorageType = 'local' | 'session';

interface UIStoreState {
  content: UIContentComponent | null;
  isOpen: boolean;
  show: (content: UIContentComponent) => void;
  isClosing: boolean; // New state property
  close: () => void;
}

export interface UIStoreOptions {
  initialIsOpen?: boolean;
  closeDelay?: number;
  persist?: boolean;
  storageType?: StorageType;
  name?: string;
}

export const createUIStore = (
  options?: Partial<UIStoreOptions>,
): StoreApi<UIStoreState> => {
  const {
    initialIsOpen = false,
    closeDelay = 0,
    persist: shouldPersist,
    storageType = 'local',
    name = 'ui-store',
  } = options || {};

  if (shouldPersist && !name) {
    throw new Error("A unique 'name' is required for persistent stores");
  }

  const storeCreator: StateCreator<UIStoreState> = (set) => ({
    content: null,
    isOpen: initialIsOpen,
    isClosing: false, // Initialize isClosing
    show: (content) => set({ content, isOpen: true, isClosing: false }),
    close: () => {
      set({ isClosing: true }); // Set isClosing to true

      setTimeout(() => {
        set({ content: null, isOpen: false, isClosing: false });
      }, closeDelay);
    },
  });

  if (shouldPersist) {
    return createStore(
      persist(storeCreator, {
        name: name, // Name is mandatory for persistent stores
        storage: createJSONStorage(() =>
          storageType === 'local' ? localStorage : sessionStorage,
        ),
      }),
    );
  }

  return createStore(storeCreator);
};

export const useUIStore = <T>(store: StoreApi<T>) => {
  return useStore(store);
};

// Path: media-fe/src/stores/ui/hooks/uiStoreFactory.ts
