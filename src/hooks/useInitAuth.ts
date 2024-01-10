import { useEffect } from 'react';
import { AuthStore } from '@/stores/auth';

export const useInitAuth = () => {
  useEffect(() => {
    const { initializeAuth, isRefreshingToken } = AuthStore.getState();

    if (!isRefreshingToken) {
      initializeAuth();
    }
  }, []);
};

// Path: media-fe/src/hooks/useInitAuth.ts
