import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams, StoryListResponse } from '../../stories/types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORYLINES_BY_STORYLINE_ID_STORIES } from '@/config/api-constants';
import { uriTemplate } from '@/utils';
const { GET_STORIES } = QUERY_KEYS;

type GetStorylineStoriesOptions = {
  storylineId: string;
  params?: StoriesQueryParams;
  initialData?: any;
};

export const getStorylineStories = ({
  storylineId,
  params,
}: GetStorylineStoriesOptions): Promise<StoryListResponse> => {
  const uri =
    storylineId &&
    uriTemplate(URI_STORYLINES_BY_STORYLINE_ID_STORIES, {
      storyline_id: storylineId,
    });

  return apiClient.get(`${uri}`, {
    params,
  });
};

export const useStorylineStories = ({
  storylineId,
  params,
}: GetStorylineStoriesOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_STORIES, params],
    queryFn: () =>
      getStorylineStories({
        storylineId,
        params,
      }),
    // enabled: !!params?.category_id,
    initialData: {} as StoryListResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteStorylineStories = ({
  storylineId,
  params,
  initialData,
}: GetStorylineStoriesOptions) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [GET_STORIES, 'all'],
      async ({ pageParam = 2 }) => {
        const response = await getStorylineStories({
          storylineId,
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

//Path: src/features/stories/api/get-storyline-by-story.ts
