import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { BookmarkListResponse } from '../types';
import { URI_BOOKMARKS } from '@/config/api-constants';
import { QUERY_KEYS } from '@/config/query';
import { ApiCallResultType, CacheRefType, PaginatedListQueryParams } from '@/types';
import { InfiniteBookmarksResponse } from '../components/types';
const { GET_BOOKMARKS } = QUERY_KEYS;

export type BookmarksQueryParams = PaginatedListQueryParams & {
  category?: string | undefined;
};
type GetBookmarksOptions = {
  params?: BookmarksQueryParams;
  initialData?: any;
};



export const getBookmarks = ({
  params,
}: GetBookmarksOptions): Promise<BookmarkListResponse> => {
  return apiClient.get(`${URI_BOOKMARKS}`, {
    params,
    requiresAuth: true,
  });
};

export const useGetBookmarks = ({ params }: GetBookmarksOptions) => {
  const queryKey: CacheRefType = [
    GET_BOOKMARKS,
    ApiCallResultType.DISCRETE,
  ];
  const { data, isFetching, isFetched } = useQuery({
    queryKey,
    queryFn: () => getBookmarks({ params }),
    initialData: {} as BookmarkListResponse,
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteBookmarks = ({
  params,
  // initialData,
}: GetBookmarksOptions): InfiniteBookmarksResponse => {
    const queryKey: CacheRefType = [
    GET_BOOKMARKS,
    ApiCallResultType.INFINITE,
  ];
  console.log(`useInfiniteBookmarks:// `,queryKey);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage,
    isFetching,
    isFetched, } =
    useInfiniteQuery(
      queryKey,
      async ({ pageParam = 1 }) => {
        const response = await getBookmarks({
          params: { ...params, page: pageParam },
        });
        return response;
      },
      {
        getNextPageParam: (lastPage: BookmarkListResponse) => {
          return lastPage.current_page < lastPage.total_pages
            ? lastPage.current_page + 1
            : undefined;
        },

        // initialData: { pages: [initialData], pageParams: [1] },
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
    isLoading: isFetching && !isFetched,
  };
};
