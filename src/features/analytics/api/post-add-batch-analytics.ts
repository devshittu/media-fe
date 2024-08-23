// src/features/analytics/api/post-add-batch-analytics.ts
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { ApiResponse } from '@/types';
import { URI_ANALYTICS_INTERACTIONS_BATCH } from '@/config/api-constants';
import { AddBatchAnalyticsFormData } from '../types';
import { AnalyticsStore } from '@/stores/analytics';
const { ADD_BATCH_ANALYTICS } = QUERY_KEYS;

export const addBatchAnalytics = (
  data: AddBatchAnalyticsFormData,
): Promise<ApiResponse> => {
  return apiClient.post(URI_ANALYTICS_INTERACTIONS_BATCH, data);
};
type UseAddBatchAnalyticsOptions = {
  onSuccess?: (data: any) => void;
  onError?: (message: any) => void;
};

export const useAddBatchAnalytics = ({
  onSuccess,
  onError,
}: UseAddBatchAnalyticsOptions) => {
  const { mutateAsync: submit, isLoading } = useMutation({
    mutationKey: [ADD_BATCH_ANALYTICS],
    mutationFn: addBatchAnalytics,
    onSuccess: (data) => {
      // Clear the batched data after successful upload
      AnalyticsStore.getState().clearData();
      onSuccess?.(data);
    },
    onError: (data) => {
      onError?.(data);
    },
  });

  return {
    submit,
    isLoading,
  };
};
