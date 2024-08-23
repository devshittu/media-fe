import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';

import { AuthUser, SignupData } from '../types';
import { URI_AUTH_REGISTER } from '@/config/api-constants';
import { SignupDataStore } from '@/stores/auth';
import { ApiCallMutationStatus } from '@/types';

export const signup = (
  data: SignupData,
): Promise<{
  user: AuthUser;
}> => {
  return apiClient.post(`${URI_AUTH_REGISTER}`, data, { requiresAuth: false });
};

type UseSignupOptions = {
  onSuccess?: (user: AuthUser, password: string) => void;
  onError?: (error: any) => void;
};

export const useSignup = ({ onSuccess, onError }: UseSignupOptions = {}) => {
  const {
    // mutateAsync: submit,
    mutateAsync: submit,
    isPending, status, isSuccess,
    error,
  } = useMutation({
    mutationFn: signup,

    onSuccess: async (response, variables) => {
      const user = response as unknown as AuthUser; 
      const { password } = variables;
      console.log(`Will now attempt to login with User ${JSON.stringify(user)} has ${password}`, user.email)

      // SignupDataStore.getState().setSignupData(user); // Update the access token in Zustand store

      try {
        // Sign in the user automatically using the credentials
        const signInResponse = await signIn('credentials', {
          redirect: false,
          email: user.email,
          password: password,  // Password is securely retrieved from the user object
        });

        if (signInResponse?.error) {
          console.error('Sign-in error:', signInResponse.error);
          onError?.('There was an issue signing you in. Please try again.');
        } else {
          onSuccess?.(user, password);
          return
        }
      } catch (err) {
        console.error('Sign-in attempt failed:', err);
        onError?.('An unexpected error occurred. Please try again later.');
      }
    },

    onError: (error) => {
      console.error('Signup error:', error);
      onError?.('An error occurred during signup. Please try again later.');
    
    },
  });

  return { submit, isLoading: status === ApiCallMutationStatus.PENDING && !isSuccess, error };
};

// Path: src/features/auth/api/post-user-signup.ts
