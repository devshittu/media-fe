import React from 'react';
import { NotificationType, useNotifications } from '@/stores/notifications';
import { EditBookmarkForm } from './edit-bookmark-form';
import { CacheRefType } from '@/types';
import { Bookmark } from '../../types';

export const EditBookmarkSection = ({
  bookmark,
  onCancel,
  cacheRefQueryKey,
}: {
  bookmark: Bookmark;
  onCancel?: () => void;
  cacheRefQueryKey: CacheRefType;
}) => {
  const { showNotification } = useNotifications();
  const onSuccess = () => {
    showNotification({
      type: NotificationType.SUCCESS,
      title: 'Success',
      duration: 5000,
      message: 'Bookmark updated successfully',
    });
  };

  return (
    <EditBookmarkForm
      bookmark={bookmark}
      onSuccess={onSuccess}
      onCancel={onCancel}
      cacheRefQueryKey={cacheRefQueryKey}
    />
  );
};
