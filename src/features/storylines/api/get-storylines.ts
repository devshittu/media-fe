import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StorylineListResponse } from '../types';
import { URI_STORYLINES } from '@/config/api-constants';
import { QUERY_KEYS } from '@/config/query';
import {
  ApiCallResultType,
  CacheRefType,
  PaginatedListQueryParams,
} from '@/types';
const { GET_STORYLINES } = QUERY_KEYS;

type GetStorylinesOptions = {
  params?: PaginatedListQueryParams;
  initialData?: any;
};

export const getStorylines = ({
  params,
}: GetStorylinesOptions): Promise<StorylineListResponse> => {
  return apiClient.get(`${URI_STORYLINES}`, {
    params,
  });
};

export const useGetStorylines = ({ params }: GetStorylinesOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_STORYLINES, params],
    queryFn: () => getStorylines({ params }),
    initialData: {} as StorylineListResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteStorylines = ({
  params,
}: GetStorylinesOptions) => {
  const queryKey: CacheRefType = [GET_STORYLINES, ApiCallResultType.INFINITE];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
  } = useInfiniteQuery<StorylineListResponse>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const page = pageParam as number;
      const response = await getStorylines({
        params: { ...params, page },
      });
      return response;
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage: StorylineListResponse) => {
      return lastPage.current_page < lastPage.total_pages
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
    isLoading: isFetching && !isFetched,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
