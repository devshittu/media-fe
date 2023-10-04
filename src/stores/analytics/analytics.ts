import { createStore, useStore } from 'zustand';
enum AnalyticsEvents {
  stories = 'storyViewed',
}

export type AnalyticsData = {
  event: string; // event name e.g storyView
  timestamp: number; // unix timestamp
  storyId: string;
  timeInView?: number; //in milliseconds
};

export type InteractionData = {
  event:
    | 'view'
    | 'bookmark'
    | 'unbookmark'
    | 'share'
    | 'click_external'
    | 'view_timeline';
  timestamp: number;
  storyId: string;
  metadata?: {
    source_page?: string;
    platform?: 'WhatsApp' | 'Twitter' | 'Facebook' | 'Other';
    link_url?: string;
    source_section?: string;
  };
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
