import React from 'react';
import { NotificationType, useNotifications } from '@/stores/notifications';
import { AddBookmarkForm } from './add-bookmark-form';
import { Story } from '@/features/stories';

export const AddBookmarkSection = ({
  story,
  onCancel,
}: {
  story: Story;
  onCancel?: () => void;
}) => {
  const { showNotification } = useNotifications();
  const onSuccess = () => {
    showNotification({
      type: NotificationType.SUCCESS,
      title: 'Success',
      duration: 5000,
      message: 'Bookmark added successfully',
    });
  };

  return (
    <AddBookmarkForm story={story} onSuccess={onSuccess} onCancel={onCancel} />
  );
};
