import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { StoriesQueryParams, SearchHistoryResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORIES_SEARCH_HISTORY } from '@/config/api-constants';
import { InfiniteSearchHistoryResponse, InfiniteStoriesResponse } from '../components';
import { ApiCallResultType, CacheRefType } from '@/types';
const { SEARCH_STORIES } = QUERY_KEYS;

type GetStoriesOptions = {
  params?: StoriesQueryParams;
  initialData?: any;
};

export const getUserSearchHistory = ({
  params,
}: GetStoriesOptions): Promise<SearchHistoryResponse> => {
  return apiClient.get(`${URI_STORIES_SEARCH_HISTORY}`, {
    params,
    requiresAuth: true,
  });
};

export const useUserSearchHistory = ({ params }: GetStoriesOptions) => {
  const queryKey: CacheRefType = [
    SEARCH_STORIES,
    ApiCallResultType.DISCRETE,
    params
  ];

  const { data, isFetching, isFetched, error, refetch, } = useQuery({
    queryKey,
    queryFn: () => getUserSearchHistory({ params }),
    enabled: false,
    initialData: {} as SearchHistoryResponse,
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
    error,
    refetch,
  };
};

export const useInfiniteUserSearchHistory = ({
  params,
  initialData,
}: GetStoriesOptions): InfiniteSearchHistoryResponse => {
  console.log(
    'useInfiniteUserSearchHistory: search params',
    JSON.stringify(params),
  );
  const queryKey: CacheRefType = [
    SEARCH_STORIES,
    ApiCallResultType.INFINITE,
    params, // include params to make the query key unique based on parameters
  ];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
    error,
    refetch,
  } = useInfiniteQuery<SearchHistoryResponse>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      // Assert pageParam as number before using it
      const page = pageParam as number;
      const response = await getUserSearchHistory({
        params: { ...params, page },
      });
      return response;
    },
    enabled: false, // Disable automatic query execution
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
    error,
    refetch,
  };
};

// Path: src/features/stories/api/get-user-search-history.ts
