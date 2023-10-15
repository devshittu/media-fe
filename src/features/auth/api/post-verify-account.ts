import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

import { VerifyAccountData, VerifyOTPAndAuthResponse } from '../types';
import { URI_AUTH_VERIFY_OTP_AUTH } from '@/config/api-constants';
import { AuthStore } from '@/stores/auth';

export const verifyAccount = (
  data: VerifyAccountData,
): Promise<{
  user: VerifyOTPAndAuthResponse;
}> => {
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
    onSuccess: ({ user }) => {
      // queryClient.setQueryData(['auth-user'], user);
      onSuccess?.(user);
      const newAccessToken = user.access_token;
      AuthStore.getState().setAccessToken(newAccessToken); // Update the access token in Zustand store
    },

    onError: (error) => {
      // Handle the error here if needed
    },
  });

  return { submit, isLoading, error };
};

// Path: src/features/auth/api/post-user-verifyAccount.ts
