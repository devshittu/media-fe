import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { FAQListResponse } from '../types';
import { URI_SUPPORT_FAQS } from '@/config/api-constants';
import { QUERY_KEYS } from '@/config/query';
import { PaginatedListQueryParams } from '@/types';
const { GET_SUPPORT_ARTICLES } = QUERY_KEYS;

type GetSupportFAQsOptions = {
  params?: PaginatedListQueryParams;
  initialData?: any;
};

export const getSupportFAQs = ({
  params,
}: GetSupportFAQsOptions): Promise<FAQListResponse> => {
  return apiClient.get(`${URI_SUPPORT_FAQS}`, {
    params,
  });
};

export const useGetSupportFAQs = ({ params }: GetSupportFAQsOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_SUPPORT_ARTICLES, params],
    queryFn: () => getSupportFAQs({ params }),
    initialData: {} as FAQListResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteSupportFAQs = ({
  params,
  initialData,
}: GetSupportFAQsOptions) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [GET_SUPPORT_ARTICLES, 'all'],
      async ({ pageParam = 2 }) => {
        const response = await getSupportFAQs({
          params: { ...params, page: pageParam },
        });
        return response;
      },
      {
        getNextPageParam: (lastPage: FAQListResponse) => {
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
