import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { SupportCategoryListResponse } from '../types';
import { URI_SUPPORT_CATEGORIES } from '@/config/api-constants';
import { QUERY_KEYS } from '@/config/query';
import { PaginatedListQueryParams } from '@/types';
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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [GET_SUPPORT_CATEGORIES, 'all'],
      async ({ pageParam = 2 }) => {
        const response = await getSupportCategories({
          params: { ...params, page: pageParam },
        });
        return response;
      },
      {
        getNextPageParam: (lastPage: SupportCategoryListResponse) => {
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
