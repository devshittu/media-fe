// import { AnalyticsDataSchema, InteractionType } from '@/features/analytics/types';
import { createStore, useStore } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { AnalyticsDataType } from '@/features/analytics/types';

type AnalyticsStore = {
  data: AnalyticsDataType[];
  addData: (newData: AnalyticsDataType) => void;
  clearData: () => void;
  // getDataAboveTime: ({ ms }: { ms: number }) => AnalyticsDataType[]; // Generic selector
  updateData: (id: string, newData: Partial<AnalyticsDataType>) => void;
  deleteData: (id: string) => void;
  filterData: (criteria: Partial<AnalyticsDataType>) => AnalyticsDataType[];
  getAllData: () => AnalyticsDataType[]; // Method to get all data
};

export const AnalyticsStore = createStore<AnalyticsStore>((set, get) => ({
  data: [],
  addData: (newData) => {
    const dataWithId = { ...newData, analytics_store_id: uuidv4() };
    set((state) => ({
      data: [...state.data, dataWithId],
    }));
  },

  updateData: (id, newData) => {
    set((state) => ({
      data: state.data.map((item) =>
        item.analytics_store_id === id ? { ...item, ...newData } : item,
      ),
    }));
  },
  deleteData: (id) => {
    set((state) => ({
      data: state.data.filter((item) => item.analytics_store_id !== id),
    }));
  },

  filterData: (criteria) => {
    return get().data.filter((item) =>
      Object.entries(criteria).every(([key, value]) => {
        // Ensure the key is a valid key of AnalyticsDataType
        const itemKey = key as keyof AnalyticsDataType;
        return item[itemKey] === value;
      }),
    );
  },
  clearData: () => {
    set({ data: [] });
  },
  // getDataAboveTime: ({ ms }) => {
  //   return get().data.filter(
  //     (item) => item.metadata?.timeInView && item.metadata?.timeInView >= ms,
  //   );
  // },
  getAllData: () => {
    return get().data; // Return all analytics data
  },
}));

export const useAnalytics = () => useStore(AnalyticsStore);

//Path: src/stores/analytics/analytics.ts
