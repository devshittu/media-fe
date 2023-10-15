import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { uriTemplate } from '@/utils';
import { URI_USERS_FOLLOW_BY_USER_ID } from '@/config/api-constants';

const { FOLLOW_USER } = QUERY_KEYS;

export const followUser = (data: {
  user_id: string;
}): Promise<{ status: boolean }> => {
  const uri = uriTemplate(URI_USERS_FOLLOW_BY_USER_ID, {
    user_id: data.user_id,
  });
  return apiClient.post(`${uri}`, { data });
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
