import React, { useState } from 'react';
import Wizard from '@/components/blocks/wizard/wizard';
import { NotificationType, useNotifications } from '@/stores/notifications';
import { usePopup } from '@/stores/ui';
import { SignupFlowSteps } from '@/features/auth/components/signup-flow';
import { useTour } from '@/stores/tour';
import { useAuthRedirect } from '../../hooks';
import { beginnerTourSequence } from '../signup-flow/beginner-tour-sequence';
import { TourPopperType } from '@/components/blocks/tour/tour-popper';
import { useConfetti } from '@/stores/confetti';
import { AccountVerificationForm } from './account-verification-form';
import ResponseStatusWidget from '@/components/blocks/response-status/response-status';

export const AccountVerificationSection = () => {
  const [isVerified, setIsVerified] = useState(false);

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
      message: 'Account activated successfully!',
    });

    setIsVerified(true);
    //TODO: handle change of the url without navigation
  };

  const handleStartAccountSetupSequence = () => {
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
  const successfulActivation = (
    <ResponseStatusWidget
      title="Activation Successful"
      subtitle='Your account has been created and activated seamlessly. To proceed with personalizing your experience, simply click the "Continue" button below. A setup guide awaits in the pop-up modal.'
      isSuccess
      ctaText="Continue"
      ctaOnClick={handleStartAccountSetupSequence}
    />
  );

  return isVerified ? (
    successfulActivation
  ) : (
    <AccountVerificationForm onSuccess={onSuccess} />
  );
};

//Path: src/features/auth/components/signup-form/account-verification-section.tsx
