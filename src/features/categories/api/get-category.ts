import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { Category } from '../types';
import {
  URI_CATEGORIES,
  URI_CATEGORIES_BY_SLUG,
} from '@/config/api-constants';
import { uriTemplate } from '@/utils';

type GetCategoryOptions = {
  category_id: string;
};

export const getCategory = ({
  category_id,
}: GetCategoryOptions): Promise<Category> => {
  const uri = uriTemplate(URI_CATEGORIES_BY_SLUG, {
        slug: category_id,
      });
      
  return apiClient.get(`${uri}`);
};

export const useCategory = ({ category_id }: GetCategoryOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: ['categories', category_id],
    queryFn: () => getCategory({ category_id }),
  });

  return { data, isLoading };
};
