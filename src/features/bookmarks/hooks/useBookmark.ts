import { notificationsStore } from './../../../stores/notifications/notifications';
import { useState } from 'react';
import { useAddBookmark } from '../api/post-add-bookmark';
import { useDeleteBookmark } from '../api/delete-bookmark';
import { AddBookmarkFormData } from '../types';
import { ResponseStatusType } from '@/types';
import { NotificationType, useNotifications } from '@/stores/notifications';

export const useBookmark = (storyId: string, initialBookmarkState: boolean) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarkState);
  const { showNotification } = useNotifications();

  const data = { story_id: storyId };
  const addBookmark = useAddBookmark({
    // data,
    onSuccess: (response) => {
      console.log(response);
      setIsBookmarked(true);
    },
  });
  const deleteBookmark = useDeleteBookmark({
    data,
    onSuccess: (response) => {
      console.log(response);
      if (response && response.status === ResponseStatusType.SUCCESS) {
        console.log('Successful data:// ', data);
        // onSuccess();

        showNotification({
          type: NotificationType.SUCCESS,
          title: 'Success',
          duration: 5000,
          message: 'Bookmark deleted.',
        });
      }
      setIsBookmarked(false);
    },
    onError: (response) => {
      if (response && response.status === ResponseStatusType.FAILED) {
        // onSuccess();
        console.error(response, 'Something went wrong.');
        showNotification({
          type: NotificationType.ERROR,
          title: 'Error',
          duration: 5000,
          message: 'Something went wrong.',
        });
        setIsBookmarked(true);
      }
    },
  });

  const handleBookmark = (data: AddBookmarkFormData) => {
    addBookmark.submit(data);
  };

  const handleUnbookmark = () => {
    console.log(`Unbookmark in progress for this  ${JSON.stringify(data)}`);
    deleteBookmark.submit({ data });
  };

  return {
    isBookmarked, // This should be derived from your data, e.g., check if the post ID exists in the user's bookmarked posts.
    handleBookmark,
    handleUnbookmark,
  };
};
