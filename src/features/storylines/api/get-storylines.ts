import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StorylineListResponse } from '../types';
import { URI_STORYLINES } from '@/config/api-constants';
import { QUERY_KEYS } from '@/config/query';
import { PaginatedListQueryParams } from '@/types';
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
  initialData,
}: GetStorylinesOptions) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [GET_STORYLINES, 'all'],
      async ({ pageParam = 2 }) => {
        const response = await getStorylines({
          params: { ...params, page: pageParam },
        });
        return response;
      },
      {
        getNextPageParam: (lastPage: StorylineListResponse) => {
          return lastPage.current_page < lastPage.total_pages
            ? lastPage.current_page + 1
            : undefined;
        },

        initialData: { pages: [initialData], pageParams: [1] },
        //TODO: Keep data fresh for 5 minutes
        staleTime: 1000 * 60 * 5,
        // Keep data in cache for 10 minutes
        cacheTime: 1000 * 60 * 10,
      },
    );

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
