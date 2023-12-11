import { createStore, StoreApi, useStore } from 'zustand';
import { Tab } from '@/components/blocks/tab/tab-list';

export type TabStore = {
  tabs: Tab[];
  activeTab: string;
  scrollPositions: Record<string, number>; // Map of tab IDs to their scroll positions
  setTabs: (tabs: Tab[]) => void;
  setActiveTab: (tabId: string) => void;
  setScrollPosition: (tabId: string, scrollPosition: number) => void;
};

type TabStoreFactoryParams = {
  initialTabs?: Tab[];
  initialActiveTab?: string;
};

export const createTabStore = ({
  initialTabs = [],
  initialActiveTab = '',
}: TabStoreFactoryParams) => {
  return createStore<TabStore>((set) => ({
    tabs: initialTabs,
    activeTab: initialActiveTab,
    scrollPositions: {},
    setTabs: (tabs) => set({ tabs }),
    setActiveTab: (tabId) => set({ activeTab: tabId }),
    setScrollPosition: (tabId, scrollPosition) =>
      set((state) => ({
        scrollPositions: { ...state.scrollPositions, [tabId]: scrollPosition },
      })),
  }));
};

export const useTabStore = (store: StoreApi<TabStore>) => useStore(store);

// src/components/blocks/tab/store.ts
