import { useEffect } from 'react';
import { useSplashLoader } from '@/stores/splash-loader';

export const useInitialSplashLoader = () => {
  const { playSplashLoader } = useSplashLoader();

  useEffect(() => {
    playSplashLoader({ initialVisit: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
// Path: src/components/blocks/splash-loader/hooks/useInitialSplashLoader.ts