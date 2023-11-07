import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';

import { AuthUser, SignupData } from '../types';
import { URI_AUTH_REGISTER } from '@/config/api-constants';
import { SignupDataStore } from '@/stores/auth';

export const signup = (
  data: SignupData,
): Promise<{
  user: AuthUser;
}> => {
  return apiClient.post(`${URI_AUTH_REGISTER}`, data, { requiresAuth: false });
};

type UseSignupOptions = {
  onSuccess?: (user: AuthUser) => void;
};

export const useSignup = ({ onSuccess }: UseSignupOptions = {}) => {
  const {
    mutate: submit,
    isLoading,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: ({ user }) => {
      // queryClient.setQueryData(['auth-user'], user);
      onSuccess?.(user);

      // SignupDataStore.getState().setSignupData(user); // Update the access token in Zustand store
    },

    onError: (error) => {
      // Handle the error here if needed
    },
  });

  return { submit, isLoading, error };
};

// Path: src/features/auth/api/post-user-signup.ts
