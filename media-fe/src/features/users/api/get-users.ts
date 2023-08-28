import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { UserResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
const { GET_USERS } = QUERY_KEYS;

type GetUsersOptions = {
  params?: {
    // category_id?: string | undefined;
  };
};

export const getUsers = ({
  params,
}: GetUsersOptions): Promise<UserResponse> => {
  return apiClient.get('/users', {
    params,
  });
};

export const useUsers = ({ params }: GetUsersOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_USERS, params],
    queryFn: () => getUsers({ params }),
    initialData: {} as UserResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};