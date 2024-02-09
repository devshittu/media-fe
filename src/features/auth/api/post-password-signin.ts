import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import { AuthResponse, PasswordSigninData } from '../types';
import { URI_AUTH_TOKEN } from '@/config/api-constants';
import { AuthStore } from '@/stores/auth';
import { getAuthUser } from './get-auth-user';
import { QUERY_KEYS } from '@/config/query';
import { DEFAULT_ACCESS_TOKEN_KEY_EXPIRES_AT } from '@/config/constants';
import { ApiCallMutationStatus } from '@/types';
const { AUTH_USER } = QUERY_KEYS;

export const signin = (data: PasswordSigninData): Promise<AuthResponse> => {
  return apiClient.post(`${URI_AUTH_TOKEN}`, data);
};

type UsePasswordSigninOptions = {
  onSuccess?: (auth: AuthResponse) => void;
};

export const usePasswordSignin = ({ onSuccess }: UsePasswordSigninOptions) => {
  const {
    mutate: submit,
    isPending,
    status,

    isSuccess,
    // isFetching, isFetched
  } = useMutation({
    mutationFn: signin,

    onSuccess: async (response) => {
      const newAccessToken = response?.access_token;
      const newAccessTokenExpiry = response?.access_token_expires_at;
      const { setAccessToken, setAuthUserDetails } = AuthStore.getState();
      setAccessToken(
        newAccessToken,
        newAccessTokenExpiry || DEFAULT_ACCESS_TOKEN_KEY_EXPIRES_AT,
      );

      // Fetch user details after login
      // queryClient.invalidateQueries([AUTH_USER]);

      try {
        const authUserData = await queryClient.fetchQuery({
          queryKey: [AUTH_USER],
          queryFn: getAuthUser,
        });

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

  return {
    submit,
    isLoading: status === ApiCallMutationStatus.PENDING && !isSuccess,
  };
};

// Path: src/features/auth/api/post-password-signin.ts
