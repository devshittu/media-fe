import { Story } from './../types/index';
import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORIES_BY_STORY_ID_LIKE } from '@/config/api-constants';
import { uriTemplate } from '@/utils';
import { ApiResponse } from '@/types';
import {
  LikeStoryFormData,
  StoryAction,
  UseLikeStoryOptions,
} from '../components';
import { useUpdateCachedStory } from '../hooks/useUpdateCachedStory';
import { useLogAnalytics } from '@/features/analytics/hooks/useLogAnalytics';
import { InteractionType } from '@/features/analytics/types';
const { LIKE_STORY } = QUERY_KEYS;

export const likeStory = ({
  story_slug,
  story_id,
}: LikeStoryFormData): Promise<ApiResponse> => {
  let uri: string;

  if (story_id) {
    uri = uriTemplate(URI_STORIES_BY_STORY_ID_LIKE, {
      story_id: story_id.toString(),
    });
  } else {
    throw new Error('story_id must be provided.');
  }

  return apiClient.post(
    uri,
    {
      data: story_id ? { story_id } : { story_slug },
    },
    { requiresAuth: true },
  );
};

export const useLikeStory = ({
  story_id,
  onSuccess,
  onError,
  cacheRefQueryKey,
}: UseLikeStoryOptions) => {
  const { logAnalytics } = useLogAnalytics();
  const updateCachedStory = useUpdateCachedStory();
  const mutationKey = [LIKE_STORY, story_id];
  const { mutate: submit, isLoading } = useMutation({
    mutationKey: mutationKey,
    mutationFn: likeStory,
    onSuccess: (response) => {
      // To update a story in the stories cache
      updateCachedStory(cacheRefQueryKey, story_id, StoryAction.LIKE);

      const analyticsData = {
        analytics_store_id: '', // This will be generated in the store
        event: InteractionType.LIKE,
        story: story_id,
        interaction_type: InteractionType.LIKE,
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

  return {
    submit,
    isLoading,
  };
};
//Path: src/features/stories/api/post-like-story.ts
