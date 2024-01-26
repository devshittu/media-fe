import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { URI_STORIES_TRENDING } from '@/config/api-constants';
import { HashtagListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import {
  ApiCallResultType,
  CacheRefType,
  PaginatedListQueryParams,
} from '@/types';
import useApiClientAuth from '@/features/auth/hooks/useApiClientAuth';
const { GET_HASHTAGS } = QUERY_KEYS;

type GetHashtagsOptions = {
  params?: PaginatedListQueryParams & {
    category_id?: string | undefined;
  };
};

export const getHashtags = ({
  params,
}: GetHashtagsOptions): Promise<HashtagListResponse> => {
  return apiClient.get(`${URI_STORIES_TRENDING}`, {
    params,
  });
};

export const useHashtags = ({ params }: GetHashtagsOptions) => {
  const apiClientAuth = useApiClientAuth();
  const queryKey: CacheRefType = [
    GET_HASHTAGS,
    ApiCallResultType.DISCRETE,
    params,
  ];

  const fetchHashtags = async ({
    params,
  }: GetHashtagsOptions): Promise<HashtagListResponse> => {
    return await apiClientAuth.get(`${URI_STORIES_TRENDING}`, { params });
  };
  const { data, isFetching, isFetched } = useQuery({
    queryKey,
    queryFn: () => fetchHashtags({ params }),
    initialData: {} as HashtagListResponse,
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
  };
};

// src/features/hashtags/api/get-hashtags.ts
