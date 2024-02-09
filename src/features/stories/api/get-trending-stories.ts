import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams, StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_TRENDING_STORIES } from '@/config/api-constants';
import { InfiniteStoriesResponse, StoryAction } from '../components';
import { ApiCallResultType, CacheRefType } from '@/types';
const { GET_TRENDING_STORIES } = QUERY_KEYS;

type GetStoriesOptions = {
  params?: StoriesQueryParams;
  initialData?: any;
};

export const getTrendingStories = ({
  params,
}: GetStoriesOptions): Promise<StoryListResponse> => {
  return apiClient.get(`${URI_TRENDING_STORIES}`, {
    params,
  });
};

export const useTrendingStories = ({ params }: GetStoriesOptions) => {
  const queryKey: CacheRefType = [
    GET_TRENDING_STORIES,
    ApiCallResultType.DISCRETE,
  ];

  const { data, isFetching, isFetched } = useQuery({
    queryKey,
    queryFn: () => getTrendingStories({ params }),
    // enabled: !!params?.category_id,
    initialData: {} as StoryListResponse,
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteTrendingStories = ({
  params,
  initialData,
}: GetStoriesOptions): InfiniteStoriesResponse => {
  const queryKey: CacheRefType = [
    GET_TRENDING_STORIES,
    ApiCallResultType.INFINITE,
  ];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
  } = useInfiniteQuery<StoryListResponse>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      // Assert pageParam as number before using it
      const page = pageParam as number;
      const response = await getTrendingStories({
        params: { ...params, page },
      });
      return response;
    },

    getNextPageParam: (lastPage, allPages) => {
      // Check if there are more pages to load
      if (lastPage?.current_page < lastPage?.total_pages) {
        return lastPage.current_page + 1;
      }
      return undefined; // No more pages
    },
    initialPageParam: 1,
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

//Path: src/features/stories/api/get-trending-stories.ts
