import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams, Story, StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_USER_INVERSE_FEED } from '@/config/api-constants';
import { StoryAction } from '../components';
const { GET_USER_INVERSE_FEED_STORIES } = QUERY_KEYS;

type GetStoriesOptions = {
  params?: StoriesQueryParams;
  initialData?: any;
};

export const getUserInvertedFeedStories = ({
  params,
}: GetStoriesOptions): Promise<StoryListResponse> => {
  return apiClient.get(`${URI_USER_INVERSE_FEED}`, {
    params,
    requiresAuth: true,
  });
};

export const useUserInvertedFeedStories = ({ params }: GetStoriesOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_USER_INVERSE_FEED_STORIES, params],
    queryFn: () => getUserInvertedFeedStories({ params }),
    // enabled: !!params?.category_id,
    initialData: {} as StoryListResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteUserInvertedFeedStories = ({
  params,
  initialData,
}: GetStoriesOptions) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [GET_USER_INVERSE_FEED_STORIES, 'all'],
      async ({ pageParam = 2 }) => {
        const response = await getUserInvertedFeedStories({
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

export type PaginatedStoryListResponse = {
  pages: StoryListResponse[];
  pageParams: number[];
};

//Path: src/features/stories/api/get-stories.ts