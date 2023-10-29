import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { ApiResponse } from '@/types';
import { URI_BOOKMARKS_BY_STORY_ID } from '@/config/api-constants';
import { uriTemplate } from '@/utils';
const { DELETE_BOOKMARK } = QUERY_KEYS;

type DeleteBookmarkData = {
  data: {
    story_id: string | undefined;
  };
};

export const deleteBookmark = ({
  data,
}: DeleteBookmarkData): Promise<ApiResponse> => {
  const uri = uriTemplate(URI_BOOKMARKS_BY_STORY_ID, {
    story_id: data.story_id + '',
  });

  return apiClient.delete(`${uri}`);
  // return apiClient.delete('/bookmarks', { data });
};
type UseDeleteBookmarkOptions = {
  data: {
    story_id: string | undefined;
  };
  onSuccess?: (response: any) => void;
  onError?: (message: any) => void;
};

export const useDeleteBookmark = ({
  // data,
  onSuccess,
  onError,
}: UseDeleteBookmarkOptions) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationKey: [DELETE_BOOKMARK],
    mutationFn: deleteBookmark,
    onSuccess: (response) => {
      onSuccess?.(response);
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
