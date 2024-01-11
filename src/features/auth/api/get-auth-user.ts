import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { AuthUser } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_AUTH_ME } from '@/config/api-constants';
import { useAuthStore } from '@/stores/auth';
import { parseError } from '@/utils';
const { AUTH_USER } = QUERY_KEYS;

export const getAuthUser = async (): Promise<AuthUser> => {
  return apiClient.get(`${URI_AUTH_ME}`, { requiresAuth: true });
};

export const useAuthUser = () => {
  const { accessToken, setAccessToken, authUserDetails, setAuthUserDetails } =
    useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: [AUTH_USER],
    queryFn: () => getAuthUser(),
    enabled: !!accessToken, // Only run if we have an access token
    onSuccess: (data) => setAuthUserDetails(data),
    onError: (error: any) => {
      console.error(
        'authdebug: Error fetching authenticated user information: error: ',
        error,
      );
      // Handle the error here if needed
      const parsedError = parseError(error);
      console.error(
        'Error fetching authenticated user information: ',
        parsedError,
      );
      throw new Error(
        error.response?.data?.message || 'Failed to fetch auth user',
      );
    },
  });

  return { data, isLoading, error };
};

// src/features/auth/api/get-auth-user.ts
