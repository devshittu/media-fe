// "use client"
// import React from 'react';
// import { useRouter } from 'next/navigation';
// import { SigninForm } from './signin-form';
// import Wizard from '@/components/blocks/wizard/wizard';
// import { NotificationType, useNotifications } from '@/stores/notifications';
// import { usePopupStore } from '@/stores/ui';
// import { SignupFlowSteps } from '@/features/auth/components/signup-flow';
// import { useTour } from '@/stores/tour';
// import { useAuthRedirect } from '../../hooks';
// import { beginnerTourSequence } from '../signup-flow/beginner-tour-sequence';
// import { TourPopperType } from '@/components/blocks/tour/tour-popper';
// import { useConfetti } from '@/stores/confetti';

// export const SigninSection = () => {
//   const router = useRouter();
//   const { showNotification } = useNotifications();
//   const { show: showPopup, close: closePopup } = usePopupStore();
//   const { showTour } = useTour();
//   const { playConfetti } = useConfetti();

//   const { handleFinish } = useAuthRedirect();

//   const onSuccess = () => {
//     showNotification({
//       type: NotificationType.SUCCESS,
//       title: 'Success',
//       duration: 5000,
//       message: 'Login successful!',
//     });
//     const redirect = router.query.redirect as string;
//     router.replace(redirect || '/stories');

//     // showPopup(<Wizard steps={SignupFlowSteps} onFinish={handleWizardFinish} />);
//   };

//   const handleWizardFinish = async () => {
//     await handleFinish('/stories');
//     // Show confetti with a 5-second duration and 0-second delay
//     await playConfetti({ duration: 5000, delay: 0 });
//     closePopup();
//     await showTour({
//       sequence: beginnerTourSequence,
//       type: TourPopperType.INFO,
//       delay: 2000, // milliseconds
//     });
//   };

//   return <SigninForm onSuccess={onSuccess} />;
// };

'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SigninForm } from './signin-form';
import { NotificationType, useNotifications } from '@/stores/notifications';
import { usePopupStore } from '@/stores/ui';
import { useAuthRedirect } from '../../hooks';
import { useTour } from '@/stores/tour';
import { useConfetti } from '@/stores/confetti';

export const SigninSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showNotification } = useNotifications();
  const { show: showPopup, close: closePopup } = usePopupStore();
  const { showTour } = useTour();
  const { playConfetti } = useConfetti();

  const { handleFinish } = useAuthRedirect();

  const onSuccess = () => {
    showNotification({
      type: NotificationType.SUCCESS,
      title: 'Success',
      duration: 5000,
      message: 'Login successful!',
    });
    const redirect = searchParams?.get('redirect') as string;
    router.replace(redirect || '/stories');
  };

  return <SigninForm onSuccess={onSuccess} />;
};

//Path: src/features/auth/components/signin-form/signin-section.tsx
