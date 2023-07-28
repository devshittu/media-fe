import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { Story } from '../types';
import { QUERY_KEYS } from '@/config/query';
const {GET_STORIES} = QUERY_KEYS

type GetStoriesOptions = {
  params?: {
    categoryId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    hashtag?: string | undefined;
  };
};

export const getStories = ({ params }: GetStoriesOptions): Promise<Story[]> => {
  return apiClient.get('/stories', {
    params,
  });
};

export const useStories = ({ params }: GetStoriesOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_STORIES, params],
    queryFn: () => getStories({ params }),
    // enabled: !!params?.categoryId,
    initialData: [],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
