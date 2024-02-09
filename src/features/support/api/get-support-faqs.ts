import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { FAQListResponse } from '../types';
import { URI_SUPPORT_BY_VERSION_FAQS } from '@/config/api-constants';
import { QUERY_KEYS } from '@/config/query';
import {
  ApiCallResultType,
  CacheRefType,
  PaginatedListQueryParams,
} from '@/types';
import { uriTemplate } from '@/utils';
import { LegalURIParams } from './get-legal-document';
const { GET_SUPPORT_ARTICLES } = QUERY_KEYS;

type GetSupportFAQsOptions = {
  params: LegalURIParams & PaginatedListQueryParams;
  initialData?: any;
};

export const getSupportFAQs = ({
  params,
}: GetSupportFAQsOptions): Promise<FAQListResponse> => {
  const uri = uriTemplate(URI_SUPPORT_BY_VERSION_FAQS, {
    version: params.version?.toString() as string,
  });
  return apiClient.get(`${uri}`, {
    params,
    requiresAuth: false,
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
}: GetSupportFAQsOptions) => {
  const queryKey: CacheRefType = [
    GET_SUPPORT_ARTICLES,
    ApiCallResultType.INFINITE,
  ];
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage,
    isFetched,
    isFetching, } =
    useInfiniteQuery<FAQListResponse>({
      queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        const page = pageParam as number;
        const response = await getSupportFAQs({
          params: { ...params, page },
        });
        return response;
      },

      initialPageParam: 1,
      getNextPageParam: (lastPage: FAQListResponse) => {
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
    isLoading: isFetching && !isFetched,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
