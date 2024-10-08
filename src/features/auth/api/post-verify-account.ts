import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { VerifyAccountData, VerifyOTPAndAuthResponse } from '../types';
import { URI_AUTH_OTP_ACTIVATE_ACCOUNT } from '@/config/api-constants';
import { QUERY_KEYS } from '@/config/query';
import { ApiCallMutationStatus, ApiResponseError } from '@/types';
import { parseError } from '@/utils/parse-error';
const { AUTH_USER } = QUERY_KEYS;

export const verifyAccount = (
  data: VerifyAccountData,
): Promise<VerifyOTPAndAuthResponse> => {
  return apiClient.post(`${URI_AUTH_OTP_ACTIVATE_ACCOUNT}`, data, {
    requiresAuth: false,
  });
};

type UseVerifyAccountOptions = {
  onSuccess?: (user: VerifyOTPAndAuthResponse) => void;
  onError?: (error?: ApiResponseError) => void;
};

export const useVerifyAccount = ({
  onSuccess,
  onError,
}: UseVerifyAccountOptions) => {
  const {
    mutateAsync: submit,
    isPending,
    status,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: verifyAccount,
    onSuccess: async (response) => {
      onSuccess?.(response);
    },

    onError: (error) => {
      // Handle the error here if needed

      const parsedError = parseError(error);
      console.error('Error verifying account:', parsedError);

      // Call the onError callback if provided
      onError?.(parsedError as any);
    },
  });

  return {
    submit,
    isLoading: status === ApiCallMutationStatus.PENDING && !isSuccess,
    error,
  };
};

// Path: src/features/auth/api/post-verify-account.ts
