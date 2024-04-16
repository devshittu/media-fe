import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { ApiCallResultType, ApiResponse, CacheRefType } from '@/types';
import { URI_FEEDBACKS_REPORT } from '@/config/api-constants';
import { AddFeedbackFormData } from '../types';
const { ADD_FEEDBACK } = QUERY_KEYS;

export const addFeedback = (
  data: AddFeedbackFormData,
): Promise<ApiResponse> => {
  return apiClient.post(`${URI_FEEDBACKS_REPORT}`, data);
};
type UseAddFeedbackOptions = {
  onSuccess?: (data: any) => void;
  onError?: (message: any) => void;
};

export const useAddFeedback = ({
  onSuccess,
  onError,
}: UseAddFeedbackOptions) => {
  const mutationKey: CacheRefType = [ADD_FEEDBACK, ApiCallResultType.SINGLE];

  const {
    mutate: submit,
    isPending,
    isSuccess,
    isError,
    isIdle,
    isPaused,
  } = useMutation({
    mutationKey,
    mutationFn: addFeedback,
    // mutationFn: addFeedbackInternal,
    onSuccess: (data) => {
      // Invalidate and refetch something when a post is unbookmarked
      //   queryClient.invalidateQueries('someQueryKey');
      onSuccess?.(data);
    },
    onError: (data) => {
      onError?.(data);
    },
  });
  // Compute custom isLoading
  const isLoading = isPending || isIdle || isPaused;

  return {
    submit,
    isLoading,
  };
};

// Path: src/features/feedbacks/api/post-add-feedback.ts
