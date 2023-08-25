import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { HashtagResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
const { GET_HASHTAGS } = QUERY_KEYS;

type GetHashtagsOptions = {
  params?: {
    category_id?: string | undefined;
  };
};

export const getHashtags = ({
  params,
}: GetHashtagsOptions): Promise<HashtagResponse> => {
  return apiClient.get('/hashtags', {
    params,
  });
};

export const useHashtags = ({ params }: GetHashtagsOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_HASHTAGS, params],
    queryFn: () => getHashtags({ params }),
    initialData: {} as HashtagResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
