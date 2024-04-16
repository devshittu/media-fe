import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

import { Category, CategoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { useEffect, useMemo } from 'react';
import { URI_CATEGORIES } from '@/config/api-constants';
import {
  ApiCallResultType,
  CacheRefType,
  PaginatedListQueryParams,
} from '@/types';
const { GET_CATEGORIES } = QUERY_KEYS;
type GetCategoriesOptions = {
  params?: PaginatedListQueryParams & {
    category_id?: string | undefined;
  };
};

export const getCategories = ({
  params,
}: GetCategoriesOptions): Promise<CategoryListResponse> => {
  return apiClient.get(`${URI_CATEGORIES}`, { params, requiresAuth: false });
};

export const useCategories = ({ params }: GetCategoriesOptions) => {
  const queryClient = useQueryClient();

  // const  queryKey: CacheRefType =  [GET_CATEGORIES, ApiCallResultType.INFINITE, params];

  const queryKey = useMemo(
    () => [GET_CATEGORIES, ApiCallResultType.INFINITE, params],
    [params],
  );

  const { data, isFetching, isFetched } = useQuery({
    queryKey,
    queryFn: () => getCategories({ params }),
    enabled: !!params,
    // initialData: () => {
    //   // Check if we have anything in cache and return that, otherwise get initial data
    //   const cachedData = queryClient.getQueryData<
    //     CategoryListResponse | undefined
    //   >([GET_CATEGORIES, params]);

    //   if (cachedData) {
    //     return cachedData as CategoryListResponse;
    //   }

    //   // console.log('cachedData for categories://', cachedData);

    //   return {
    //     links: { next: '', previous: '' },
    //     count: 0,
    //     total_pages: 0,
    //     current_page: 0,
    //     results: [] as Category[],
    //   } as CategoryListResponse;
    // },
  });
  useEffect(() => {
    if (!isFetching && !isFetched) {
      // console.log('invalidateQueries - GET_CATEGORIES');
      queryClient.invalidateQueries({
        queryKey,
      });
    }
  }, [queryClient, params, isFetching, isFetched, queryKey]);
  return { data, isLoading: isFetching && !isFetched };
};

//Path: src/features/categories/api/get-categories.ts
