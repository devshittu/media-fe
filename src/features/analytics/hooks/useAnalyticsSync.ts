'use client';
import { useEffect } from 'react';
import { AnalyticsStore } from '@/stores/analytics/analytics';
import { useAddBatchAnalytics } from '../api/post-add-batch-analytics';

type UseAnalyticsSyncOptions = {
  interval?: number; // Time interval for sending data in milliseconds
  onSuccess?: (data: any) => void;
  onError?: (message: any) => void;
};

export const useAnalyticsSync = ({
  interval = 10000, //10 seconds OR 60000, // Default to 1 minute
  onSuccess,
  onError,
}: UseAnalyticsSyncOptions) => {
  const { submit, isLoading } = useAddBatchAnalytics({ onSuccess, onError });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedAnalyticsData = AnalyticsStore.getState().getAllData();
      console.log(`analyticsdebug: Ready to sync data`, storedAnalyticsData);
      if (storedAnalyticsData.length > 0) {
        console.log('syncing to server://', storedAnalyticsData.length);
        submit(storedAnalyticsData);
      }
    }, interval);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// src/features/analytics/hooks/useAnalyticsSync.ts
