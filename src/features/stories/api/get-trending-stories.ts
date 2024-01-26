import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams, Story, StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_TRENDING_STORIES } from '@/config/api-constants';
import { InfiniteStoriesResponse, StoryAction } from '../components';
import { ApiCallResultType, CacheRefType } from '@/types';
import useApiClientAuth from '@/features/auth/hooks/useApiClientAuth';
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
  const apiClientAuth = useApiClientAuth();
  const queryKey: CacheRefType = [
    GET_TRENDING_STORIES,
    ApiCallResultType.DISCRETE,
  ];

  const fetchTrendingStories = async ({ params }: GetStoriesOptions): Promise<StoryListResponse> => {
    return await apiClientAuth.get(`${URI_TRENDING_STORIES}`, { params });
  };
  const { data, isFetching, isFetched } = useQuery({
    queryKey,
    // queryFn: () => getTrendingStories({ params }),
    queryFn: () => fetchTrendingStories({ params }),
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
  const apiClientAuth = useApiClientAuth();
  const queryKey: CacheRefType = [
    GET_TRENDING_STORIES,
    ApiCallResultType.INFINITE,
  ];

  const fetchInfiniteTrendingStories = async ({
    pageParam = 1,
  }): Promise<StoryListResponse> => {
    const response = await apiClientAuth.get(`${URI_TRENDING_STORIES}`, {
      params: { ...params, page: pageParam },
    });
    return response as any;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
  } = useInfiniteQuery<StoryListResponse>(
    queryKey,
    fetchInfiniteTrendingStories,
    // async ({ pageParam = 1 }) =>
    //   await getTrendingStories({ params: { ...params, page: pageParam } }),
    {
      getNextPageParam: (lastPage, allPages) => {
        // Check if there are more pages to load
        if (lastPage?.current_page < lastPage?.total_pages) {
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
    data,
    count: count || 0,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isFetching && !isFetched,
  };
};

//Path: src/features/stories/api/get-trending-stories.ts
