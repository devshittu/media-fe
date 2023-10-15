import { useRouter } from 'next/router';
import React from 'react';

import { Seo } from '@/components/seo';
import { NotificationType, useNotifications } from '@/stores/notifications';
// import { AuthLayout } from '@/layouts/auth-layout';
import { SignupForm } from '@/features/auth/components/signup-form/signup-form';
import { useSignupStore } from '@/stores/auth';

const SignupPage = () => {
  const router = useRouter();
  const { showNotification } = useNotifications();

  const onSuccess = () => {
    showNotification({
      type: NotificationType.SUCCESS,
      title: 'Success',
      duration: 5000,
      message: 'Your user account created successfully!',
    });
    // const redirect = router.query.redirect as string;
    // router.replace(redirect || '/stories');
    router.push(`/auth/signup/verify-account`);
  };
  return (
    <div className="h-screen">
      <Seo title="Signup" />
      <div className="container mx-auto flex flex-col px-5 py-14 justify-center items-center">
        <SignupForm onSuccess={onSuccess} />
      </div>
    </div>
  );
};

export default SignupPage;

// Path: src/pages/auth/signup/index.tsx
