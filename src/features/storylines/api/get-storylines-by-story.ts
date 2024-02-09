import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams } from '../../stories/types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORIES_BY_SLUG_STORYLINES } from '@/config/api-constants';
import { uriTemplate } from '@/utils';
import { StorylineListResponse } from '../types';
import { ApiCallResultType, CacheRefType } from '@/types';
const { GET_STORIES, GET_STORYLINES_BY_STORY_SLUG } = QUERY_KEYS;

type GetStorylinesByStoryOptions = {
  storySlug: string;
  params?: StoriesQueryParams;
  initialData?: any;
};

export const getStorylinesByStory = ({
  storySlug,
  params,
}: GetStorylinesByStoryOptions): Promise<StorylineListResponse> => {
  const uri =
    storySlug &&
    uriTemplate(URI_STORIES_BY_SLUG_STORYLINES, {
      slug: storySlug,
    });

  return apiClient.get(`${uri}`, {
    params,
  });
};

export const useStorylinesByStory = ({
  storySlug,
  params,
}: GetStorylinesByStoryOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_STORIES, params, storySlug],
    queryFn: () =>
      getStorylinesByStory({
        storySlug,
        params,
      }),
    initialData: {} as StorylineListResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteStorylinesByStory = ({
  storySlug,
  params,
  initialData,
}: GetStorylinesByStoryOptions) => {
  const queryKey: CacheRefType = [
    GET_STORYLINES_BY_STORY_SLUG,
    ApiCallResultType.INFINITE,
  ];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
  } = useInfiniteQuery<StorylineListResponse>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const page = pageParam as number;
      const response = await getStorylinesByStory({
        storySlug,
        params: { ...params, page },
      });
      return response;
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage: StorylineListResponse) => {
      return lastPage.current_page < lastPage.total_pages
        ? lastPage.current_page + 1
        : undefined;
    },
  });
  // Extract count from the first page
  const count = data?.pages[0]?.count;

  return {
    queryKey,
    data,
    count: count || 0,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isFetching && !isFetched,
  };
};

//Path: src/features/stories/api/get-storylines-by-story.ts
