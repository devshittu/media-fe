import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams } from '../../stories/types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORIES_BY_SLUG_STORYLINES } from '@/config/api-constants';
import { uriTemplate } from '@/utils';
import { StorylineListResponse } from '../types';
const { GET_STORIES } = QUERY_KEYS;

type GetStorylinesByStoryOptions = {
  storySlug: string;
  params?: StoriesQueryParams;
  initialData?: any;
};

export const getStorylinesByStory = ({
  storySlug,
  params,
}: GetStorylinesByStoryOptions): Promise<StorylineListResponse> => {
  const uri =
    storySlug &&
    uriTemplate(URI_STORIES_BY_SLUG_STORYLINES, {
      slug: storySlug,
    });

  return apiClient.get(`${uri}`, {
    params,
  });
};

export const useStorylinesByStory = ({
  storySlug,
  params,
}: GetStorylinesByStoryOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_STORIES, params, storySlug],
    queryFn: () =>
      getStorylinesByStory({
        storySlug,
        params,
      }),
    initialData: {} as StorylineListResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteStorylinesByStory = ({
  storySlug,
  params,
  initialData,
}: GetStorylinesByStoryOptions) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [GET_STORIES, 'all'],
      async ({ pageParam = 2 }) => {
        const response = await getStorylinesByStory({
          storySlug,
          params: { ...params, page: pageParam },
        });
        return response;
      },
      {
        getNextPageParam: (lastPage: StorylineListResponse) => {
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

//Path: src/features/stories/api/get-storylines-by-story.ts
