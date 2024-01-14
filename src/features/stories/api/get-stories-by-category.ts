import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams, StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import {
  URI_STORIES,
  URI_STORIES_CATEGORY_BY_CATEGORY_SLUG,
} from '@/config/api-constants';
import { uriTemplate } from '@/utils';
import { ApiCallResultType, CacheRefType } from '@/types';
import { InfiniteStoriesResponse } from '../components';
const { GET_STORIES_BY_CATEGORY } = QUERY_KEYS;

type GetStoriesByCategoryOptions = {
  params?: StoriesQueryParams;
  initialData?: any;
};

export const getStoriesByCategory = async ({
  params,
}: GetStoriesByCategoryOptions): Promise<StoryListResponse> => {
  // TODO: make the params mandatory otherwise throw an exception
  const uri = params?.categoryId
    ? uriTemplate(URI_STORIES_CATEGORY_BY_CATEGORY_SLUG, {
        category_slug: params.categoryId,
      })
    : URI_STORIES;

  return apiClient.get(uri, {
    params,
  });
};

export const useStoriesByCategory = ({
  params,
}: GetStoriesByCategoryOptions) => {
  const queryKey: CacheRefType = [
    GET_STORIES_BY_CATEGORY,
    ApiCallResultType.DISCRETE,
  ];
  const { data, isFetching, isFetched } = useQuery({
    queryKey,
    queryFn: () => getStoriesByCategory({ params }),
    enabled: !!params?.categoryId,
    initialData: {} as StoryListResponse,
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteStoriesByCategory = ({
  params,
}: GetStoriesByCategoryOptions): InfiniteStoriesResponse => {
  const queryKey: CacheRefType = [
    GET_STORIES_BY_CATEGORY,
    ApiCallResultType.INFINITE,
  ];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
  } = useInfiniteQuery<StoryListResponse>(
    queryKey,
    async ({ pageParam = 1 }) =>
      await getStoriesByCategory({ params: { ...params, page: pageParam } }),
    {
      getNextPageParam: (lastPage, allPages) => {
        // Check if there are more pages to load
        if (lastPage.current_page < lastPage.total_pages) {
          return lastPage.current_page + 1;
        }
        return undefined; // No more pages
      },
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
//Path: src/features/stories/api/get-stories-by-category.ts
