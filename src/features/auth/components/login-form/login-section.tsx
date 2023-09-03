import React from 'react';
import { LoginForm } from './login-form';
import Wizard from '@/components/blocks/wizard/wizard';
import { NotificationType, useNotifications } from '@/stores/notifications';
import { usePopup } from '@/stores/ui';
import { SignupFlowSteps } from '@/features/auth/components/signup-flow';
import { useTour } from '@/stores/tour';
import { useAuthRedirect } from '../../hooks';
import { beginnerTourSequence } from '../signup-flow/beginner-tour-sequence';
import { TourPopperType } from '@/components/blocks/tour/tour-popper';
import { useConfetti } from '@/stores/confetti';

export const LoginSection = () => {
  const { showNotification } = useNotifications();
  const { show: showPopup, close: closePopup } = usePopup();
  const { showTour } = useTour();
  const { playConfetti } = useConfetti();

  const { handleFinish } = useAuthRedirect();

  const onSuccess = () => {
    showNotification({
      type: NotificationType.SUCCESS,
      title: 'Success',
      duration: 5000,
      message: 'Job Created!',
    });
    showPopup(<Wizard steps={SignupFlowSteps} onFinish={handleWizardFinish} />);
  };

  const handleWizardFinish = async () => {
    await handleFinish('/stories');
    // Show confetti with a 5-second duration and 0-second delay
    await playConfetti({ duration: 5000, delay: 0 });
    closePopup();
    await showTour({
      sequence: beginnerTourSequence,
      type: TourPopperType.INFO,
      delay: 2000, // milliseconds
    });
  };

  return <LoginForm onSuccess={onSuccess} />;
};

//Path: src/features/auth/components/login-form/login-section.tsx
