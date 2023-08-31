import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';

const { FOLLOW_USER } = QUERY_KEYS;

export const followUser = (data: {
  user_id: string;
}): Promise<{ status: boolean }> => {
  return apiClient.post('/users/follow', { data });
};

export const useFollowUser = () => {
  const { mutate: submit, isLoading: isFollowLoading } = useMutation({
    mutationKey: [FOLLOW_USER],
    mutationFn: followUser,
  });

  return {
    submit,
    isFollowLoading,
  };
};

// Path: media-fe/src/features/users/api/follow-user.ts
