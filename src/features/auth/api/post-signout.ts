import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { signOut } from '@/utils';

type UseSignoutOptions = {
  onSuccess?: () => void;
};

export const useSignout = ({ onSuccess }: UseSignoutOptions = {}) => {
  const { mutateAsync: submit, isLoading } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear();
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};

// Path: src/features/auth/api/post-signout.ts
