import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';

import { AuthUser, AuthResponse, PasswordSigninData } from '../types';
import { URI_AUTH_TOKEN } from '@/config/api-constants';
import { AuthStore } from '@/stores/auth';
import { getAuthUser } from './get-auth-user';
import { setStoredToken, setStoredUserDetails } from '@/utils/auth';

export const signin = (data: PasswordSigninData): Promise<AuthResponse> => {
  return apiClient.post(`${URI_AUTH_TOKEN}`, data);
};

type UsePasswordSigninOptions = {
  onSuccess?: (auth: AuthResponse) => void;
};

export const usePasswordSignin = ({
  onSuccess,
}: UsePasswordSigninOptions = {}) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: signin,

    onSuccess: async (response) => {
      const newAccessToken = response.access_token;
      setStoredToken(newAccessToken);
      const { setAccessToken } = AuthStore.getState();
      setAccessToken(newAccessToken);

      const authUserData = await queryClient.fetchQuery(
        ['auth-user'],
        getAuthUser,
      );
      setStoredUserDetails(authUserData);
      const { setAuthUserDetails } = AuthStore.getState();
      setAuthUserDetails(authUserData);

      onSuccess?.(response);
    },
  });

  return { submit, isLoading };
};

// Path: src/features/auth/api/post-password-signin.ts
