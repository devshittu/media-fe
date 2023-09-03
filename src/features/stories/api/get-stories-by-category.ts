import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams, StoryResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
const { GET_STORIES_BY_CATEGORY } = QUERY_KEYS;

type GetStoriesByCategoryOptions = {
  params?: StoriesQueryParams;
  initialData?: any;
};

export const getStoriesByCategory = async ({
  params,
}: GetStoriesByCategoryOptions): Promise<StoryResponse> => {
  return apiClient.get(`/stories/category/${params?.categoryId}`, {
    params,
  });
};

export const useStoriesByCategory = ({
  params,
}: GetStoriesByCategoryOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_STORIES_BY_CATEGORY, params?.categoryId],
    queryFn: () => getStoriesByCategory({ params }),
    enabled: !!params?.categoryId,
    initialData: {} as StoryResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteStoriesByCategory = ({
  params,
  initialData,
}: GetStoriesByCategoryOptions) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [GET_STORIES_BY_CATEGORY, params?.categoryId],
      async ({ pageParam = 2 }) => {
        const response = await getStoriesByCategory({
          params: { ...params, page: pageParam },
        });
        return response;
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.page < lastPage.total_pages
            ? lastPage.page + 1
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
//Path: src/features/stories/api/get-stories-by-category.ts
