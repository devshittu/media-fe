import {
  NotificationPosition,
  NotificationType,
  useNotifications,
} from '@/stores/notifications';

export const useSuccessNotification = (message: string) => {
  const { showNotification } = useNotifications();

  return () => {
    showNotification(
      {
        type: NotificationType.SUCCESS,
        title: 'Success',
        duration: 6000,
        message: message,
      },
      { position: NotificationPosition.BOTTOM_CENTER },
    );
  };
};

// Path: src/features/settings/hooks/useSuccessNotification.ts
