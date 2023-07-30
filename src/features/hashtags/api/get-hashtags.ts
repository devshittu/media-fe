import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { Hashtag } from '../types';

type GetHashtagsOptions = {
  params?: {
    categoryId?: string | undefined;
  };
};

export const getHashtags = ({
  params,
}: GetHashtagsOptions): Promise<Hashtag[]> => {
  return apiClient.get('/hashtags', {
    params,
  });
};

export const useHashtags = ({ params }: GetHashtagsOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ['hashtags', params],
    queryFn: () => getHashtags({ params }),
    // enabled: !!params?.categoryId,
    initialData: [],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
