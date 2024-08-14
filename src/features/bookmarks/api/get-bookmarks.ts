import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { BookmarkListResponse } from '../types';
import { URI_BOOKMARKS } from '@/config/api-constants';
import { QUERY_KEYS } from '@/config/query';
import {
  ApiCallResultType,
  CacheRefType,
  PaginatedListQueryParams,
} from '@/types';
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
  const queryKey: CacheRefType = [GET_BOOKMARKS, ApiCallResultType.DISCRETE];
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
}: GetBookmarksOptions): InfiniteBookmarksResponse => {
  const queryKey: CacheRefType = [
    GET_BOOKMARKS,
    ApiCallResultType.INFINITE,
    params?.category,
  ];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isFetched,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const page = pageParam as number;
      const response = await getBookmarks({
        params: { ...params, page },
      });
      return response;
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage: BookmarkListResponse) => {
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
