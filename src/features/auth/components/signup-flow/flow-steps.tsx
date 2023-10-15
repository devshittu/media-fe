import { Step } from '@/components/blocks/wizard/types';
import {
  Channels,
  Finish,
  Greetings,
  PersonalizeCategories,
  Token,
  VisualAppearance,
} from './';
import {
  NotificationPosition,
  NotificationType,
  notificationsStore,
  useNotifications,
} from '@/stores/notifications';
const mockBackendCall = () => {
  return new Promise<void>((resolve, reject) => {
    // Simulate a delay of 2 seconds (2000 milliseconds)
    setTimeout(() => {
      console.log('Token Verification loading...');
      const message =
        'Your action was successfully completed and here is your notification';
      notificationsStore.getState().showNotification(
        {
          type: NotificationType.SUCCESS,
          title: 'Success Notification',
          duration: 5000,
          message,
        },
        { position: NotificationPosition.BOTTOM_CENTER },
      );

      // You can resolve or reject the promise here to simulate success or failure
      resolve(); // Simulates a successful response
      // reject(new Error('Something went wrong')); // Uncomment to simulate an error response
    }, 500);
  });
};
export const SignupFlowSteps: Step[] = [
  {
    id: 'step2',
    title: 'Congratulations!',
    subtitle:
      'Your account has been successfully created. Welcome to our community!',
    component: <Greetings />,
    isMandatory: true,
    // canComeBack: false,
  },
  {
    id: 'step3',
    title: 'Personalize Categories',
    subtitle:
      'Choose from the categories below to tailor your experience to your interests.',
    component: <PersonalizeCategories />,
    isMandatory: false,
    // canComeBack: true,
  },
  {
    id: 'step4',
    title: 'Visual Appearance',
    subtitle:
      'Choose themes to personalize the look and feel of your interface.',
    component: <VisualAppearance />,
    isMandatory: false,
  },
  {
    id: 'step5',
    title: 'Follow User Accounts',
    subtitle:
      'Select some accounts to follow and start connecting with others right away.',
    component: <Channels />,
    isMandatory: false,
  },
  {
    id: 'step6',
    title: 'Finish & Welcome',
    subtitle:
      "Thanks for joining! We'll take you to the homepage, and a quick tour will show you how to navigate the site.",
    component: <Finish />,
    isMandatory: true,
  },
];

//Path: src/features/auth/components/signup-flow/flow-steps.tsx
