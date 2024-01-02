import React from 'react';
import { SplashLoaderComponent } from './splash-loader-component';
import { useSplashLoader } from '@/stores/splash-loader';

export const SplashLoader = () => {
  const { open, stopSplashLoader } = useSplashLoader();

  return (
    <>
      {open && (
        <>
          <SplashLoaderComponent
            id={'splash-loader'}
            isActive={open}
            onExit={stopSplashLoader}
          />
        </>
      )}
    </>
  );
};
export default SplashLoader;

// Path: src/components/blocks/splash-loader/splash-loader.tsx
