import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { ApiResponse } from '@/types';
const { DELETE_BOOKMARK } = QUERY_KEYS;

type DeleteBookmarkData = {
  data: {
    story_id: string | undefined;
  };
};

export const deleteBookmark = ({
  data,
}: DeleteBookmarkData): Promise<ApiResponse> => {
  return apiClient.delete('/bookmarks', { data });
};
type UseDeleteBookmarkOptions = {
  data: {
    story_id: string | undefined;
  };
  onSuccess?: (data: any) => void;
  onError?: (message: any) => void;
};

export const useDeleteBookmark = ({
  data,
  onSuccess,
  onError,
}: UseDeleteBookmarkOptions) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationKey: [DELETE_BOOKMARK, data],
    mutationFn: deleteBookmark,
    onSuccess: (data) => {
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
