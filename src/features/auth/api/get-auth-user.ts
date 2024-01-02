import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { AuthUser } from '../types';

import { QUERY_KEYS } from '@/config/query';
import { URI_AUTH_ME } from '@/config/api-constants';
const { AUTH_USER } = QUERY_KEYS;

export const getAuthUser = async (): Promise<AuthUser> => {
  return apiClient.get(`${URI_AUTH_ME}`, { requiresAuth: true });
};

export const useAuthUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [AUTH_USER],
    queryFn: () => getAuthUser(),
    onError: (error: any) => {
      console.error(error);
      throw new Error(
        error.response?.data?.message || 'Failed to fetch auth user',
      );
    },
  });

  return { data, isLoading, error };
};

// src/features/auth/api/get-auth-user.ts
