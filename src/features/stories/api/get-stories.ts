import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { Story, StoryResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
const { GET_STORIES } = QUERY_KEYS;

type GetStoriesOptions = {
  params?: {
    category_id?: string | undefined;
    page?: number | undefined;
    per_page?: number | undefined;
    hashtag?: string | undefined;
  };
};

export const getStories = ({
  params,
}: GetStoriesOptions): Promise<StoryResponse> => {
  return apiClient.get('/stories', {
    params,
  });
};

export const useStories = ({ params }: GetStoriesOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_STORIES, params],
    queryFn: () => getStories({ params }),
    // enabled: !!params?.category_id,
    initialData: {} as StoryResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
