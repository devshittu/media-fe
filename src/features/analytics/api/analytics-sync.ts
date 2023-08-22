import { useAnalytics } from '@/stores/analytics/analytics';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { ApiResponse } from '@/types';
const { SYNC_ANALYTICS } = QUERY_KEYS;

type AnalyticsData = {
  // Define the shape of your analytics data here
  event: string;
  timestamp: number;
  // ... other fields
};

type UseAnalyticsSyncOptions = {
  interval?: number; // Time interval for sending data in milliseconds
  onSuccess?: (data: any) => void;
  onError?: (message: any) => void;
};

const sendAnalyticsData = (data: AnalyticsData[]): Promise<ApiResponse> => {
  return apiClient.post('/analytics', data);
};

// export const useAnalyticsSync = ({
//   interval = 10000, //10 seconds OR 60000, // Default to 1 minute
//   onSuccess,
//   onError,
// }: UseAnalyticsSyncOptions) => {
//   const { dataBatch, clearData } = useAnalytics(); // Use dataBatch from analyticsStore

//   const { mutate: syncData, isLoading } = useMutation({
//     mutationKey: [SYNC_ANALYTICS, interval],
//     mutationFn: sendAnalyticsData,
//     onSuccess: (data) => {
//       clearData(); // Clear the batched data after successful upload using analyticsStore's method
//       onSuccess?.(data);
//     },
//     onError: (error) => {
//       onError?.(error);
//     },
//   });

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (dataBatch.length > 0) {
//         console.log('syncing to server://',dataBatch.length)
//         syncData(dataBatch);
//       }
//     }, interval);

//     return () => clearInterval(intervalId);
//   }, [dataBatch, syncData]);

//   // No need for addData here, as it's managed in the analyticsStore

//   return {
//     isLoading,
//   };
// };

export const useAnalyticsSync = ({
  interval = 10000, //10 seconds OR 60000, // Default to 1 minute
  onSuccess,
  onError,
}: UseAnalyticsSyncOptions) => {
  const [dataBatch, setDataBatch] = useState<AnalyticsData[]>([]);

  const { mutate: syncData, isLoading } = useMutation({
    mutationKey: [SYNC_ANALYTICS, interval],
    mutationFn: sendAnalyticsData,
    onSuccess: (data) => {
      setDataBatch([]); // Clear the batched data after successful upload
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (dataBatch.length > 0) {
        console.log('syncing to server://', dataBatch.length);
        syncData(dataBatch);
      }
    }, interval);

    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataBatch, syncData]);

  const addData = (newData: AnalyticsData) => {
    setDataBatch((prevData) => [...prevData, newData]);
  };

  return {
    addData,
    isLoading,
  };
};

// Path: src/features/analytics/api/analytics-sync.ts
