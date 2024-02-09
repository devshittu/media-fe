import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { SupportCategoryListResponse } from '../types';
import { URI_SUPPORT_CATEGORIES } from '@/config/api-constants';
import { QUERY_KEYS } from '@/config/query';
import {
  ApiCallResultType,
  CacheRefType,
  PaginatedListQueryParams,
} from '@/types';
import { uriTemplate } from '@/utils';
import { LegalURIParams } from './get-legal-document';
const { GET_SUPPORT_CATEGORIES } = QUERY_KEYS;

type GetSupportCategoriesOptions = {
  params: PaginatedListQueryParams;
  initialData?: any;
};

export const getSupportCategories = ({
  params,
}: GetSupportCategoriesOptions): Promise<SupportCategoryListResponse> => {
  const uri = uriTemplate(URI_SUPPORT_CATEGORIES, {
    // version: params.version?.toString() as string,
  });
  return apiClient.get(`${uri}`, {
    params,
    requiresAuth: false,
  });
};

export const useGetSupportCategories = ({
  params,
}: GetSupportCategoriesOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_SUPPORT_CATEGORIES, params],
    queryFn: () => getSupportCategories({ params }),
    initialData: {} as SupportCategoryListResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteSupportCategories = ({
  params,
  initialData,
}: GetSupportCategoriesOptions) => {
  const queryKey: CacheRefType = [
    GET_SUPPORT_CATEGORIES,
    ApiCallResultType.INFINITE,
  ];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
  } = useInfiniteQuery<SupportCategoryListResponse>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const page = pageParam as number;
      const response = await getSupportCategories({
        params: { ...params, page },
      });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: SupportCategoryListResponse) => {
      return lastPage.current_page < lastPage.total_pages
        ? lastPage.current_page + 1
        : undefined;
    },
  });

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
