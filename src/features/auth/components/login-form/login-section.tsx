import React from 'react';
import { LoginForm } from './login-form';
import Wizard from '@/components/blocks/wizard/wizard';
import { NotificationType, useNotifications } from '@/stores/notifications';
import { usePopup } from '@/stores/popup';
import { SignupFlowSteps } from '@/features/auth/components/signup-flow';
import { useRouter } from 'next/router';

export const LoginSection = () => {
  const router = useRouter();
  const { showNotification } = useNotifications();

  const { showPopup } = usePopup();
  const onSuccess = () => {
    showNotification({
      type: NotificationType.SUCCESS,
      title: 'Success',
      duration: 5000,
      message: 'Job Created!',
    });
    showPopup(<Wizard steps={SignupFlowSteps} onFinish={handleFinish} />);
  };

  const handleFinish = async () => {
    // Handle logic when the user finishes the wizard
    console.log('Wizard finished!');
    // const redirect = router.query.redirect as string;
    // router.replace(redirect || '/stories');
    // goto the landing page
    await router.push('/stories');

    //Todo: can I await the router.push or replace Start the tour from here

    console.log('Wizard finished!');
  };
  return <LoginForm onSuccess={onSuccess} />;
};
