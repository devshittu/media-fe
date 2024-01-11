import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { VerifyAccountData, VerifyOTPAndAuthResponse } from '../types';
import { URI_AUTH_VERIFY_OTP_AUTH } from '@/config/api-constants';
import { AuthStore } from '@/stores/auth';
import { queryClient } from '@/lib/react-query';
import { getAuthUser } from './get-auth-user';
import { QUERY_KEYS } from '@/config/query';
import { ApiResponseError } from '@/types';
import { parseError } from '@/utils/parse-error';
const { AUTH_USER } = QUERY_KEYS;

export const verifyAccount = (
  data: VerifyAccountData,
): Promise<VerifyOTPAndAuthResponse> => {
  return apiClient.post(`${URI_AUTH_VERIFY_OTP_AUTH}`, data, {
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
    mutate: submit,
    isLoading,
    error,
  } = useMutation({
    mutationFn: verifyAccount,
    onSuccess: async (response) => {
      // queryClient.setQueryData(['auth-user'], user);
      const newAccessToken = response.access_token;
      const { setAccessToken, setAuthUserDetails } = AuthStore.getState();
      setAccessToken(newAccessToken);

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

    onError: (error) => {
      // Handle the error here if needed

      const parsedError = parseError(error);
      console.error('Error verifying account:', parsedError);

      // Call the onError callback if provided
      onError?.(parsedError as any);
    },
  });

  return { submit, isLoading, error };
};

// Path: src/features/auth/api/post-user-verifyAccount.ts
