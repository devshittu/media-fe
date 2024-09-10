import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { SearchQueryParams } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORIES_SEARCH } from '@/config/api-constants';
import { InfiniteStoriesResponse } from '../../stories/components';
import { ApiCallResultType, CacheRefType } from '@/types';
import { StoryListResponse } from '@/features/stories';
const { SEARCH_STORIES } = QUERY_KEYS;

type GetStoriesOptions = {
  params?: SearchQueryParams;
  initialData?: any;
};

export const searchStories = ({
  params,
}: GetStoriesOptions): Promise<StoryListResponse> => {
  return apiClient.get(`${URI_STORIES_SEARCH}`, {
    params,
    requiresAuth: true,
  });
};


export const useSearchStories = ({ params }: GetStoriesOptions) => {
  const queryKey: CacheRefType = [
    SEARCH_STORIES,
    ApiCallResultType.DISCRETE,
    params
  ];

  const { data, isFetching, isFetched, error, refetch, } = useQuery({
    queryKey,
    queryFn: () => searchStories({ params }),
    // enabled: !!params?.q,
    enabled: false,
    initialData: {} as StoryListResponse,
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
    error,
    refetch,
  };
};

export const useInfiniteSearchStories = ({
  params,
  initialData,
}: GetStoriesOptions): InfiniteStoriesResponse => {
  console.log(
    'useInfiniteSearchStories: search params',
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
  } = useInfiniteQuery<StoryListResponse>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      // Assert pageParam as number before using it
      const page = pageParam as number;
      const response = await searchStories({
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

// Path: src/features/stories/api/get-search-stories.ts
