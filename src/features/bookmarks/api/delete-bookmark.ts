import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { ApiCallMutationStatus, ApiResponse, CacheRefType } from '@/types';
import { URI_BOOKMARKS_BY_BOOKMARK_ID } from '@/config/api-constants';
import { uriTemplate } from '@/utils';
import { StoryAction } from '@/features/stories/components/types';
import { useUpdateCachedStory } from '@/features/stories/hooks/useUpdateCachedStory';
import { DeleteBookmarkFormData } from '../types';
import { useUpdateCachedBookmark } from '../hooks/useUpdateCachedBookmark';
import { BookmarkAction } from '../components/types';
import { InteractionType } from '@/features/analytics/types';
import { useLogAnalytics } from '@/features/analytics/hooks/useLogAnalytics';
const { DESTROY_BOOKMARK } = QUERY_KEYS;

export const deleteBookmark = (
  data: DeleteBookmarkFormData,
): Promise<ApiResponse> => {
  const uri = uriTemplate(URI_BOOKMARKS_BY_BOOKMARK_ID, {
    bookmark_id: data.bookmark_id.toString(),
  });

  return apiClient.delete(`${uri}`, { requiresAuth: true });
};
type UseDeleteBookmarkOptions = {
  onSuccess?: (response: any) => void;
  onError?: (message: any) => void;
  bookmark_id: string;
  cacheRefQueryKey: CacheRefType;
};

export const useDeleteBookmark = ({
  bookmark_id,
  onSuccess,
  onError,
  cacheRefQueryKey,
}: UseDeleteBookmarkOptions) => {
  const { logAnalytics } = useLogAnalytics();
  const updateCachedBookmark = useUpdateCachedBookmark();
  const mutationKey = [DESTROY_BOOKMARK, bookmark_id];
  const {
    mutateAsync: submit,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: mutationKey,
    mutationFn: deleteBookmark,
    onSuccess: (response) => {
      updateCachedBookmark(
        cacheRefQueryKey,
        bookmark_id,
        BookmarkAction.DELETE_BOOKMARK,
      );

      // TODO: get the correct id for story and replace off the bookmark_id
      const analyticsData = {
        analytics_store_id: '', // This will be generated in the store
        event: InteractionType.UNBOOKMARK,
        story: bookmark_id,
        interaction_type: InteractionType.UNBOOKMARK,
        timestamp: Date.now(),
        metadata: {
          story_id: bookmark_id,
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

// Path: src/features/bookmarks/api/delete-bookmark.ts
