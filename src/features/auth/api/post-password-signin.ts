import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import { AuthResponse, PasswordSigninData } from '../types';
import { URI_AUTH_TOKEN } from '@/config/api-constants';
import { AuthStore } from '@/stores/auth';
import { getAuthUser } from './get-auth-user';
import { QUERY_KEYS } from '@/config/query';
const { AUTH_USER } = QUERY_KEYS;

export const signin = (data: PasswordSigninData): Promise<AuthResponse> => {
  return apiClient.post(`${URI_AUTH_TOKEN}`, data);
};

type UsePasswordSigninOptions = {
  onSuccess?: (auth: AuthResponse) => void;
};

export const usePasswordSignin = ({ onSuccess }: UsePasswordSigninOptions) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: signin,

    onSuccess: async (response) => {
      const newAccessToken = response.access_token;
      const { setAccessToken, setAuthUserDetails } = AuthStore.getState();
      setAccessToken(newAccessToken);

      // Fetch user details after login
      // queryClient.invalidateQueries([AUTH_USER]);

      try {
        const authUserData = await queryClient.fetchQuery(
          [AUTH_USER],
          getAuthUser,
        );

        if (authUserData) {
          setAuthUserDetails(authUserData);
        } else {
          console.error('Failed to fetch auth user data: Data is undefined');
        }
      } catch (error) {
        console.error(
          'An error occurred while fetching the auth user data:',
          error,
        );
      }

      onSuccess?.(response);
    },
  });

  return { submit, isLoading };
};

// Path: src/features/auth/api/post-password-signin.ts
