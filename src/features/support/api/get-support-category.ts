import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { SupportCategory } from '../types';
import { URI_SUPPORT_CATEGORIES_BY_SLUG } from '@/config/api-constants';
import { QUERY_KEYS } from '@/config/query';
import { PaginatedListQueryParams } from '@/types';
import { uriTemplate } from '@/utils';
const { GET_SUPPORT_CATEGORIES } = QUERY_KEYS;

type GetSupportCategoryOptions = {
  params: PaginatedListQueryParams & { slug: string };
  initialData?: any;
};

export const getSupportCategory = ({
  params,
}: GetSupportCategoryOptions): Promise<SupportCategory> => {
  const uri = uriTemplate(URI_SUPPORT_CATEGORIES_BY_SLUG, {
    slug: params.slug?.toString() as string,
  });
  return apiClient.get(`${uri}`, {
    params,
    requiresAuth: false,
  });
};

export const useGetSupportCategory = ({
  params,
}: GetSupportCategoryOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_SUPPORT_CATEGORIES, params],
    queryFn: () => getSupportCategory({ params }),
    initialData: {} as SupportCategory,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

// Path: src/features/support/api/get-support-category.ts
