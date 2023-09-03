import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { Category } from '../types';

type GetCategoryOptions = {
  category_id: string;
};

export const getCategory = ({
  category_id,
}: GetCategoryOptions): Promise<Category> => {
  return apiClient.get(`/categories/${category_id}`);
};

export const useCategory = ({ category_id }: GetCategoryOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: ['categories', category_id],
    queryFn: () => getCategory({ category_id }),
  });

  return { data, isLoading };
};
