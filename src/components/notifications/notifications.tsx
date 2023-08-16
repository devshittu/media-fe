import React from 'react';
import {
  Notification,
  NotificationType,
  useNotifications,
} from '@/stores/notifications';
import { ToastComponent } from '../blocks/toast';

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotifications();

  if (notifications.length < 1) return null;
  // TODO:

  console.log('notifications', notifications);

  return (
    <div className="gap-4 flex-col-reverse flex">
      {notifications.map((notification) => (
        <ToastComponent
          key={notification.id}
          id={notification.id}
          isActive={true} // Assuming you want the toast to be active immediately
          type={notification.type}
          message={notification.message || 'Unknown notification'}
          duration={notification.duration}
          onClose={() => dismissNotification(notification.id)}
          // Add any other props you need for the ToastComponent
        />
      ))}
    </div>
  );
};
