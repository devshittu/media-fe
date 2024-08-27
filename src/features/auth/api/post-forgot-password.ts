'use client';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import { AuthResponse, ForgotPasswordData } from '../types';
import { URI_AUTH_PASSWORD_RESET } from '@/config/api-constants';
import { AuthStore } from '@/stores/auth';
import { getAuthUser } from './get-auth-user';
import { QUERY_KEYS } from '@/config/query';
import { DEFAULT_ACCESS_TOKEN_KEY_EXPIRES_AT } from '@/config/constants';
import { ApiCallMutationStatus, ApiResponseError } from '@/types';
import { parseError } from '@/utils';
const { AUTH_USER } = QUERY_KEYS;

export const forgotPassword = (data: ForgotPasswordData): Promise<AuthResponse> => {
  return apiClient.post(`${URI_AUTH_PASSWORD_RESET}`, data);
};

type UseForgotPasswordOptions = {
  onSuccess?: (auth: AuthResponse) => void;
  onError?: (error?: ApiResponseError) => void;
};

export const useForgotPassword = ({ onSuccess, onError }: UseForgotPasswordOptions) => {
  const {
    mutateAsync: submit,
    isPending,
    status,

    isSuccess,
  } = useMutation({
    mutationFn: forgotPassword,

    onSuccess: async (response) => {

      onSuccess?.(response);
    },
    onError: (error) => {
      // Handle the error here if needed

      const parsedError = parseError(error);
      console.error('Error requesting your password reset:', parsedError);

      // Call the onError callback if provided
      onError?.(parsedError as any);
    },
  });

  return {
    submit,
    isLoading: status === ApiCallMutationStatus.PENDING && !isSuccess,
  };
};

// Path: src/features/auth/api/post-password-reset.ts
