import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { UserListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_USERS } from '@/config/api-constants';
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
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_USERS, params],
    queryFn: () => getUsers({ params }),
    initialData: {} as UserListResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
