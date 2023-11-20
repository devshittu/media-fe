import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { AuthUser } from '../types';

import { QUERY_KEYS } from '@/config/query';
import { URI_AUTH_ME } from '@/config/api-constants';
const { AUTH_USER } = QUERY_KEYS;

export const getAuthUser = (): Promise<AuthUser> => {
  return apiClient.get(`${URI_AUTH_ME}`);
};

export const useUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: [AUTH_USER],
    queryFn: () => getAuthUser(),
  });

  return { data, isLoading };
};

// src/features/auth/api/get-auth-user.ts
