import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

import { Category, CategoryListResponse } from '../types';
import { DEFAULT_STALE_TIME, QUERY_KEYS } from '@/config/query';
import { useEffect } from 'react';
import { URI_CATEGORIES } from '@/config/api-constants';
import { PaginatedListQueryParams } from '@/types';
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

  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_CATEGORIES, params],
    queryFn: () => getCategories({ params }),
    initialData: () => {
      // Check if we have anything in cache and return that, otherwise get initial data
      const cachedData = queryClient.getQueryData<
        CategoryListResponse | undefined
      >([GET_CATEGORIES, params]);

      if (cachedData) {
        return cachedData as CategoryListResponse;
      }

      console.log('cachedData for categories://', cachedData);

      return {
        links: { next: '', previous: '' },
        count: 0,
        total_pages: 0,
        current_page: 0,
        results: [] as Category[],
      } as CategoryListResponse;
    },
    //TODO: Keep data fresh for 5 minutes
    // staleTime: 1000 * 60 * 5,
    // Keep data in cache for 10 minutes
    cacheTime: 1000 * 10,
    // staleTime: DEFAULT_STALE_TIME,
  });
  useEffect(() => {
    if (!isFetching && !isFetched) {
      console.log('invalidateQueries - GET_CATEGORIES');
      queryClient.invalidateQueries([GET_CATEGORIES, params?.category_id]);
    }
  }, [queryClient, params, isFetching, isFetched]);
  return { data, isLoading: isFetching && !isFetched };
};

//Path: src/features/categories/api/get-categories.ts
