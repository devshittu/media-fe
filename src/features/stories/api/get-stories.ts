import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORIES } from '@/config/api-constants';
import { GetStoriesOptions, InfiniteStoriesResponse } from '../components';
import { ApiCallResultType, CacheRefType } from '@/types';
const { GET_STORIES } = QUERY_KEYS;

export const getStories = ({
  params,
}: GetStoriesOptions): Promise<StoryListResponse> => {
  return apiClient.get(`${URI_STORIES}`, {
    params,
  });
};

export const useStories = ({ params }: GetStoriesOptions) => {
  const queryKey: CacheRefType = [GET_STORIES, ApiCallResultType.DISCRETE];
  const { data, isFetching, isFetched } = useQuery({
    queryKey,
    queryFn: () => getStories({ params }),
    // enabled: !!params?.category_id,
    initialData: {} as StoryListResponse,
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteStories = ({
  params,
}: GetStoriesOptions): InfiniteStoriesResponse => {
  const queryKey: CacheRefType = [GET_STORIES, ApiCallResultType.INFINITE];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
  } = useInfiniteQuery(
    queryKey,
    async ({ pageParam = 1 }) => {
      const response = await getStories({
        params: { ...params, page: pageParam },
      });
      return response;
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.current_page < lastPage.total_pages
          ? lastPage.current_page + 1
          : undefined;
      },

      // initialData: { pages: [initialData], pageParams: [1] },
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

//Path: src/features/stories/api/get-stories.ts
