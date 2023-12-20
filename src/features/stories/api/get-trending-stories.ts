import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams, Story, StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_TRENDING_STORIES } from '@/config/api-constants';
import { StoryAction } from '../components';
const { GET_TRENDING_STORIES } = QUERY_KEYS;

type GetStoriesOptions = {
  params?: StoriesQueryParams;
  initialData?: any;
};

export const getTrendingStories = ({
  params,
}: GetStoriesOptions): Promise<StoryListResponse> => {
  return apiClient.get(`${URI_TRENDING_STORIES}`, {
    params,
  });
};

export const useTrendingStories = ({ params }: GetStoriesOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_TRENDING_STORIES, params],
    queryFn: () => getTrendingStories({ params }),
    // enabled: !!params?.category_id,
    initialData: {} as StoryListResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteTrendingStories = ({
  params,
  initialData,
}: GetStoriesOptions) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [GET_TRENDING_STORIES, 'all'],
      async ({ pageParam = 2 }) => {
        const response = await getTrendingStories({
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

//Path: src/features/stories/api/get-trending-stories.ts
