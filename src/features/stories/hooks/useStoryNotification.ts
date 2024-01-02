import { useNotifications, NotificationType } from '@/stores/notifications';
import { StoryAction } from '../components/types';

export const useStoryNotification = (
  storySlug: number | string,
  action: StoryAction,
) => {
  const { showNotification } = useNotifications();

  const getSuccessMessage = () => {
    switch (action) {
      case StoryAction.LIKE:
        return `You liked ${storySlug} story.`;
      case StoryAction.DISLIKE:
        return `You disliked ${storySlug} story.`;
      case StoryAction.UNLIKE:
        return `You unlike ${storySlug} story.`;
      case StoryAction.UNDISLIKE:
        return `You undisliked ${storySlug} story.`;
      case StoryAction.ADD_BOOKMARK:
        return `Bookmark added successfully.`;
      case StoryAction.DELETE_BOOKMARK:
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
