import Axios from 'axios';
import { NotificationType, notificationsStore } from '@/stores/notifications';
import { AuthStore } from '@/stores/auth';
import {
  URI_AUTH_LOGOUT,
  URI_AUTH_TOKEN_REFRESH,
} from '@/config/api-constants';
import getConfig from 'next/config';
import { handleLogoutAndRedirect, handleTokenRefresh } from '@/utils';
import { ErrorCode } from '@/config/error-codes';

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
  requiresAuth: false,

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

// interface QueueItem {
//   resolve: (token: string) => void; // Accepts string only
//   reject: (error: any) => void;
// }

// let failedQueue: QueueItem[] = [];

// const processQueue = (error: any, token: string | null = null): void => {
//   failedQueue.forEach((prom) => {
//     if (error || token === null) {
//       prom.reject(error || new Error("Token refresh failed"));
//     } else {
//       prom.resolve(token); // token is guaranteed to be non-null here
//     }
//   });

//   failedQueue = [];
// };

// apiClient.interceptors.request.use(
//   async (config) => {
//     const { accessToken, isRefreshingToken } = AuthStore.getState();

//     if (isRefreshingToken) {
//       try {
//         const tokenPromise = new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         });

//         const newToken = await tokenPromise;
//         config.headers['Authorization'] = 'Bearer ' + newToken;
//         return config;
//       } catch (error) {
//         return Promise.reject(error);
//       }
//     } else {
//       if (accessToken) {
//         config.headers['Authorization'] = `Bearer ${accessToken}`;
//       }
//       return config;
//     }
//   },
//   (error) => Promise.reject(error),
// );

// apiClient.interceptors.response.use(
//   (response) => response, // Success responses pass through
//   async (error) => {
//     const originalRequest = error.config;
//     const {
//       accessToken,
//       expiresAt,
//       isRefreshingToken,
//       setIsRefreshingToken,
//       setAccessToken,
//     } = AuthStore.getState();

//     // Check if error is due to expired token
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       // Check if the token is within the buffer period for refresh and not already refreshing
//       if (!isRefreshingToken && calculateBufferStatus(expiresAt, 15)) {
//         // Assuming 15% as buffer
//         setIsRefreshingToken(true);
//         originalRequest._retry = true; // Mark the request for retry

//         try {
//           const response = await refreshToken(); // Implement this to actually refresh the token
//           const newAccessToken = response?.access_token ?? null; // Ensures string or null
//           const newAccessTokenExpiresAt =
//             response?.access_token_expires_at ??
//             DEFAULT_ACCESS_TOKEN_KEY_EXPIRES_AT; // Ensures number or null

//           // Update the store with the new token and expiry time
//           setAccessToken(newAccessToken, newAccessTokenExpiresAt);
//           AuthStore.getState().setIsRefreshingToken(false);

//           // Update the authorization header for the original request
//           originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//           processQueue(null, newAccessToken); // Process the queue with the new token
//           // return apiClient(originalRequest);
//           return apiClient(originalRequest); // Retry the original request with the new token
//         } catch (refreshError) {
//           processQueue(refreshError, null); // Process the queue with the error

//         console.error('Failed to refresh token:', refreshError);
//         setIsRefreshingToken(false);
//         AuthStore.getState().clearAuth();
//         // Router.push('/auth/signin');
//           return Promise.reject(refreshError); // Refresh failed, reject the promise
//         }
//       } else if (isRefreshingToken) {
//         // If the token is already refreshing, queue this request
//         return new Promise((resolve, reject) => {
//           failedQueue.push({
//             resolve: (token: string) => {
//               originalRequest.headers['Authorization'] = `Bearer ${token}`;
//               resolve(apiClient(originalRequest));
//             },
//             reject,
//           });
//         });
//       }
//     }

//     // For errors not related to token expiration, just reject the promise
//     return Promise.reject(error);
//   },
// );

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
