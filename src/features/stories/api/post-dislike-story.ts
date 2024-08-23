import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORIES_BY_STORY_ID_DISLIKE } from '@/config/api-constants';
import { uriTemplate } from '@/utils';
import { ApiCallMutationStatus, ApiResponse } from '@/types';
import {
  LikeStoryFormData,
  StoryAction,
  UseLikeStoryOptions,
} from '../components';
import { InteractionType } from '@/features/analytics/types';
import { useLogAnalytics } from '@/features/analytics/hooks/useLogAnalytics';
import { useUpdateCachedStory } from '../hooks/useUpdateCachedStory';
const { DISLIKE_STORY } = QUERY_KEYS;

export const dislikeStory = ({
  story_slug,
  story_id,
}: LikeStoryFormData): Promise<ApiResponse> => {
  let uri: string;

  if (story_id) {
    uri = uriTemplate(URI_STORIES_BY_STORY_ID_DISLIKE, {
      story_id: story_id.toString(),
    });
  } else {
    throw new Error('story_id must be provided.');
  }

  return apiClient.post(uri, {
    data: story_id ? { story_id } : { story_slug },
  },
    { requiresAuth: true },);
};

export const useDislikeStory = ({
  story_id,
  onSuccess,
  onError,
  cacheRefQueryKey,
}: UseLikeStoryOptions) => {
  const { logAnalytics } = useLogAnalytics();
  const updateCachedStory = useUpdateCachedStory();
  const {
    mutateAsync: submit,
    isPending,
    isSuccess,
    isIdle,
    isPaused,
    status,
  } = useMutation({
    mutationKey: [DISLIKE_STORY, story_id],
    mutationFn: dislikeStory,
    onSuccess: (response) => {
      // To update a story in the stories cache
      updateCachedStory(cacheRefQueryKey, story_id, StoryAction.DISLIKE);

      const analyticsData = {
        analytics_store_id: '', // This will be generated in the store
        event: InteractionType.DISLIKE,
        story: story_id,
        interaction_type: InteractionType.DISLIKE,
        timestamp: Date.now(),
        metadata: {
          story_id: story_id,
          //   bookmark_id, // Example bookmark ID
        },
      };
      // Log add bookmark
      logAnalytics(analyticsData);
      // Invalidate and refetch something when a post is unbookmarked
      //   queryClient.invalidateQueries('someQueryKey');
      onSuccess?.(response);
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  // Compute custom isLoading
  const isLoading = isPending || isIdle || isPaused;

  return {
    submit,
    isLoading,
  };
};
//Path: src/features/stories/api/post-dislike-story.ts
