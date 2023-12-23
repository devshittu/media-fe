import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { ApiResponse, CacheRefType } from '@/types';
import { URI_BOOKMARKS_BY_STORY_ID } from '@/config/api-constants';
import { uriTemplate } from '@/utils';
import { StoryAction } from '@/features/stories/components/types';
import { useUpdateCachedStory } from '@/features/stories/hooks/useUpdateCachedStory';
import { DeleteBookmarkFormData } from '../types';
const { DELETE_BOOKMARK } = QUERY_KEYS;

export const deleteBookmark = (
  data: DeleteBookmarkFormData,
): Promise<ApiResponse> => {
  const uri = uriTemplate(URI_BOOKMARKS_BY_STORY_ID, {
    story_id: data.story_id.toString(),
  });

  return apiClient.delete(`${uri}`, { requiresAuth: true });
};
type UseDeleteBookmarkOptions = {
  // data: {
  //   story_id: string | undefined;
  // };
  onSuccess?: (response: any) => void;
  onError?: (message: any) => void;
  story_id: string;
  cacheRefQueryKey: CacheRefType;
};

export const useDeleteBookmark = ({
  story_id,
  onSuccess,
  onError,
  cacheRefQueryKey,
}: UseDeleteBookmarkOptions) => {
  const updateCachedStory = useUpdateCachedStory();
  const mutationKey = [DELETE_BOOKMARK, story_id];
  const { mutate: submit, isLoading } = useMutation({
    mutationKey: mutationKey,
    mutationFn: deleteBookmark,
    onSuccess: (response) => {
      updateCachedStory(
        cacheRefQueryKey,
        story_id,
        StoryAction.DELETE_BOOKMARK,
      );
      onSuccess?.(response);
    },
    onError: (data) => {
      onError?.(data);
    },
  });

  return {
    mutationKey,
    submit,
    isLoading,
  };
};

// Path: src/features/bookmarks/api/delete-bookmark.ts
