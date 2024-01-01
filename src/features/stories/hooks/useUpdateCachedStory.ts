import { InfiniteData, useQueryClient } from '@tanstack/react-query';

import { Story, StoryListResponse } from '../types';
import { StoryAction } from '../components';
import { ApiCallResultType, CacheRefType } from '@/types';

export const useUpdateCachedStory = () => {
  const queryClient = useQueryClient();

  const updateStory = (
    cacheRefQueryKey: CacheRefType,
    story_id: number | string,
    actionType: StoryAction,
  ) => {
    const isQueryInfinite = cacheRefQueryKey[1] === ApiCallResultType.INFINITE;
    if (isQueryInfinite) {
      // Handle infinite query cache update
      queryClient.setQueryData<InfiniteData<StoryListResponse> | undefined>(
        cacheRefQueryKey,
        (oldData) => {
          return updateStoryDataInPages(oldData, story_id, actionType);
        },
      );
    } else {
      // Handle regular query cache update
      queryClient.setQueryData<StoryListResponse | undefined>(
        cacheRefQueryKey,
        (oldData) => {
          return updateStoryDataInResults(oldData, story_id, actionType);
        },
      );
    }
  };

  return updateStory;
};

function updateStoryDataInPages(
  data: InfiniteData<StoryListResponse> | undefined,
  story_id: number | string,
  actionType: StoryAction,
): InfiniteData<StoryListResponse> | undefined {
  if (!data) return undefined;
  const updatedPages = data.pages
    .map((page) => updateStoryDataInResults(page, story_id, actionType))
    .filter((page): page is StoryListResponse => page !== undefined);

  return {
    ...data,
    pages: updatedPages,
  };
}

function updateStoryDataInResults(
  data: StoryListResponse | undefined,
  story_id: number | string,
  actionType: StoryAction,
): StoryListResponse | undefined {
  if (!data) return undefined;

  return {
    ...data,
    results: data.results.map((story) => {
      if (story.id === story_id) {
        return updateStoryBasedOnAction(story, actionType);
      }
      return story;
    }),
  };
}

function updateStoryBasedOnAction(
  story: Story,
  actionType: StoryAction,
): Story {
  let updatedStory = { ...story };
  switch (actionType) {
    case StoryAction.LIKE:
      updatedStory = {
        ...updatedStory,
        likes_count: (updatedStory.likes_count || 0) + 1,
        has_liked: true,
      };
      break;
    case StoryAction.UNLIKE:
      updatedStory = {
        ...updatedStory,
        likes_count: Math.max((updatedStory.likes_count || 0) - 1, 0),
        has_liked: false,
      };
      break;
    case StoryAction.DISLIKE:
      // Similar logic for dislike
      updatedStory = {
        ...updatedStory,
        dislikes_count: (updatedStory.dislikes_count || 0) + 1,
        has_disliked: true,
      };
      break;
    case StoryAction.UNDISLIKE:
      // Similar logic for undislike
      updatedStory = {
        ...updatedStory,
        dislikes_count: Math.max((updatedStory.dislikes_count || 0) - 1, 0),
        has_disliked: false,
      };
      break;

    case StoryAction.ADD_BOOKMARK:
      updatedStory = {
        ...updatedStory,
        has_bookmarked: true,
      };
      break;
    case StoryAction.DELETE_BOOKMARK:
      updatedStory = {
        ...updatedStory,
        has_bookmarked: false,
      };
      break;
    // Handle other action types...
  }
  return updatedStory;
}

//Path: src/features/stories/hooks/useUpdateCachedStory.ts
