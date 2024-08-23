import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

import { apiClient } from '@/lib/api-client';
import { URI_AUTH_RESEND_OTP } from '@/config/api-constants';

import { AuthUser, ResendOtpData } from '../types';
import { SignupDataStore } from '@/stores/auth';
import { ApiCallMutationStatus } from '@/types';

export const resendOtp = (
  data: ResendOtpData,
): Promise<{
  detail: string;
}> => {
  return apiClient.post(`${URI_AUTH_RESEND_OTP}`, data, { requiresAuth: false });
};

type UseResendOtpOptions = {
  onSuccess?: (message: string) => void;
  onError?: (error: any) => void;
};

export const useResendOtp = ({ onSuccess, onError }: UseResendOtpOptions = {}) => {
  const { mutateAsync: submit, isPending, status, isSuccess, error } = useMutation({
    mutationFn: resendOtp,

    onSuccess: (response) => {
      console.log('OTP Resent:', response.detail);
      onSuccess?.(response.detail);
    },

    onError: (error) => {
      console.error('Resend OTP error:', error);
      onError?.('An error occurred while resending the OTP. Please try again later.');
    },
  });

  return { submit, isLoading: status === ApiCallMutationStatus.PENDING && !isSuccess, error };
};
// Path: src/features/auth/api/post-resend-otp.ts
