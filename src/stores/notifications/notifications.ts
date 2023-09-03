import { createStore, useStore } from 'zustand';

import { uid } from '@/utils/uid';
import { ToastPosition, ToastType } from '@/components/blocks/toast';

export enum NotificationType {
  SUCCESS = ToastType.SUCCESS,
  ERROR = ToastType.ERROR,
  WARNING = ToastType.WARNING,
  INFO = ToastType.INFO,
}

export enum NotificationPosition {
  TOP_LEFT = ToastPosition.TOP_LEFT,
  TOP_CENTER = ToastPosition.TOP_CENTER,
  TOP_RIGHT = ToastPosition.TOP_RIGHT,
  BOTTOM_RIGHT = ToastPosition.BOTTOM_RIGHT,
  BOTTOM_CENTER = ToastPosition.BOTTOM_CENTER,
  BOTTOM_LEFT = ToastPosition.BOTTOM_LEFT,
}
export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  duration?: number;
  message?: string;
};
export type NotificationOptions = {
  position?: NotificationPosition;
};

export type NotificationsStore = {
  notifications: Notification[];
  options: NotificationOptions;
  showNotification: (
    notification: Omit<Notification, 'id'>,
    options?: NotificationOptions,
  ) => void;
  dismissNotification: (id: string) => void;
};

export const notificationsStore = createStore<NotificationsStore>(
  (set, get) => ({
    notifications: [],
    options: { position: NotificationPosition.BOTTOM_CENTER }, // Default options
    showNotification: (
      notification: Omit<Notification, 'id'>,
      options?: NotificationOptions,
    ) => {
      const id = uid();
      set((state) => ({
        notifications: [...state.notifications, { ...notification, id }],
        options: options || state.options, // Update the options
      }));
      if (notification.duration) {
        setTimeout(() => {
          get().dismissNotification(id);
        }, notification.duration);
      }
    },
    dismissNotification: (id) => {
      set((state) => ({
        notifications: state.notifications.filter(
          (notification) => notification.id !== id,
        ),
      }));
    },
  }),
);

export const useNotifications = () => useStore(notificationsStore);

//Path: src/stores/notifications/notifications.ts
