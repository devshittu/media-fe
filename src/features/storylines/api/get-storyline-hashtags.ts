import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams } from '../../stories/types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORYLINES_BY_STORYLINE_ID_HASHTAGS } from '@/config/api-constants';
import { uriTemplate } from '@/utils';
import { HashtagListResponse } from '@/features/hashtags';
import { ApiCallResultType, CacheRefType } from '@/types';
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
}: GetStorylineHashtagsOptions) => {
  const queryKey: CacheRefType = [GET_HASHTAGS, ApiCallResultType.INFINITE];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
  } = useInfiniteQuery<HashtagListResponse>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      // Assert pageParam as number before using it
      const page = pageParam as number;
      const response = await getStorylineHashtags({
        storylineId,
        params: { ...params, page },
      });
      return response;
    },
    initialPageParam: 1,

    getNextPageParam: (lastPage: HashtagListResponse) => {
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
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isFetching && !isFetched,
  };
};

//Path: src/features/stories/api/get-stories.ts
