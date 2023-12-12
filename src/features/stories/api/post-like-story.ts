import { Story } from './../types/index';
import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import {
  URI_STORIES_BY_STORY_ID_LIKE,
  URI_STORIES_BY_STORY_SLUG_LIKE,
} from '@/config/api-constants';
import { uriTemplate } from '@/utils';
import { ApiResponse } from '@/types';
import {
  LikeStoryFormData,
  StoryAction,
  UseLikeStoryOptions,
} from '../components';
import { useUpdateStoryInCache } from './get-stories';
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
  } else if (story_slug) {
    uri = uriTemplate(URI_STORIES_BY_STORY_SLUG_LIKE, {
      story_slug,
    });
  } else {
    throw new Error('Either story_id or story_slug must be provided.');
  }

  return apiClient.post(uri, {
    data: story_id ? { story_id } : { story_slug },
  });
};

export const useLikeStory = ({
  story_id,
  onSuccess,
  onError,
}: UseLikeStoryOptions) => {
  const updateStoryInCache = useUpdateStoryInCache();
  const { mutate: submit, isLoading } = useMutation({
    mutationKey: [LIKE_STORY, story_id],
    mutationFn: likeStory,
    onSuccess: (data) => {
      // TODO: Update the cache
      updateStoryInCache(story_id, StoryAction.LIKE);

      // Invalidate and refetch something when a post is unbookmarked
      //   queryClient.invalidateQueries('someQueryKey');

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
//Path: src/features/stories/api/post-like-story.ts
