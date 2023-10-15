import { useFollowUser } from '../api/follow-user';

export const useUser = (userId: string) => {
  // const followUser = useFollowUser();
  const { submit: followUserSubmit, isFollowLoading } = useFollowUser();

  // Todo: block and unfollow user
  const handleFollowUser = async (
    onSuccess: () => void,
    onFailure: () => void,
  ): Promise<void> => {
    try {
      await followUserSubmit(
        { user_id: userId },
        {
          onSuccess: (data) => {
            if (data && data.status) {
              onSuccess();
            } else {
              onFailure();
            }
          },
          onError: () => {
            onFailure();
          },
        },
      );
    } catch (error) {
      onFailure();
    }
  };

  return {
    handleFollowUser,
    isFollowLoading,
  };
};

// Path: media-fe/src/features/users/hooks/useUser.ts
