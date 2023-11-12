import { requireAuth } from '../../../testing/mocks/utils';
import { useMutation } from '@tanstack/react-query';
import { removeItem } from '@/utils/localStorage';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import { URI_AUTH_LOGOUT } from '@/config/api-constants';
import { AuthStore } from '@/stores/auth';
import { signOut } from '@/utils';

type UseSignoutOptions = {
  onSuccess?: () => void;
};

export const useSignout = ({ onSuccess }: UseSignoutOptions = {}) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear();
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};

// Path: src/features/auth/api/post-signout.ts
