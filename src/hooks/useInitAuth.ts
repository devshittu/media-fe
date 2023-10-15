import { useEffect } from 'react';
import { AuthStore } from '@/stores/auth';

export const useInitAuth = () => {
  useEffect(() => {
    (async () => {
      await AuthStore.getState().initializeAuth();
    })();
  }, []);
};

// Path: media-fe/src/hooks/useInitializeStore.ts
