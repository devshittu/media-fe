import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams, StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORYLINES } from '@/config/api-constants';
import { ApiCallResultType, CacheRefType } from '@/types';
import { InfiniteStoriesResponse } from '../components';
const { GET_STORYLINES } = QUERY_KEYS;

type GetStorylineOptions = {
  // storyFor: string;
  params?: StoriesQueryParams;
  initialData?: any;
};

export const getStorylines = ({
  params,
}: GetStorylineOptions): Promise<StoryListResponse> => {
  return apiClient.get(`${URI_STORYLINES}`, {
    params,
  });
};

export const useStorylines = ({ params }: GetStorylineOptions) => {
  const queryKey: CacheRefType = [
    GET_STORYLINES,
    ApiCallResultType.DISCRETE,
    params,
  ];
  const { data, isFetching, isFetched } = useQuery({
    queryKey,
    queryFn: () => getStorylines({ params }),
    // enabled: !!params?.category_id,
    initialData: {} as StoryListResponse,
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteStorylines = ({
  // storyFor,
  params,
  initialData,
}: GetStorylineOptions): InfiniteStoriesResponse => {
  const queryKey: CacheRefType = [GET_STORYLINES, ApiCallResultType.INFINITE];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      // Assert pageParam as number before using it
      const page = pageParam as number;
      const response = await getStorylines({
        params: { ...params, page },
      });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: StoryListResponse) => {
      return lastPage?.current_page < lastPage?.total_pages
        ? lastPage.current_page + 1
        : undefined;
    },
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
//Path: src/features/stories/api/get-storylines.ts
