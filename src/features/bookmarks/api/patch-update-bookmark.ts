import { bookmarks } from '@/testing/test-data/bookmarks';
import { BookmarkAction } from '../components/types';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { ApiResponse, CacheRefType } from '@/types';
import { URI_BOOKMARKS_BY_BOOKMARK_ID } from '@/config/api-constants';
import { UpdateBookmarkFormData } from '../types';
import { useUpdateCachedBookmark } from '@/features/bookmarks/hooks/useUpdateCachedBookmark';
import { uriTemplate } from '@/utils';
import { useLogAnalytics } from '@/features/analytics/hooks/useLogAnalytics';
import { InteractionType } from '@/features/analytics/types';
const { UPDATE_BOOKMARK } = QUERY_KEYS;
export type UpdateBookmarkParameter = {
  bookmark_id: string;
  payload?: UpdateBookmarkFormData;
};
export const updateBookmark = ({
  bookmark_id,
  ...data
}: UpdateBookmarkFormData): Promise<ApiResponse> => {
  const uri = uriTemplate(URI_BOOKMARKS_BY_BOOKMARK_ID, {
    bookmark_id: bookmark_id.toString(),
  });
  return apiClient.patch(`${uri}`, data, {
    requiresAuth: true,
  });
};
type UseUpdateBookmarkOptions = {
  onSuccess?: (data: any) => void;
  onError?: (message: any) => void;
  bookmark_id: string;
  cacheRefQueryKey: CacheRefType;
};

export const useUpdateBookmark = ({
  bookmark_id,
  onSuccess,
  onError,
  cacheRefQueryKey,
}: UseUpdateBookmarkOptions) => {
  const { logAnalytics } = useLogAnalytics();
  const updateCachedBookmark = useUpdateCachedBookmark();
  const mutationKey = [UPDATE_BOOKMARK, bookmark_id];
  const { mutate: submit, isPending, isSuccess } = useMutation({
    mutationKey: mutationKey,
    mutationFn: updateBookmark,
    onSuccess: (response) => {
      // Invalidate and refetch something when a post is unbookmarked
      //   queryClient.invalidateQueries('someQueryKey');
      console.log();
      updateCachedBookmark(
        cacheRefQueryKey,
        bookmark_id,
        BookmarkAction.EDIT_BOOKMARK,
      );

      const analyticsData = {
        analytics_store_id: '', // This will be generated in the store
        event: InteractionType.UPDATE_BOOKMARK,
        story: response?.data?.story?.id,
        interaction_type: InteractionType.UPDATE_BOOKMARK,
        timestamp: Date.now(),
        metadata: {
          story_id: response?.data?.story?.id,
          bookmark_id, // Example bookmark ID
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

// Path: src/features/bookmarks/api/post-add-bookmark.ts
