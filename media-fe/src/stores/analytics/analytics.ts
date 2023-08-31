import { createStore, useStore } from 'zustand';
enum AnalyticsEvents {
  stories = 'storyViewed',
}

export type AnalyticsData = {
  event: string;
  timestamp: number;
  storyId: string;
  timeInView?: number;
};

type AnalyticsStore = {
  data: AnalyticsData[];
  addData: (newData: AnalyticsData) => void;
  clearData: () => void;
};

export const analyticsStore = createStore<AnalyticsStore>((set) => ({
  data: [],
  addData: (newData) => {
    set((state) => ({
      data: [...state.data, newData],
    }));
  },
  clearData: () => {
    set({ data: [] });
  },
}));

export const useAnalytics = () => useStore(analyticsStore);

//Path: src/stores/analytics/analytics.ts
