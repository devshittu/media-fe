import { AnalyticsData } from '@/features/analytics/types';
import { createStore, useStore } from 'zustand';
enum AnalyticsEvents {
  stories = 'storyViewed',
}

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
    // source_page?: string;
    // platform?: 'WhatsApp' | 'Twitter' | 'Facebook' | 'Other';
    // link_url?: string;
    // source_section?: string;
  };
};

type AnalyticsStore = {
  data: AnalyticsData[];
  addData: (newData: AnalyticsData) => void;
  clearData: () => void;
  getDataAboveTime: ({ ms }: { ms: number }) => AnalyticsData[]; // Generic selector
};

export const AnalyticsStore = createStore<AnalyticsStore>((set, get) => ({
  data: [],
  addData: (newData) => {
    set((state) => ({
      data: [...state.data, newData],
    }));
  },
  clearData: () => {
    set({ data: [] });
  },
  getDataAboveTime: ({ ms }) => {
    return get().data.filter(
      (item) => item.metadata?.timeInView && item.metadata?.timeInView >= ms,
    );
  },
}));

export const useAnalytics = () => useStore(AnalyticsStore);

//Path: src/stores/analytics/analytics.ts
