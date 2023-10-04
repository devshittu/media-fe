import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams, StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import {
  URI_STORIES,
  URI_STORIES_HASHTAG_BY_HASHTAG_NAME,
} from '@/config/api-constants';
import { uriTemplate } from '@/utils';
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
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_STORIES_BY_HASHTAG, params],
    queryFn: () => getStoriesByHashtag({ params }),
    // enabled: !!params?.category_id,
    initialData: {} as StoryListResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteStoriesByHashtag = ({
  params,
  initialData,
}: GetStoriesByHashtagOptions) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [GET_STORIES_BY_HASHTAG, params?.hashtag],
      async ({ pageParam = 2 }) => {
        const response = await getStoriesByHashtag({
          params: { ...params, page: pageParam },
        });
        return response;
      },
      {
        getNextPageParam: (lastPage: StoryListResponse) => {
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
//Path: src/features/stories/api/get-stories-by-hashtag.ts
