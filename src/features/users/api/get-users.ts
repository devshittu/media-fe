import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { UserListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_USERS } from '@/config/api-constants';
import { ApiCallResultType, CacheRefType } from '@/types';
import useApiClientAuth from '@/features/auth/hooks/useApiClientAuth';
const { GET_USERS } = QUERY_KEYS;

type GetUsersOptions = {
  params?: {
    // category_id?: string | undefined;
  };
};

export const getUsers = ({
  params,
}: GetUsersOptions): Promise<UserListResponse> => {
  return apiClient.get(`${URI_USERS}`, {
    params,
  });
};

export const useGetUsers = ({ params }: GetUsersOptions) => {
  const apiClientAuth = useApiClientAuth();
  const queryKey: CacheRefType = [GET_USERS, ApiCallResultType.DISCRETE];
  const fetchUsers = async ({
    params,
  }: GetUsersOptions): Promise<UserListResponse> => {
    return await apiClientAuth.get(`${URI_USERS}`, { params });
  };
  const { data, isFetching, isFetched } = useQuery({
    queryKey,
    queryFn: () => fetchUsers({ params }),
    initialData: {} as UserListResponse,
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
  };
};
