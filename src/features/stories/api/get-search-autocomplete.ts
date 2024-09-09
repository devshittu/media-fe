import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { StoriesQueryParams, AutocompleteResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORIES_SEARCH_AUTOCOMPLETE } from '@/config/api-constants';
import { InfiniteAutocompleteResponse } from '../components';
import { ApiCallResultType, CacheRefType } from '@/types';
const { SEARCH_STORIES } = QUERY_KEYS;

type GetStoriesOptions = {
  params?: StoriesQueryParams;
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
  const queryKey: CacheRefType = [
    SEARCH_STORIES,
    ApiCallResultType.DISCRETE,
    params
  ];

  const { data, isFetching, isFetched, error, refetch, } = useQuery({
    queryKey,
    queryFn: () => getSearchAutocomplete({ params }),
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

export const useInfiniteSearchAutocomplete = ({
  params,
  initialData,
}: GetStoriesOptions): InfiniteAutocompleteResponse => {
  console.log(
    'useInfiniteSearchAutocomplete: search params',
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
  } = useInfiniteQuery<AutocompleteResponse>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      // Assert pageParam as number before using it
      const page = pageParam as number;
      const response = await getSearchAutocomplete({
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
