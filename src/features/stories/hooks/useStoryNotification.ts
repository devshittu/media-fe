import { useNotifications, NotificationType } from '@/stores/notifications';

export const useStoryNotification = (storySlug: string, action: string) => {
  const { showNotification } = useNotifications();

  const getSuccessMessage = () => {
    switch (action) {
      case 'like':
        return `You liked ${storySlug} story.`;
      case 'dislike':
        return `You disliked ${storySlug} story.`;
      case 'unlike':
        return `You unlike ${storySlug} story.`;
      case 'undislike':
        return `You undisliked ${storySlug} story.`;
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
