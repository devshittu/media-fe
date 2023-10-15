import Axios, { AxiosError } from 'axios';
import Router, { useRouter } from 'next/router';

import { API_URL } from '@/config/constants';

import { NotificationType, notificationsStore } from '@/stores/notifications';
import { AuthStore } from '@/stores/auth';
import {
  URI_AUTH_LOGOUT,
  URI_AUTH_TOKEN_REFRESH,
} from '@/config/api-constants';
import { signout, useSignout } from '@/features/auth';

import getConfig from 'next/config';

// Get our configuration of our runtimes
const {serverRuntimeConfig, publicRuntimeConfig } = getConfig();

// Use the correct url depending on if it's server or public
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl;


export const apiClient = Axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  requiresAuth: true,

  // Add withCredentials here if you want it to be the default for all requests
  // withCredentials: true,
});

const handleLogoutAndRedirect = async () => {
  try {
    await signout();
  } catch (error) {
    console.error('Error during signout:', error);
  } finally {
    AuthStore.getState().setAccessToken(null);
    Router.push('/');
  }
};

apiClient.interceptors.request.use((config) => {
  if (config.requiresAuth) {
    // Check if requiresAuth flag is set
    const token = AuthStore.getState().accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Set withCredentials for requests that require authentication
    config.withCredentials = true;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // If 401 response and not a retry request, try to refresh token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== URI_AUTH_TOKEN_REFRESH && // Ensure we're not retrying the refresh token endpoint itself
      originalRequest.url !== URI_AUTH_LOGOUT // Ensure we're not retrying the signout endpoint itself
    ) {
      const currentAccessToken = AuthStore.getState().accessToken;

      // If there's no access token in the store, handle signout and exit
      if (!currentAccessToken) {
        console.error('No access token available.');
        handleLogoutAndRedirect();
        return; // Exit the interceptor
      }

      originalRequest._retry = true;

      try {
        const res = await apiClient.post(URI_AUTH_TOKEN_REFRESH);
        const newAccessToken = res.data.access_token;
        AuthStore.getState().setAccessToken(newAccessToken);
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        return apiClient(originalRequest);
      } catch (refreshError: any) {
        console.error(
          'Refresh token error:',
          refreshError?.response?.data || refreshError.message || refreshError,
        );
        AuthStore.getState().setAccessToken(null);
        handleLogoutAndRedirect();
      }
    } else if (originalRequest._retry) {
      // If it's a retry request and still fails, just reject the promise
      return Promise.reject(error);
    }

    const message = error.response?.data?.message || error.message;

    notificationsStore.getState().showNotification({
      type: NotificationType.ERROR,
      title: 'Error',
      duration: 5000,
      message,
    });

    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  },
);

//Path: src/lib/api-client.ts
