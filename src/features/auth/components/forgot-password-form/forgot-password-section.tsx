
'use client';
import React from 'react';
import { ForgotPasswordForm } from './forgot-password-form';
import { NotificationType, useNotifications } from '@/stores/notifications';

export const ForgotPasswordSection = () => {
  const { showNotification } = useNotifications();


  const onSuccess = () => {
    showNotification({
      type: NotificationType.SUCCESS,
      title: 'Success',
      duration: 5000,
      message: 'Password reset email sent to your email successfully.',
    });
    // const redirect = searchParams?.get('redirect') as string;
    // router.replace(redirect || '/stories');
  };

  const onError = (message: string) => {
    showNotification({
      type: NotificationType.ERROR,
      title: 'Error',
      duration: 5000,
      message,
    });
  };
  return <ForgotPasswordForm onSuccess={onSuccess} />;
};

//Path: src/features/auth/components/signin-form/signin-section.tsx
