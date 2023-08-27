import { createStore, useStore } from 'zustand';
enum AnalyticsEvents {
  stories = 'storyViewed',
}

export type AnalyticsData = {
  event: string;
  timestamp: number;
  storyId: string;
  // ... other fields
};

type AnalyticsStore = {
  dataBatch: AnalyticsData[];
  addData: (newData: AnalyticsData) => void;
  clearData: () => void;
};

export const analyticsStore = createStore<AnalyticsStore>((set) => ({
  dataBatch: [],
  addData: (newData) => {
    set((state) => ({
      dataBatch: [...state.dataBatch, newData],
    }));
  },
  clearData: () => {
    set({ dataBatch: [] });
  },
}));

export const useAnalytics = () => useStore(analyticsStore);

//Path: src/stores/analytics/analytics.ts
