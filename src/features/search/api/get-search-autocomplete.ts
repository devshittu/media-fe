import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { SearchQueryParams, AutocompleteResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORIES_SEARCH_AUTOCOMPLETE } from '@/config/api-constants';
import { ApiCallResultType, CacheRefType } from '@/types';
import { InfiniteAutocompleteResponse } from '../components/types';
import { NotificationType, useNotifications } from '@/stores/notifications';
import { parseError } from '@/utils';
const { GET_AUTOCOMPLETE_STORIES } = QUERY_KEYS;

type GetStoriesOptions = {
  params?: SearchQueryParams;
  initialData?: any;
};

export const getSearchAutocomplete = ({
  params,
}: GetStoriesOptions): Promise<AutocompleteResponse> => {
  return apiClient.get(`${URI_STORIES_SEARCH_AUTOCOMPLETE}`, {
    params,
    requiresAuth: true,
  });
};

export const useSearchAutocomplete = ({ params }: GetStoriesOptions) => {
  const { showNotification } = useNotifications();
  const queryKey: CacheRefType = [
    GET_AUTOCOMPLETE_STORIES,
    ApiCallResultType.DISCRETE,
    params
  ];

  const { data, isFetching, isFetched, error, refetch, } = useQuery({
    queryKey,
    // queryFn: () => getSearchAutocomplete({ params }),
    queryFn: async () => {
      try {
        return await getSearchAutocomplete({ params });
      } catch (error) {
        // Handle AxiosError

        console.error(
          'RecentSearchHistory: Unable to retrieve autocomplete result. ',
          error,
        );
        // Handle the error here if needed
        const parsedError = parseError(error);
        console.error(
          'Error retrieving recent autocomplete result: ',
          JSON.stringify(parsedError),
        );

        showNotification({
          type: NotificationType.ERROR,
          title: 'Error',
          duration: 5000,
          message: 'Unable to retrieve autocomplete result',
        });
        // Return fallback empty data to avoid breaking the UI
        return { results: [], count: 0 };
      }
    },
    enabled: !!params?.q,
    initialData: {} as AutocompleteResponse,
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
    error,
    refetch,
  };
};

// Ensure fallback data matches the AutocompleteResponse structure
const fallbackData: AutocompleteResponse = {
  results: [],
  count: 0,
  total_pages: 1,
  current_page: 1,
};

export const useInfiniteSearchAutocomplete = ({
  params,
  initialData,
}: GetStoriesOptions): InfiniteAutocompleteResponse => {

  const { showNotification } = useNotifications();
  const queryKey: CacheRefType = [
    GET_AUTOCOMPLETE_STORIES,
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
  } = useInfiniteQuery<AutocompleteResponse>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        // Assert pageParam as number before using it
        const page = pageParam as number;
        return await getSearchAutocomplete({
          params: { ...params, page },
        });
      } catch (error) {
        // Handle error with try-catch
        console.error('useInfiniteSearchAutocomplete: Error occurred: ', error);

        const parsedError = parseError(error);
        console.error('Error details: ', parsedError);

        // Show notification
        showNotification({
          type: NotificationType.ERROR,
          title: 'Error',
          duration: 5000,
          message: 'Unable to retrieve more autocomplete results.',
        });

        // Return fallback data to avoid breaking the UI
        return fallbackData;
      }
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

// Path: src/features/stories/api/get-search-autocomplete.ts
