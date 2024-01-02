import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { ApiResponse, CacheRefType } from '@/types';
import { URI_BOOKMARKS } from '@/config/api-constants';
import { AddBookmarkFormData } from '../types';
import { StoryAction } from '@/features/stories/components/types';
import { useUpdateCachedStory } from '@/features/stories/hooks/useUpdateCachedStory';
import { useLogAnalytics } from '@/features/analytics/hooks/useLogAnalytics';
import { InteractionType } from '@/features/analytics/types';
const { ADD_BOOKMARK } = QUERY_KEYS;

export const addBookmark = (
  data: AddBookmarkFormData,
): Promise<ApiResponse> => {
  return apiClient.post(`${URI_BOOKMARKS}`, data, { requiresAuth: true });
};
type UseAddBookmarkOptions = {
  onSuccess?: (data: any) => void;
  onError?: (message: any) => void;
  story_id: string;
  cacheRefQueryKey: CacheRefType;
};

export const useAddBookmark = ({
  story_id,
  onSuccess,
  onError,
  cacheRefQueryKey,
}: UseAddBookmarkOptions) => {
  const { logAnalytics } = useLogAnalytics();
  const updateCachedStory = useUpdateCachedStory();
  const mutationKey = [ADD_BOOKMARK, story_id];
  const { mutate: submit, isLoading } = useMutation({
    mutationKey: mutationKey,
    mutationFn: addBookmark,
    onSuccess: (response) => {
      // Invalidate and refetch something when a post is unbookmarked
      //   queryClient.invalidateQueries('someQueryKey');

      updateCachedStory(cacheRefQueryKey, story_id, StoryAction.ADD_BOOKMARK);

      const analyticsData = {
        analytics_store_id: '', // This will be generated in the store
        event: InteractionType.ADD_BOOKMARK,
        story: story_id,
        interaction_type: InteractionType.ADD_BOOKMARK,
        timestamp: Date.now(),
        metadata: {
          story_id,
          bookmark_id: response?.data?.id, // Example bookmark ID
        },
      };
      // Log add bookmark
      logAnalytics(analyticsData);

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

// Path: src/features/bookmarks/api/post-add-bookmark.ts
