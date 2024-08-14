'use client';
import React from 'react';
import { NotificationType, useNotifications } from '@/stores/notifications';
import { AddFeedbackForm } from './add-feedback-form';
import { Story } from '@/features/stories';

export const AddFeedbackSection = ({
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
      message:
        'Thanks for sharing your feedback! Your insights help us improve.',
    });
    // close the popup
    if (onCancel) {
      onCancel();
    }
  };
  const onError = () => {
    showNotification({
      type: NotificationType.ERROR,
      title: 'Error',
      duration: 5000,
      message: 'Something went wrong, please try again.',
    });
  };

  return (
    <>
      <AddFeedbackForm
        story={story}
        onSuccess={onSuccess}
        onError={onError}
        onCancel={onCancel}
      />
    </>
  );
};

// src/features/feedbacks/components/forms/add-feedback-section.tsx
