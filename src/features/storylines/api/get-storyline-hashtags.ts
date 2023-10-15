import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams } from '../../stories/types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORYLINES_BY_STORYLINE_ID_HASHTAGS } from '@/config/api-constants';
import { uriTemplate } from '@/utils';
import { HashtagListResponse } from '@/features/hashtags';
const { GET_HASHTAGS } = QUERY_KEYS;

type GetStorylineHashtagsOptions = {
  storylineId: string;
  params?: StoriesQueryParams;
  initialData?: any;
};

export const getStorylineHashtags = ({
  storylineId,
  params,
}: GetStorylineHashtagsOptions): Promise<HashtagListResponse> => {
  const uri =
    storylineId &&
    uriTemplate(URI_STORYLINES_BY_STORYLINE_ID_HASHTAGS, {
      storyline_id: storylineId,
    });

  return apiClient.get(`${uri}`, {
    params,
  });
};

export const useStorylineHashtags = ({
  storylineId,
  params,
}: GetStorylineHashtagsOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_HASHTAGS, 'for_storyline', params],
    queryFn: () =>
      getStorylineHashtags({
        storylineId,
        params,
      }),
    // enabled: !!params?.category_id,
    initialData: {} as HashtagListResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteStorylineHashtags = ({
  storylineId,
  params,
  initialData,
}: GetStorylineHashtagsOptions) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [GET_HASHTAGS, 'all'],
      async ({ pageParam = 2 }) => {
        const response = await getStorylineHashtags({
          storylineId,
          params: { ...params, page: pageParam },
        });
        return response;
      },
      {
        getNextPageParam: (lastPage: HashtagListResponse) => {
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

//Path: src/features/stories/api/get-stories.ts
