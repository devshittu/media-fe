import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/config/query';
import { ApiResponse } from '@/types';
const { FOLLOW_USER } = QUERY_KEYS;

type FollowUserData = {
  data: {
    user_id: string | undefined;
  };
};

export const followUser = ({ data }: FollowUserData): Promise<ApiResponse> => {
  return apiClient.post('/users/follow', { data });
};

type UseFollowUserOptions = {
  data: {
    user_id: string | undefined;
  };
  onSuccess?: ((data: any) => boolean) | ((data: any) => void);

  onError?: (message: any) => void;
};

export const useFollowUser = ({
  data,
  onSuccess,
  onError,
}: UseFollowUserOptions) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationKey: [FOLLOW_USER, data],
    mutationFn: followUser,
    onSuccess: (data) => {
      // Invalidate and refetch something when a post is unbookmarked
      //   queryClient.invalidateQueries('someQueryKey');
      console.log('useFollowUser:// ',data);
      onSuccess?.(data);
      return data.status;
    },
    onError: (data) => {
      onError?.(data);
    },
  });

  return {
    submit,
    isLoading,
  };
};
