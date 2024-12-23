import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORIES_SEARCH_RECENT } from '@/config/api-constants';
import { ApiCallResultType, CacheRefType } from '@/types';
import { SearchHistoryResponse, SearchQueryParams } from '../types';
import { InfiniteSearchHistoryResponse } from '../components/types';
import { parseError } from '@/utils';
import { NotificationType, useNotifications } from '@/stores/notifications';
const { RECENT_SEARCHED_STORIES } = QUERY_KEYS;

type GetStoriesOptions = {
  params?: SearchQueryParams;
  initialData?: any;
};

export const getRecentSearchHistory = ({
  params,
}: GetStoriesOptions): Promise<SearchHistoryResponse> => {
  return apiClient.get(`${URI_STORIES_SEARCH_RECENT}`, {
    params,
    requiresAuth: true,
  });
};

export const useRecentSearchHistory = ({ params }: GetStoriesOptions) => {
  const { showNotification } = useNotifications();
  const queryKey: CacheRefType = [
    RECENT_SEARCHED_STORIES,
    ApiCallResultType.DISCRETE,
    params,
  ];

  const { data, isFetching, isFetched, error, refetch } = useQuery({
    queryKey,
    // queryFn: () => getRecentSearchHistory({ params }),
    queryFn: async () => {
      try {
        return await getRecentSearchHistory({ params });
      } catch (error) {
        // Handle AxiosError

        console.error(
          'RecentSearchHistory: Unable to retrieve recent search history. ',
          error,
        );
        // Handle the error here if needed
        const parsedError = parseError(error);
        console.error(
          'Error retrieving recent search history: ',
          JSON.stringify(parsedError),
        );

        showNotification({
          type: NotificationType.ERROR,
          title: 'Error',
          duration: 5000,
          message: 'Unable to retrieve recent search history',
        });
        // Return fallback empty data to avoid breaking the UI
        return { results: [], count: 0 };
      }
    },
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

export const useInfiniteRecentSearchHistory = ({
  params,
  initialData,
}: GetStoriesOptions): InfiniteSearchHistoryResponse => {
  console.log(
    'useInfiniteRecentSearchHistory: search params',
    JSON.stringify(params),
  );
  const queryKey: CacheRefType = [
    RECENT_SEARCHED_STORIES,
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
      const response = await getRecentSearchHistory({
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
