import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoriesQueryParams, StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORYLINES } from '@/config/api-constants';
const { GET_STORYLINES } = QUERY_KEYS;

type GetStorylineOptions = {
  // storyFor: string;
  params?: StoriesQueryParams;
  initialData?: any;
};

export const getStorylines = ({
  // storyFor,
  params,
}: GetStorylineOptions): Promise<StoryListResponse> => {
  return apiClient.get(`${URI_STORYLINES}`, {
    params,
  });
};

export const useStorylines = ({ params }: GetStorylineOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_STORYLINES, params],
    queryFn: () => getStorylines({ params }),
    // enabled: !!params?.category_id,
    initialData: {} as StoryListResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteStorylines = ({
  // storyFor,
  params,
  initialData,
}: GetStorylineOptions) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['storylines', params],
      async ({ pageParam = 2 }) => {
        const response = await getStorylines({
          // storyFor,
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
//Path: src/features/stories/api/get-storylines.ts
