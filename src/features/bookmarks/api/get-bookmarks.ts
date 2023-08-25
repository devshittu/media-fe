import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { BookmarkResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
const { GET_BOOKMARKS } = QUERY_KEYS;

type GetBookmarksOptions = {
  params?: {
    category_id?: string | undefined;
    page?: number | undefined;
    per_page?: number | undefined;
    hashtag?: string | undefined;
  };
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
