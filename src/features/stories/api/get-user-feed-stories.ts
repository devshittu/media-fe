import {
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import {
  StoryListResponse,
} from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_USER_FEED } from '@/config/api-constants';
import { GetStoriesOptions, InfiniteStoriesResponse } from '../components';
import { ApiCallResultType, CacheRefType } from '@/types';
const { GET_USER_FEED_STORIES } = QUERY_KEYS;

export const getUserFeedStories = ({
  params,
}: GetStoriesOptions): Promise<StoryListResponse> => {
  return apiClient.get(`${URI_USER_FEED}`, {
    params,
    requiresAuth: true,
  });
};

export const useUserFeedStories = ({ params }: GetStoriesOptions) => {
  const queryKey: CacheRefType = [
    GET_USER_FEED_STORIES,
    ApiCallResultType.DISCRETE,
  ];
  const { data, isFetching, isFetched } = useQuery({
    queryKey,
    queryFn: () => getUserFeedStories({ params }),
    // enabled: !!params?.category_id,
    initialData: {} as StoryListResponse,
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteUserFeedStories = ({
  params,
}: GetStoriesOptions): InfiniteStoriesResponse => {
  const queryKey: CacheRefType = [
    GET_USER_FEED_STORIES,
    ApiCallResultType.INFINITE,
  ];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
  } = useInfiniteQuery<StoryListResponse>(
    queryKey,
    async ({ pageParam = 1 }) =>
      await getUserFeedStories({ params: { ...params, page: pageParam } }),
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
  return {
    queryKey,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isFetching && !isFetched,
  };
};

//Path: src/features/stories/api/get-user-feed-stories.ts
