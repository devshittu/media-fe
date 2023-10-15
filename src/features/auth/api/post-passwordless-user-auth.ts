import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { AuthUser } from '../types';

import { QUERY_KEYS } from '@/config/query';
const { AUTH_USER } = QUERY_KEYS;

export const getAuthUser = (): Promise<AuthUser> => {
  return apiClient.get('/auth/me');
};

export const useUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: [AUTH_USER],
    queryFn: () => getAuthUser(),
  });

  return { data, isLoading };
};

// src/features/auth/api/get-auth-user.ts
