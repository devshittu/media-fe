import Axios from 'axios';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/constants';

import { NotificationType, notificationsStore } from '@/stores/notifications';
import { AuthStore } from '@/stores/auth';

export const apiClient = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': '*',
  },
});

apiClient.interceptors.request.use((config) => {
  // if (!config.noAuth) {
  //   // Check if noAuth flag is set
  //   const token = AuthStore.getState().accessToken;
  //   if (token) {
  //     config.headers['Authorization'] = `Bearer ${token}`;
  //   }
  // }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // If 401 response and not a retry request, try to refresh token
    // if (
    //   error.response &&
    //   error.response.status === 401 &&
    //   !originalRequest._retry
    // ) {
    //   originalRequest._retry = true;

    //   try {
    //     const res = await apiClient.post('/auth/token/refresh/'); // The browser will automatically include the refresh token cookie
    //     const newAccessToken = res.data.access;
    //     AuthStore.getState().setAccessToken(newAccessToken); // Update the access token in Zustand store
    //     originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
    //     return apiClient(originalRequest); // Retry the original request with the new token
    //   } catch (refreshError) {
    //     const error = refreshError as Error;
    //     console.error('Refresh token error:', error.message);
    //     // console.error('Refresh token error:', refreshError.response || refreshError); // Log the error response for debugging
    //     AuthStore.getState().setAccessToken(null); // Clear access token in Zustand store
    //     // Handle logout or redirect to login page

    //     const router = useRouter();
    //     router.replace( '/');

    //     console.error('apiClient://', refreshError);
    //   }
    // }
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
