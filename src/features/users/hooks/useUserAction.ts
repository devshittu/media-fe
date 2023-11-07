import { ResponseStatusType } from '@/types';
import { useFollowUser } from '../api/follow-user';

export const useUserAction = (userId: string) => {
  // const followUser = useFollowUser();
  const { submit: followUserSubmit, isFollowLoading } = useFollowUser();

  // Todo: block and unfollow user
  const handleFollowUser = async (
    onSuccess: () => void,
    onError: () => void,
  ): Promise<void> => {
    try {
      await followUserSubmit(
        { user_id: userId },
        {
          onSuccess: (data) => {
            if (data && data.status === ResponseStatusType.SUCCESS) {
              onSuccess();
            }
          },
          onError: (error) => {
            onError();
          },
        },
      );
    } catch (error) {
      onError();
    }
  };

  return {
    handleFollowUser,
    isFollowLoading,
  };
};

// Path: media-fe/src/features/users/hooks/useUser.ts
