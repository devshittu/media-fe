import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { Story, StoryResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
const { GET_STORIES } = QUERY_KEYS;

type GetStoriesByHashtagOptions = {
  params?: {
    page?: number | undefined;
    per_page?: number | undefined;
    hashtag: string | undefined;
  };
};

export const getStoriesByHashtag = ({
  params,
}: GetStoriesByHashtagOptions): Promise<StoryResponse> => {
  return apiClient.get('/stories/hashtag', {
    params,
  });
};

export const useStoriesByHashtag = ({ params }: GetStoriesByHashtagOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_STORIES, params],
    queryFn: () => getStoriesByHashtag({ params }),
    // enabled: !!params?.category_id,
    initialData: {} as StoryResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
//Path: src/features/stories/api/get-stories-by-hashtag.ts
