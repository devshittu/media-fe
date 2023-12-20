import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_USER_INVERSE_FEED } from '@/config/api-constants';
import {
  GetStoriesOptions,
  InfiniteStoriesResponse,
} from '../components';
import { CacheRefType } from '@/types';
const { GET_USER_INVERSE_FEED_STORIES } = QUERY_KEYS;

export const getUserInvertedFeedStories = ({
  params,
}: GetStoriesOptions): Promise<StoryListResponse> => {
  return apiClient.get(`${URI_USER_INVERSE_FEED}`, {
    params,
    requiresAuth: true,
  });
};

export const useUserInvertedFeedStories = ({
  params,
  initialData = {},
}: GetStoriesOptions) => {
  const queryKey: CacheRefType = [GET_USER_INVERSE_FEED_STORIES, 'all'];
  const { data, isFetching, isFetched } = useQuery({
    queryKey,
    queryFn: () => getUserInvertedFeedStories({ params }),
    // enabled: !!params?.category_id,
    initialData: initialData as StoryListResponse,
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteUserInvertedFeedStories = ({
  params,
}: GetStoriesOptions): InfiniteStoriesResponse => {
  const queryKey: CacheRefType = [
    QUERY_KEYS.GET_USER_INVERSE_FEED_STORIES,
    'infinite',
  ];
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<StoryListResponse>(
      queryKey,
      ({ pageParam = 1 }) =>
        getUserInvertedFeedStories({ params: { ...params, page: pageParam } }),
      {
        getNextPageParam: (lastPage, allPages) => {
          // Check if there are more pages to load
          if (lastPage.current_page < lastPage.total_pages) {
            return lastPage.current_page + 1;
          }
          return undefined; // No more pages
        },
      },
    );
  return {
    queryKey,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
//Path: src/features/stories/api/get-user-inverse-feed-stories.ts
