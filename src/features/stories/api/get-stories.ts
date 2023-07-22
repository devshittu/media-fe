import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { Story } from '../types';

type GetStoriesOptions = {
  params?: {
    categoryId?: string | undefined;
  };
};

export const getStories = ({ params }: GetStoriesOptions): Promise<Story[]> => {
  return apiClient.get('/stories', {
    params,
  });
};

export const useStories = ({ params }: GetStoriesOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ['stories', params],
    queryFn: () => getStories({ params }),
    // enabled: !!params?.categoryId,
    initialData: [],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
