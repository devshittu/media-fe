import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient, apiClientAuth } from '@/lib/api-client';

import { StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORIES } from '@/config/api-constants';
import { GetStoriesOptions, InfiniteStoriesResponse } from '../components';
import { ApiCallResultType, CacheRefType } from '@/types';
import useApiClientAuth from '@/features/auth/hooks/useApiClientAuth';
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
  const apiClientAuth = useApiClientAuth();
  const queryKey: CacheRefType = [GET_STORIES, ApiCallResultType.DISCRETE];

  const fetchStories = async ({
    params,
  }: GetStoriesOptions): Promise<StoryListResponse> => {
    return await apiClientAuth.get(`${URI_STORIES}`, { params });
  };

  const { data, isFetching, isFetched } = useQuery({
    queryKey,
    queryFn: () => fetchStories({ params }),
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
  const apiClientAuth = useApiClientAuth();
  const queryKey: CacheRefType = [GET_STORIES, ApiCallResultType.INFINITE];
  const fetchInfiniteStories = async ({
    pageParam = 1,
  }): Promise<StoryListResponse> => {
    // Directly returning the response from apiClientAuth.get
    const response = await apiClientAuth.get<StoryListResponse>(
      `${URI_STORIES}`,
      {
        params: { ...params, page: pageParam },
      },
    );
    return response as unknown as StoryListResponse;
  };
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
  } = useInfiniteQuery(
    queryKey,
    // async ({ pageParam = 1 }) => {
    //   const response = await getStories({
    //     params: { ...params, page: pageParam },
    //   });
    //   return response;
    // },
    async ({ pageParam = 1 }) => await fetchInfiniteStories({ pageParam }),
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
