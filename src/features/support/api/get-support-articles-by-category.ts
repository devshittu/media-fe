import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { SupportArticleListResponse } from '../types';
import { URI_SUPPORT_BY_VERSION_ARTICLES_CATEGORY_BY_CATEGORY_SLUG } from '@/config/api-constants';
import { QUERY_KEYS } from '@/config/query';
import {
  ApiCallResultType,
  CacheRefType,
  PaginatedListQueryParams,
} from '@/types';
import { uriTemplate } from '@/utils';
import { LegalURIParams } from './get-legal-document';
const { GET_SUPPORT_ARTICLES } = QUERY_KEYS;

type GetSupportArticlesByCategoryOptions = {
  params: Omit<LegalURIParams, 'document'> &
    PaginatedListQueryParams & { category_slug: string };
  initialData?: any;
};

export const getSupportArticlesByCategory = ({
  params,
}: GetSupportArticlesByCategoryOptions): Promise<SupportArticleListResponse> => {
  const uri = uriTemplate(
    URI_SUPPORT_BY_VERSION_ARTICLES_CATEGORY_BY_CATEGORY_SLUG,
    {
      version: params.version?.toString() as string,
      category_slug: params.category_slug?.toString() as string,
    },
  );
  return apiClient.get(`${uri}`, {
    params,
    requiresAuth: false,
  });
};

export const useGetSupportArticlesByCategory = ({
  params,
}: GetSupportArticlesByCategoryOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_SUPPORT_ARTICLES, params],
    queryFn: () => getSupportArticlesByCategory({ params }),
    initialData: {} as SupportArticleListResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteSupportArticlesByCategory = ({
  params,
}: GetSupportArticlesByCategoryOptions) => {
  const queryKey: CacheRefType = [
    GET_SUPPORT_ARTICLES,
    ApiCallResultType.INFINITE,
  ];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
  } = useInfiniteQuery<SupportArticleListResponse>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      // Assert pageParam as number before using it
      const page = pageParam as number;
      const response = await getSupportArticlesByCategory({
        params: { ...params, page },
      });
      return response;
    },
    initialPageParam: 1,

    getNextPageParam: (lastPage: SupportArticleListResponse) => {
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

// Path: src/features/support/api/get-support-articles-by-category.ts
