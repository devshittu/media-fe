import { useNotifications, NotificationType } from '@/stores/notifications';
import { BookmarkAction } from '../components/types';

export const useBookmarkNotification = (
  storySlug: number | string,
  action: BookmarkAction,
) => {
  const { showNotification } = useNotifications();

  const getSuccessMessage = () => {
    switch (action) {
      case BookmarkAction.DELETE_BOOKMARK:
        return `Bookmark removed successfully.`;
      default:
        return '';
    }
  };

  const onSuccess = () => {
    showNotification({
      type: NotificationType.SUCCESS,
      title: 'Success',
      duration: 5000,
      message: getSuccessMessage(),
    });
  };

  const onError = () => {
    showNotification({
      type: NotificationType.ERROR,
      title: 'Error',
      duration: 5000,
      message: `Something went wrong, while ${action}-ing your story. Please try again.`,
    });
  };

  return { onSuccess, onError };
};

// hooks/useStoryNotification.ts
