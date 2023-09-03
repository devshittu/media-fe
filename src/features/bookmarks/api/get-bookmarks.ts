import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { BookmarkResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
const { GET_BOOKMARKS } = QUERY_KEYS;

type GetBookmarksOptions = {
  params?: {
    page?: number | undefined;
    per_page?: number | undefined;
  };
  initialData?: any;
};

export const getBookmarks = ({
  params,
}: GetBookmarksOptions): Promise<BookmarkResponse> => {
  return apiClient.get('/bookmarks', {
    params,
  });
};

export const useGetBookmarks = ({ params }: GetBookmarksOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_BOOKMARKS, params],
    queryFn: () => getBookmarks({ params }),
    initialData: {} as BookmarkResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteBookmarks = ({
  params,
  initialData,
}: GetBookmarksOptions) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [GET_BOOKMARKS, 'all'],
      async ({ pageParam = 2 }) => {
        const response = await getBookmarks({
          params: { ...params, page: pageParam },
        });
        return response;
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.page < lastPage.total_pages
            ? lastPage.page + 1
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
