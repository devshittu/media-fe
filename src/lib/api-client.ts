import Axios from 'axios';
import { NotificationType, notificationsStore } from '@/stores/notifications';
import { AuthStore } from '@/stores/auth';
import {
  URI_AUTH_LOGOUT,
  URI_AUTH_TOKEN_REFRESH,
} from '@/config/api-constants';
import getConfig from 'next/config';
import { handleLogoutAndRedirect, handleTokenRefresh, signOut } from '@/utils';
import { ErrorCode } from '@/config/error-codes';
import Router from 'next/router';

// Get our configuration of our runtimes
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

// Use the correct url depending on if it's server or public
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl;

export const refresherApiClient = Axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },

  // Add withCredentials here if you want it to be the default for all requests
  withCredentials: true,
});
export const apiClient = Axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  requiresAuth: true,

  // Add withCredentials here if you want it to be the default for all requests
  // withCredentials: true,
});

export const apiClientAuth = Axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  requiresAuth: true,
});

//Path: src/lib/api-client.ts

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
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const errorCode = error.response?.data?.error?.code;

    // Check if the URL contains the path for refresh token and logout endpoints
    const isRefreshTokenUrl = originalRequest.url.includes(
      URI_AUTH_TOKEN_REFRESH,
    );
    const isLogoutUrl = originalRequest.url.includes(URI_AUTH_LOGOUT);

    // Handle specific error code 'token_not_provided'
    if (errorCode === ErrorCode.TokenNotProvided) {
      // If the error is not from the refresh token or logout endpoints
      if (!isRefreshTokenUrl && !isLogoutUrl) {
        // Quietly refresh the token and retry the original request
        return handleTokenRefresh(originalRequest);
      } else {
        // If the error is from the refresh token or logout endpoints, handle logout
        handleLogoutAndRedirect();
        return Promise.reject(error);
      }
    }
    // if (
    //   (errorCode === ErrorCode.InvalidAccessToken ||
    //     errorCode === ErrorCode.AuthCredentialNotProvided ||
    //     errorCode === ErrorCode.TokenNotProvided) &&
    //   (!isRefreshTokenUrl || !isLogoutUrl)
    // ) {
    //   console.error(
    //     `(errorCode === ErrorCode.TokenNotProvided) = ${
    //       errorCode === ErrorCode.TokenNotProvided
    //     }
    //     !isRefreshTokenUrl || !isLogoutUrl`,
    //   );
    //   // Handle the specific case of 'token_not_provided' during token refresh
    //   originalRequest._retry = true; // Set the retry flag
    //   // const { setIsRefreshingToken } = AuthStore.getState();

    //   // setIsRefreshingToken(false);
    //   return handleTokenRefresh(originalRequest);
    //   // return Promise.reject(error);
    // }

    // // Check if the error is 'token_not_provided' during a token refresh operation
    // if (errorCode === ErrorCode.TokenNotProvided && isRefreshTokenUrl) {
    //   // Handle the specific case of 'token_not_provided' during token refresh
    //   AuthStore.getState().clearAuth();
    //   Router.push('/auth/signin');
    //   notificationsStore.getState().showNotification({
    //     type: NotificationType.ERROR,
    //     title: 'Session Expired',
    //     message: 'Please log in again.',
    //     duration: 5000,
    //   });
    //   return Promise.reject(error);
    // }

    // Prevent retrying the refresh token and logout endpoints
    if (isRefreshTokenUrl || isLogoutUrl) {
      console.error(
        `isRefreshTokenUrl || isLogoutUrl: stop redirecting to ${'another page'}`,
      );
      if (errorCode === ErrorCode.TokenNotProvided) {
        console.log('authdebug: Token not provided');
      }

      return Promise.reject(error);
    }

    // Check for expired access token error code
    // if code is "invalid_access_token" access token is invalid, return then retry refresh the token it means it is expired

    // Check for the error code
    // if the code returned is "auth_credential_not_provided",
    // it means the access token was not provided
    // then try using the refresh token to get a new access and retry
    // only after then and it is unsuccessful then,
    //redirect to the '/' for user name and password input from the user.
    // Provide helpful message

    // Check for expired or invalid access token error code
    if (
      (errorCode === ErrorCode.InvalidAccessToken ||
        errorCode === ErrorCode.AuthCredentialNotProvided) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Set the retry flag
      return handleTokenRefresh(originalRequest);
    }

    // Check for refresh token error code
    // if the code returned is "token_not_provided",
    // it means the refresh token was not provided
    // then redirect to the '/' for user name and password input from the user.
    // Provide helpful message
    // If it's a retry and still fails, or if the token was not provided, handle the error without retrying

    if (originalRequest._retry || errorCode === ErrorCode.TokenNotProvided) {
      handleLogoutAndRedirect();
      return Promise.reject(error);
    }

    let message = error.response?.data?.message || error.message;

    // Check for status code 400 and specific error structure
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.error &&
      error.response.data.error.detail
    ) {
      message = error.response.data.error.detail[0];
    }

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
