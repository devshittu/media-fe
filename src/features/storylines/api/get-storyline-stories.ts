import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams, StoryListResponse } from '../../stories/types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORYLINES_BY_STORYLINE_ID_STORIES } from '@/config/api-constants';
import { uriTemplate } from '@/utils';
import { ApiCallResultType, CacheRefType } from '@/types';
import { InfiniteStoriesResponse } from '@/features/stories';
const { GET_STORYLINES_STORIES } = QUERY_KEYS;

type GetStorylineStoriesOptions = {
  // storylineId: string;
  params?: StoriesQueryParams;
  // initialData?: any;
};

export const getStorylineStories = ({
  // storylineId,
  params,
}: GetStorylineStoriesOptions): Promise<StoryListResponse> => {
  const uri =
    params?.storylineId &&
    uriTemplate(URI_STORYLINES_BY_STORYLINE_ID_STORIES, {
      storyline_id: params?.storylineId,
    });

  return apiClient.get(`${uri}`, {
    params,
  });
};

export const useStorylineStories = ({
  // storylineId,
  params,
}: GetStorylineStoriesOptions) => {
  const queryKey: CacheRefType = [
    GET_STORYLINES_STORIES,
    ApiCallResultType.DISCRETE,
    params,
  ];
  const { data, isFetching, isFetched } = useQuery({
    queryKey,
    queryFn: () =>
      getStorylineStories({
        // storylineId,
        params,
      }),
    enabled: !!params?.storylineId,
    initialData: {} as StoryListResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteStorylineStories = ({
  params,
}: GetStorylineStoriesOptions): InfiniteStoriesResponse => {
  const queryKey: CacheRefType = [
    GET_STORYLINES_STORIES,
    ApiCallResultType.INFINITE,
    params?.storylineId && params.storylineId,
  ];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
  } =
    // const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      queryKey,
      async ({ pageParam = 1 }) => {
        const response = await getStorylineStories({
          // params?.storylineId,
          params: { ...params, page: pageParam },
        });
        return response;
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          // Check if there are more pages to load
          if (lastPage?.current_page < lastPage?.total_pages) {
            return lastPage.current_page + 1;
          }
          return undefined; // No more pages
        },

        enabled: !!params?.storylineId,
        // initialData: { pages: [initialData], pageParams: [1] },
        //TODO: Keep data fresh for 5 minutes
        staleTime: 1000 * 60 * 5,
        // Keep data in cache for 10 minutes
        cacheTime: 1000 * 60 * 10,
      },
    );
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

//Path: src/features/stories/api/get-storyline-by-story.ts
