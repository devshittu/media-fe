import { createStore } from 'zustand';

type FeedsState<T> = {
  allItems: T[];
  scrollPosition: number;
  currentPage: number;
  setAllItems: (items: T[] | ((prevStories: T[]) => T[])) => void;
  setCurrentPage: (page: number) => void;
  setScrollPosition: (position: number) => void;
};

export const createFeedsStore = <T extends Record<string, any>>() => {
  return createStore<FeedsState<T>>((set) => ({
    allItems: [],
    scrollPosition: 0,
    currentPage: 1,
    setAllItems: (items) =>
      set((state) => {
        if (typeof items === 'function') {
          return { allItems: items(state.allItems) };
        }
        return { allItems: items };
      }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setScrollPosition: (position) => set({ scrollPosition: position }),
  }));
};

// Path: media-fe/src/stores/feeds/feeds.ts
