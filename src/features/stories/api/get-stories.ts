import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

import { apiClient, apiClientAuth } from '@/lib/api-client';

import { StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORIES } from '@/config/api-constants';
import { GetStoriesOptions, InfiniteStoriesResponse } from '../components';
import { ApiCallResultType, CacheRefType } from '@/types';

const { GET_STORIES } = QUERY_KEYS;

//Caller function is responsible for making the actual network request
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
  } = useInfiniteQuery<StoryListResponse>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      // Assert pageParam as number before using it
      const page = pageParam as number;
      const response = await getStories({
        params: { ...params, page },
      });
      return response;
    },

    getNextPageParam: (lastPage) => {
      return lastPage.current_page < lastPage.total_pages
        ? lastPage.current_page + 1
        : undefined;
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

//Path: src/features/stories/api/get-stories.ts
