import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import {
  URI_STORIES_BY_STORY_ID_UNLIKE,
  URI_STORIES_BY_STORY_SLUG_UNLIKE,
} from '@/config/api-constants';
import { uriTemplate } from '@/utils';
import { ApiResponse } from '@/types';
import {
  LikeStoryFormData,
  StoryAction,
  UseLikeStoryOptions,
} from '../components';
import { useUpdateCachedStory } from '../hooks/useUpdateCachedStory';
const { UNLIKE_STORY } = QUERY_KEYS;

export const unlikeStory = ({
  story_slug,
  story_id,
}: LikeStoryFormData): Promise<ApiResponse> => {
  let uri: string;

  if (story_id) {
    uri = uriTemplate(URI_STORIES_BY_STORY_ID_UNLIKE, {
      story_id: story_id.toString(),
    });
  } else if (story_slug) {
    uri = uriTemplate(URI_STORIES_BY_STORY_SLUG_UNLIKE, {
      story_slug,
    });
  } else {
    throw new Error('Either story_id or story_slug must be provided.');
  }

  return apiClient.delete(uri, {
    data: story_id ? { story_id } : { story_slug },
    requiresAuth: true,
  });
};

export const useUnlikeStory = ({
  story_id,
  onSuccess,
  onError,
  cacheRefQueryKey,
}: UseLikeStoryOptions) => {
  const updateCachedStory = useUpdateCachedStory();
  const { mutate: submit, isLoading } = useMutation({
    mutationKey: [UNLIKE_STORY, story_id],
    mutationFn: unlikeStory,
    onSuccess: (data) => {
      // updateStoryInCache(story_id, StoryAction.UNLIKE);
      // To update a story in the user feed stories cache
      updateCachedStory(cacheRefQueryKey, story_id, StoryAction.UNLIKE);
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
//Path: src/features/stories/api/post-unlike-story.ts
