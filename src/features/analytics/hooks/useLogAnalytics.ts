import { useAnalytics } from '@/stores/analytics/analytics';
import {
  AnalyticsData,
  AnalyticsDataType,
  InteractionType,
} from '@/features/analytics/types';
import { useCallback } from 'react';

export const useLogAnalytics = () => {
  const { addData, updateData, deleteData, filterData } = useAnalytics();

  const logAnalytics = useCallback(
    (data: AnalyticsDataType) => {
      const analyticsData: AnalyticsDataType = {
        ...data, //add additional metadata
      };
      addData(analyticsData);
    },
    [addData],
  );

  const updateAnalytics = useCallback(
    (id: string, newData: Partial<AnalyticsData>) => {
      updateData(id, newData);
    },
    [updateData],
  );

  const deleteAnalytics = useCallback(
    (id: string) => {
      deleteData(id);
    },
    [deleteData],
  );
  // Example usage of filterData
  const filterAnalytics = useCallback(
    (criteria: Partial<AnalyticsDataType>) => {
      filterData(criteria);
    },
    [filterData],
  );

  return { logAnalytics, updateAnalytics, deleteAnalytics, filterAnalytics };
};

// Path: src/features/analytics/hooks/useLogAnalytics.ts