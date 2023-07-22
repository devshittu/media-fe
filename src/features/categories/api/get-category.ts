import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { Category } from '../types';

type GetCategoryOptions = {
  categoryId: string;
};

export const getCategory = ({
  categoryId,
}: GetCategoryOptions): Promise<Category> => {
  return apiClient.get(`/categories/${categoryId}`);
};

export const useCategory = ({ categoryId }: GetCategoryOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: ['categories', categoryId],
    queryFn: () => getCategory({ categoryId }),
  });

  return { data, isLoading };
};
