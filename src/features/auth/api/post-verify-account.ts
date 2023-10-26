import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

import { VerifyAccountData, VerifyOTPAndAuthResponse } from '../types';
import { URI_AUTH_VERIFY_OTP_AUTH } from '@/config/api-constants';
import { AuthStore } from '@/stores/auth';
import { setStoredToken, setStoredUserDetails } from '@/utils';
import { queryClient } from '@/lib/react-query';
import { getAuthUser } from './get-auth-user';

export const verifyAccount = (
  data: VerifyAccountData,
): Promise<VerifyOTPAndAuthResponse> => {
  return apiClient.post(`${URI_AUTH_VERIFY_OTP_AUTH}`, data, {
    requiresAuth: false,
  });
};

type UseVerifyAccountOptions = {
  onSuccess?: (user: VerifyOTPAndAuthResponse) => void;
};

export const useVerifyAccount = ({
  onSuccess,
}: UseVerifyAccountOptions = {}) => {
  const {
    mutate: submit,
    isLoading,
    error,
  } = useMutation({
    mutationFn: verifyAccount,
    // onSuccess: ({ user }) => {
    onSuccess: async (response) => {
      // queryClient.setQueryData(['auth-user'], user);
      console.log('On success from verifyAccount yeild { user }', response);
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

    onError: (error) => {
      // Handle the error here if needed
    },
  });

  return { submit, isLoading, error };
};

// Path: src/features/auth/api/post-user-verifyAccount.ts
