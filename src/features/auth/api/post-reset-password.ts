'use client';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import { AuthResponse, ResetPasswordData } from '../types';
import { URI_AUTH_PASSWORD_RESET_CONFIRM } from '@/config/api-constants';
import { AuthStore } from '@/stores/auth';
import { getAuthUser } from './get-auth-user';
import { QUERY_KEYS } from '@/config/query';
import { DEFAULT_ACCESS_TOKEN_KEY_EXPIRES_AT } from '@/config/constants';
import { ApiCallMutationStatus, ApiResponseError } from '@/types';
import { parseError } from '@/utils';
const { AUTH_USER } = QUERY_KEYS;

export const resetPassword = (data: ResetPasswordData): Promise<AuthResponse> => {
  return apiClient.post(`${URI_AUTH_PASSWORD_RESET_CONFIRM}`, data);
};

type UseResetPasswordOptions = {
  onSuccess?: (auth: AuthResponse) => void;
  onError?: (error?: ApiResponseError) => void;
};

export const useResetPassword = ({ onSuccess, onError }: UseResetPasswordOptions) => {
  const {
    mutateAsync: submit,
    isPending,
    status,
    isSuccess,
  } = useMutation({
    mutationFn: resetPassword,

    onSuccess: async (response) => {

      onSuccess?.(response);
    },
    onError: (error) => {
      // // Handle the error here if needed

      // const parsedError = parseError(error);
      console.error('Error resetting your password:', error);

      // // Call the onError callback if provided
      // onError?.(parsedError as any);

  // const parsedError = parseError(error);
  // const errorMessage = parsedError?.error?.detail?.token || 'Error resetting your password.';

  // console.error('Error resetting your password:', errorMessage);
  // onError?.(errorMessage);
    },
  });

  return {
    submit,
    isLoading: status === ApiCallMutationStatus.PENDING && !isSuccess,
  };
};

// Path: src/features/auth/api/post-reset-password.ts
