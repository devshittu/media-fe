import React, { useEffect } from 'react';
import {
  Notification,
  NotificationPosition,
  NotificationType,
  useNotifications,
} from '@/stores/notifications';
import Portal from '@/hoc/Portal';
import { AlertTriangleIcon, CheckIcon, XIcon } from '../illustrations';
import { useKeyPress } from '@/hooks';

export const Notifications = () => {
  const { notifications, dismissNotification, options } = useNotifications();

  const getPositionClassName = (
    position: NotificationPosition = NotificationPosition.BOTTOM_CENTER,
  ) => {
    let className = '';
    if (position === NotificationPosition.TOP_LEFT) {
      className += ' top-5 left-5';
    } else if (position === NotificationPosition.TOP_CENTER) {
      className += ' top-5 left-[50%] transform translate-x-[-50%]';
    } else if (position === NotificationPosition.TOP_RIGHT) {
      className += ' top-5 right-5';
    } else if (position === NotificationPosition.BOTTOM_LEFT) {
      className += ' bottom-5 left-5';
    } else if (position === NotificationPosition.BOTTOM_CENTER) {
      className += ' bottom-5  left-[50%] transform translate-x-[-50%]';
    } else if (position === NotificationPosition.BOTTOM_RIGHT) {
      className += ' bottom-5 right-5';
    }

    return className;
  };

  // TODO:
  // const escapePressed = useKeyPress('Escape');

  // useEffect(() => {
  //   if (escapePressed) {
  //     dismissNotification();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [escapePressed]);

  if (notifications.length < 1) return null;
  return (
    <Portal wrapperId="toast-wrapper">
      <div
        className={`max-h-16 md:max-h-80 overflow-y-hidden gap-4 flex-col-reverse flex fixed  w-full max-w-xs lg:max-w-lg z-50  ${getPositionClassName(
          options.position,
        )}`}
      >
        {notifications.map((notification) => (
          <NotificationComponent
            key={notification.id}
            notification={notification}
            onDismiss={dismissNotification}
          />
        ))}
      </div>
    </Portal>
  );
};

type NotificationComponentProps = {
  notification: Omit<Notification, 'duration'>;
  onDismiss: (id: string) => void;
};

export const NotificationComponent = ({
  notification,
  onDismiss,
}: NotificationComponentProps) => {
  const getToastClassName = (
    type: NotificationType = NotificationType.INFO,
  ) => {
    let className =
      'relative flex items-center justify-between p-4 mb-4 dark:text-slate-500 dark:bg-white shadow text-slate-400 bg-slate-950 ';

    if (type === NotificationType.SUCCESS) {
      className += ' bg-green-50';
    } else if (type === NotificationType.ERROR) {
      className += ' bg-red-50';
    } else if (type === NotificationType.WARNING) {
      className += ' bg-orange-50';
    }

    return className;
  };

  const getIconClassName = (type: NotificationType = NotificationType.INFO) => {
    let className =
      'inline-flex items-center justify-center flex-shrink-0 w-8 h-8';

    if (type === NotificationType.SUCCESS) {
      className +=
        ' text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200';
    } else if (type === NotificationType.ERROR) {
      className += ' text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200';
    } else if (type === NotificationType.WARNING) {
      className +=
        ' text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200';
    }

    return className;
  };
  return (
    <div
      key={notification.id}
      id={notification.id}
      className={`${getToastClassName(
        notification.type,
      )} dark:text-slate-400 dark:divide-slate-700 space-x-4 divide-x divide-slate-200 dark:bg-slate-800  
        `}
      role="alert"
    >
      <div className="flex justify-normal items-center">
        <div className={getIconClassName(notification.type)}>
          {notification.type === NotificationType.SUCCESS && (
            <CheckIcon className="w-5 h-5" strokeWidth={3} />
          )}
          {notification.type === NotificationType.ERROR && (
            <XIcon className="w-5 h-5" strokeWidth={3} />
          )}
          {notification.type === NotificationType.WARNING && (
            <AlertTriangleIcon className="w-5 h-5" strokeWidth={3} />
          )}
          <span className="sr-only">{notification.type} icon</span>
        </div>
        <div className="ml-3 text-sm font-normal text-slate-200 dark:text-slate-800">
          {notification.message || 'Unknown notification'}
        </div>
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white/20 text-slate-400 hover:text-slate-900 focus:ring-2 focus:ring-slate-300 p-1.5 hover:bg-slate-100 inline-flex h-8 w-8 dark:text-slate-500 dark:hover:text-white dark:bg-slate-800/20 dark:hover:bg-slate-700"
        onClick={() => onDismiss(notification.id)}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <XIcon className="w-5 h-5" strokeWidth={3} />
      </button>
    </div>
  );
};

//Path: src/components/notifications/notifications.tsx
