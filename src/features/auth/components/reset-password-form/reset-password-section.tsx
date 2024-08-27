
'use client';
import React from 'react';
import { ResetPasswordForm } from './reset-password-form';
import { NotificationType, useNotifications } from '@/stores/notifications';
type ResetPasswordSectionProps = {
  token: string;
};

export const ResetPasswordSection = ({ token }: ResetPasswordSectionProps) => {
  const { showNotification } = useNotifications();


  const onSuccess = () => {
  showNotification({
    type: NotificationType.SUCCESS,
    title: 'Success',
    duration: 5000,
    message: 'Password reset successful! Redirecting to sign in...',
  });

  // Redirect after a delay
  setTimeout(() => {
    window.location.href = '/auth/signin';
  }, 3000);
};

  const onError = (message: any) => {
    showNotification({
      type: NotificationType.ERROR,
      title: 'Error',
      duration: 5000,
      message,
    });
  };
  return <ResetPasswordForm token={token} onSuccess={onSuccess} onError={onError} />;
};

//Path: src/features/auth/components/reset-password-form/reset-password-section.tsx
