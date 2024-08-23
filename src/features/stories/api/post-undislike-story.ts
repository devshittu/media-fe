import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORIES_BY_STORY_ID_UNDISLIKE } from '@/config/api-constants';
import { uriTemplate } from '@/utils';
import { ApiResponse } from '@/types';
import {
  LikeStoryFormData,
  StoryAction,
  UseLikeStoryOptions,
} from '../components';
import { useUpdateCachedStory } from '../hooks/useUpdateCachedStory';
import { InteractionType } from '@/features/analytics/types';
import { useLogAnalytics } from '@/features/analytics/hooks/useLogAnalytics';
const { UNDISLIKE_STORY } = QUERY_KEYS;

export const undislikeStory = ({
  story_id,
}: LikeStoryFormData): Promise<ApiResponse> => {
  let uri: string;

  if (story_id) {
    uri = uriTemplate(URI_STORIES_BY_STORY_ID_UNDISLIKE, {
      story_id: story_id.toString(),
    });
  } else {
    throw new Error('Either story_id or story_slug must be provided.');
  }

  return apiClient.delete(uri, {
    data: story_id && { story_id },
    requiresAuth: true
  });
};

export const useUndislikeStory = ({
  story_id,
  onSuccess,
  onError,
  cacheRefQueryKey,
}: UseLikeStoryOptions) => {
  const updateCachedStory = useUpdateCachedStory();
  const { logAnalytics } = useLogAnalytics();
  const {
    mutateAsync: submit,
    status,
    isSuccess,
    isPaused,
    isPending,
    isIdle,
  } = useMutation({
    mutationKey: [UNDISLIKE_STORY, story_id],
    mutationFn: undislikeStory,
    onSuccess: (response) => {
      // Invalidate and refetch something when a post is unbookmarked
      //   queryClient.invalidateQueries('someQueryKey');

      updateCachedStory(cacheRefQueryKey, story_id, StoryAction.UNDISLIKE);

      const analyticsData = {
        analytics_store_id: '', // This will be generated in the store
        event: InteractionType.REMOVE_DISLIKE,
        story: story_id,
        interaction_type: InteractionType.REMOVE_DISLIKE,
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
    onError: (error) => {
      onError?.(error);
    },
  });

  // Compute custom isLoading
  const isLoading = isPending && !isSuccess;

  return {
    submit,
    isLoading,
  };
};

//Path: src/features/stories/api/post-undislike-story.ts
