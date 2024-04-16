import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { ApiCallMutationStatus, ApiResponse, CacheRefType } from '@/types';
import { URI_BOOKMARKS_STORY_BY_STORY_ID } from '@/config/api-constants';
import { uriTemplate } from '@/utils';
import { StoryAction } from '@/features/stories/components/types';
import { useUpdateCachedStory } from '@/features/stories/hooks/useUpdateCachedStory';
import { DeleteBookmarkByStoryIdFormData } from '../types';
import { InteractionType } from '@/features/analytics/types';
import { useLogAnalytics } from '@/features/analytics/hooks/useLogAnalytics';
const { DESTROY_BOOKMARK_BY_STORY_ID } = QUERY_KEYS;

export const deleteBookmarkByStoryId = (
  data: DeleteBookmarkByStoryIdFormData,
): Promise<ApiResponse> => {
  const uri = uriTemplate(URI_BOOKMARKS_STORY_BY_STORY_ID, {
    story_id: data.story_id.toString(),
  });

  return apiClient.delete(`${uri}`, { requiresAuth: true });
};
type UseDeleteBookmarkOptions = {
  onSuccess?: (response: any) => void;
  onError?: (message: any) => void;
  story_id: string;
  cacheRefQueryKey: CacheRefType;
};

export const useDeleteBookmarkByStoryId = ({
  story_id,
  onSuccess,
  onError,
  cacheRefQueryKey,
}: UseDeleteBookmarkOptions) => {
  const updateCachedStory = useUpdateCachedStory();
  const { logAnalytics } = useLogAnalytics();
  const mutationKey = [DESTROY_BOOKMARK_BY_STORY_ID, story_id];
  const {
    mutate: submit,
    status,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: mutationKey,
    mutationFn: deleteBookmarkByStoryId,
    onSuccess: (response) => {
      updateCachedStory(
        cacheRefQueryKey,
        story_id,
        StoryAction.DELETE_BOOKMARK,
      );

      const analyticsData = {
        analytics_store_id: '', // This will be generated in the store
        event: InteractionType.UNBOOKMARK,
        story: story_id,
        interaction_type: InteractionType.UNBOOKMARK,
        timestamp: Date.now(),
        metadata: {
          story_id: story_id,
          //   bookmark_id, // Example bookmark ID
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
    isLoading: isPending && !isSuccess,
  };
};

// Path: src/features/bookmarks/api/delete-bookmark-by-story-id.ts
