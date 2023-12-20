import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORIES } from '@/config/api-constants';
import {
  GetStoriesOptions,
  InfiniteStoriesResponse,
  StoryAction,
} from '../components';
import { CacheRefType } from '@/types';
const { GET_STORIES } = QUERY_KEYS;

export const getStories = ({
  params,
}: GetStoriesOptions): Promise<StoryListResponse> => {
  return apiClient.get(`${URI_STORIES}`, {
    params,
  });
};

export const useStories = ({ params, initialData = {} }: GetStoriesOptions) => {
  const queryKey: CacheRefType = [GET_STORIES, 'all'];
  const { data, isFetching, isFetched } = useQuery({
    queryKey,
    queryFn: () => getStories({ params }),
    // enabled: !!params?.category_id,
    initialData: initialData as StoryListResponse,
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteStories = ({
  params,
  initialData,
}: GetStoriesOptions): InfiniteStoriesResponse => {
  const queryKey: CacheRefType = [GET_STORIES, 'infinite'];
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      queryKey,
      async ({ pageParam = 2 }) => {
        const response = await getStories({
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
    queryKey,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

//Path: src/features/stories/api/get-stories.ts
