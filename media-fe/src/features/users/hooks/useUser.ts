import { useState } from 'react';
import { useFollowUser } from '../api/follow-user';
import { NotificationType, useNotifications } from '@/stores/notifications';

export const useUser = (userId: string, initialUserState: boolean) => {
  const { showNotification } = useNotifications();
  const [isUserFollowed, setIsUserFollowed] = useState(initialUserState);
  const data = { user_id: userId };
  const followUser = useFollowUser({
    data,
    onSuccess: (response) => {
      console.log('success', response);
      setIsUserFollowed(response.status);
      return response.status;
    },
    onError: (response) => {
      console.log('error', response.status);
      setIsUserFollowed(false);
      showNotification({
        type: NotificationType.ERROR,
        title: 'Failed',
        duration: 5000,
        message: 'Unable to follow user at this time. Please try again later',
      });
    },
  });
  //Todo: block and unfollow user

  const handleFollowUser = async () => {
    const submit = await followUser.submit({ data });
    console.log('handleFollowUser:// ', JSON.stringify(submit));
    return submit;
  };

  //   const handleUnfollowUser = () => {
  //     deleteUser.submit({ data });
  //   };

  return {
    isUserFollowed, // This should be derived from your data, e.g., check if the post ID exists in the user's bookmarked posts.
    handleFollowUser,
    // handleUnfollowUser,
  };
};
