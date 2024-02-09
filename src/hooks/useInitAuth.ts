import { useCallback, useEffect, useRef } from 'react';
import { AuthStore } from '@/stores/auth';
import { handleTokenRefresh, calculateBufferStatus } from '@/utils';
import { DEFAULT_BUFFER_START_PERCENTAGE } from '@/config/constants';

export const useInitAuth = () => {
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    // Using useCallback to ensure these functions have stable references
    const initializeAuth = useCallback(() => {
      const { initializeAuth, isRefreshingToken } = AuthStore.getState();

      if (!isRefreshingToken) {
        initializeAuth();
      }
    }, []);

    const scheduleTokenRefresh = useCallback((): void => {
      const { accessToken, expiresAt } = AuthStore.getState();

      if (!accessToken || !expiresAt) {
        // console.log(`authdebug: no existing accessToken or expiresAt is null`, accessToken);
        return;
      }

      const { withinBuffer, timeUntilBuffer } = calculateBufferStatus(expiresAt, DEFAULT_BUFFER_START_PERCENTAGE); // Example buffer: 50%
      // console.log(`authdebug: withinBuffer: ${withinBuffer}, timeUntilBuffer: ${timeUntilBuffer}`, accessToken);

      if (withinBuffer) {
        // console.log(`authdebug: withinBuffer and triggering a refresh`);
        handleTokenRefresh();
      } else {
        // console.log(`authdebug: scheduling a refresh in ${timeUntilBuffer} ms`);
        // Clear any existing timeout to avoid duplicate scheduling
        if (refreshTimeoutRef.current) {
          clearTimeout(refreshTimeoutRef.current);
        }
        refreshTimeoutRef.current = setTimeout(scheduleTokenRefresh, timeUntilBuffer); // Convert to milliseconds
      }
    }, []);

    useEffect(() => {
      initializeAuth();
      // Since initializeAuth is stabilized by useCallback, it won't cause this effect to re-run unnecessarily
    }, [initializeAuth]);

    useEffect(() => {
      scheduleTokenRefresh();
      // Cleanup function to clear the timeout when the component unmounts or the effect dependencies change
      return () => {
        if (refreshTimeoutRef.current) {
          clearTimeout(refreshTimeoutRef.current);
        }
      };
      // scheduleTokenRefresh is stabilized by useCallback, preventing unnecessary effect executions
    }, [scheduleTokenRefresh]);
};

// Path: media-fe/src/hooks/useInitAuth.ts



  // const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // useEffect(() => {
  //   const { initializeAuth, isRefreshingToken } = AuthStore.getState();

  //   if (!isRefreshingToken) {
  //     initializeAuth();
  //   }
  // }, []);

  // useEffect(() => {
  //   const scheduleTokenRefresh = (): void => {
  //     const { accessToken, expiresAt } = AuthStore.getState();

  //     if (!accessToken || !expiresAt) {
  //       console.log(
  //         `authdebug: no existing accessToken or expiresAt is null`,
  //         accessToken,
  //       );
  //       return;
  //     }

  //     const { withinBuffer, timeUntilBuffer } = calculateBufferStatus(
  //       expiresAt,
  //       50,
  //     ); // Example buffer: 50%
  //     console.log(
  //       `authdebug: withinBuffer: ${withinBuffer}, timeUntilBuffer: ${timeUntilBuffer}`,
  //       accessToken,
  //     );

  //     if (withinBuffer) {
  //       console.log(`authdebug: withinBuffer and triggering a refresh`);
  //       handleTokenRefresh();
  //     } else {
  //       console.log(`authdebug: scheduling a refresh in ${timeUntilBuffer} ms`);
  //       // Clear any existing timeout to avoid duplicate scheduling
  //       if (refreshTimeoutRef.current) {
  //         clearTimeout(refreshTimeoutRef.current);
  //       }
  //       refreshTimeoutRef.current = setTimeout(
  //         scheduleTokenRefresh,
  //         timeUntilBuffer,
  //       ); // Convert to milliseconds
  //     }
  //   };

  //   scheduleTokenRefresh();

  //   return () => {
  //     // Cleanup on unmount or when the component re-renders
  //     if (refreshTimeoutRef.current) {
  //       clearTimeout(refreshTimeoutRef.current);
  //     }
  //   };
  // }, []);
