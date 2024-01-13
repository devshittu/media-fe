import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_USER_INVERSE_FEED } from '@/config/api-constants';
import { GetStoriesOptions, InfiniteStoriesResponse } from '../components';
import { ApiCallResultType, CacheRefType } from '@/types';
const { GET_USER_INVERSE_FEED_STORIES } = QUERY_KEYS;

export const getUserInvertedFeedStories = ({
  params,
}: GetStoriesOptions): Promise<StoryListResponse> => {
  return apiClient.get(`${URI_USER_INVERSE_FEED}`, {
    params,
    requiresAuth: true,
  });
};

export const useUserInvertedFeedStories = ({
  params,
  initialData = {},
}: GetStoriesOptions) => {
  const queryKey: CacheRefType = [
    GET_USER_INVERSE_FEED_STORIES,
    ApiCallResultType.DISCRETE,
  ];
  const { data, isFetching, isFetched } = useQuery({
    queryKey,
    queryFn: () => getUserInvertedFeedStories({ params }),
    // enabled: !!params?.category_id,
    initialData: initialData as StoryListResponse,
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteUserInvertedFeedStories = ({
  params,
}: GetStoriesOptions): InfiniteStoriesResponse => {
  const queryKey: CacheRefType = [
    GET_USER_INVERSE_FEED_STORIES,
    ApiCallResultType.INFINITE,
  ];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isFetched,
  } = useInfiniteQuery<StoryListResponse>(
    queryKey,
    async ({ pageParam = 1 }) =>
      await getUserInvertedFeedStories({
        params: { ...params, page: pageParam },
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        // Check if there are more pages to load
        if (lastPage.current_page < lastPage.total_pages) {
          return lastPage.current_page + 1;
        }
        return undefined; // No more pages
      },
      // Keep data fresh for 5 minutes
      staleTime: 1000 * 60 * 5,
      // Keep data in cache for 10 minutes
      cacheTime: 1000 * 60 * 10,
    },
  );

  // Extract count from the first page
  const count = data?.pages[0]?.count;
  return {
    queryKey,
    count: count || 0,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isFetching && !isFetched,
  };
};
//Path: src/features/stories/api/get-user-inverse-feed-stories.ts
