
'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SignupForm } from './signup-form';
import { NotificationType, useNotifications } from '@/stores/notifications';

export const SignupSection = () => {
  const router = useRouter();
  const { showNotification } = useNotifications();
  
  const onSuccess = () => {
    showNotification({
      type: NotificationType.SUCCESS,
      title: 'Success',
      duration: 5000,
      message: 'Your user account created successfully!',
    });
    // TODO: add the continuation of the signup such that reg can continue on the wizard.
    router.push(`/auth/verify`);
  };

  const onError = (message: string) => {
    showNotification({
      type: NotificationType.ERROR,
      title: 'Error',
      duration: 5000,
      message,
    });
  };

  return <SignupForm onSuccess={onSuccess} onError={onError} />;
};

//Path: src/features/auth/components/signup-form/signup-section.tsx
