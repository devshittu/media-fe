import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { ApiResponse } from '@/types';
import { URI_BOOKMARKS } from '@/config/api-constants';
import { AddBookmarkFormData } from '../types';
const { ADD_BOOKMARK } = QUERY_KEYS;

export const addBookmark = (
  data: AddBookmarkFormData,
): Promise<ApiResponse> => {
  return apiClient.post(`${URI_BOOKMARKS}`, data);
};
type UseAddBookmarkOptions = {
  onSuccess?: (data: any) => void;
  onError?: (message: any) => void;
};

export const useAddBookmark = ({
  onSuccess,
  onError,
}: UseAddBookmarkOptions) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationKey: [ADD_BOOKMARK],
    mutationFn: addBookmark,
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
