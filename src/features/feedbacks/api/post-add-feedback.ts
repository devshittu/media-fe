import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { ApiResponse } from '@/types';
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
  // data,
  onSuccess,
  onError,
}: UseAddFeedbackOptions) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationKey: [ADD_FEEDBACK],
    mutationFn: addFeedback,
    onSuccess: (data) => {
      // Invalidate and refetch something when a post is unbookmarked
      //   queryClient.invalidateQueries('someQueryKey');
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
