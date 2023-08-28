import Axios from 'axios';

import { API_URL } from '@/config/constants';
import { NotificationType, notificationsStore } from '@/stores/notifications';

export const apiClient = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    notificationsStore.getState().showNotification({
      type: NotificationType.ERROR,
      title: 'Error',
      duration: 5000,
      message,
    });

    return Promise.reject(error);
  },
);
//Path: src/lib/api-client.ts