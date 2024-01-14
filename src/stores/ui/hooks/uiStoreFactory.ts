// src/stores/ui/hooks/uiStoreFactory.ts
import { createStore, StateCreator, StoreApi, useStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
// type UIStoreType = { initialIsOpen?: boolean; closeDelay?: number };
type StorageType = 'local' | 'session';

interface UIStoreState {
  content: UIContentComponent | null;
  isOpen: boolean;
  show: (content: UIContentComponent) => void;
  close: () => void;
}

interface UIStoreOptions {
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
    show: (content) => set({ content, isOpen: true }),
    close: () => {
      setTimeout(() => set({ content: null, isOpen: false }), closeDelay);
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
