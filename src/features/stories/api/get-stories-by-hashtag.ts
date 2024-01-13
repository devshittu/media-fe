import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams, StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import {
  URI_STORIES,
  URI_STORIES_HASHTAG_BY_HASHTAG_NAME,
} from '@/config/api-constants';
import { uriTemplate } from '@/utils';
import { ApiCallResultType, CacheRefType } from '@/types';
const { GET_STORIES_BY_HASHTAG } = QUERY_KEYS;

type GetStoriesByHashtagOptions = {
  params?: StoriesQueryParams;
  initialData?: any;
};

export const getStoriesByHashtag = ({
  params,
}: GetStoriesByHashtagOptions): Promise<StoryListResponse> => {
  // TODO: make the params mandatory otherwise throw an exception
  const uri = params?.hashtag
    ? uriTemplate(URI_STORIES_HASHTAG_BY_HASHTAG_NAME, {
        hashtag_name: params.hashtag,
      })
    : URI_STORIES;
  return apiClient.get(uri, {
    params,
  });
};

export const useStoriesByHashtag = ({ params }: GetStoriesByHashtagOptions) => {
  const queryKey: CacheRefType = [
    GET_STORIES_BY_HASHTAG,
    ApiCallResultType.DISCRETE,
  ];
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_STORIES_BY_HASHTAG, params?.hashtag],
    queryFn: () => getStoriesByHashtag({ params }),
    // enabled: !!params?.category_id,
    initialData: {} as StoryListResponse,
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteStoriesByHashtag = ({
  params,
  initialData,
}: GetStoriesByHashtagOptions) => {
  const queryKey: CacheRefType = [
    GET_STORIES_BY_HASHTAG,
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
      await getStoriesByHashtag({ params: { ...params, page: pageParam } }),
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
    count,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isFetching && !isFetched,
  };
};
//Path: src/features/stories/api/get-stories-by-hashtag.ts
