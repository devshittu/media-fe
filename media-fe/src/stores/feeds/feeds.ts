// src/stores/feeds/feeds.ts
import { createStore } from 'zustand';

type FeedsState<T> = {
  allItems: T[];
  scrollPosition: number;
  setAllItems: (stories: T[]) => void;
  setScrollPosition: (position: number) => void;
};

export const createFeedsStore = <T extends Record<string, any>>() => {
  return createStore<FeedsState<T>>((set) => ({
    allItems: [],
    scrollPosition: 0,
    setAllItems: (stories) => set({ allItems: stories }),
    setScrollPosition: (position) => set({ scrollPosition: position }),
  }));
};
