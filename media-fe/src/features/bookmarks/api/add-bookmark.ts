import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { ApiResponse } from '@/types';
const { ADD_BOOKMARKS } = QUERY_KEYS;

type AddBookmarkData = {
  data: {
    story_id: string | undefined;
  };
};

export const addBookmark = ({
  data,
}: AddBookmarkData): Promise<ApiResponse> => {
  //  const formData = new FormData();
  //     formData.append('story_id', data.story_id || '');

  // return apiClient.post('/bookmarks', formData,
  // {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // }
  // );
  return apiClient.post('/bookmarks', { data });
};
type UseAddBookmarkOptions = {
  data: {
    story_id: string | undefined;
  };
  onSuccess?: (data: any) => void;
  onError?: (message: any) => void;
};

export const useAddBookmark = ({
  data,
  onSuccess,
  onError,
}: UseAddBookmarkOptions) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationKey: [ADD_BOOKMARKS, data],
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
