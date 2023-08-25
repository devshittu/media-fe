import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

import { Category, CategoryResponse } from '../types';
import { DEFAULT_STALE_TIME, QUERY_KEYS } from '@/config/query';
const { GET_CATEGORIES } = QUERY_KEYS;
type GetCategoriesOptions = {
  params?: {
    category_id?: string | undefined;
  };
};

export const getCategories = ({
  params,
}: GetCategoriesOptions): Promise<CategoryResponse> => {
  return apiClient.get(`/categories`, { params });
};

export const useCategories = ({ params }: GetCategoriesOptions) => {
  const queryClient = useQueryClient();

  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_CATEGORIES, params],
    queryFn: () => getCategories({ params }),
    initialData: () => {
      // Check if we have anything in cache and return that, otherwise get initial data
      const cachedData = queryClient.getQueryData<CategoryResponse | undefined>(
        [GET_CATEGORIES],
      );

      if (cachedData) {
        return cachedData as CategoryResponse;
      }

      return {
        categories: [] as Category[],
        page: 0,
        total_pages: 0,
        total: 0,
      } as CategoryResponse;
    },
    cacheTime: 1000 * 10,
    // staleTime: DEFAULT_STALE_TIME,
  });

  return { data, isLoading: isFetching && !isFetched };
};

//Path: src/features/categories/api/get-categories.ts
