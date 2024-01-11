import React from 'react';
import { IconBlockScale, IconGrow } from '@/components/loading';
import { SplashScreenProps } from './types';

export const SplashScreen = ({ id = 'app-splash' }: SplashScreenProps) => {
  return (
    <>
      <div
        className={
          'fixed inset-0 z-[9999] bg-slate-50 dark:bg-slate-950 w-full h-screen overflow-y-hidden'
        }
        id={`${id}-splash-loader`}
        aria-labelledby={`${id}-label`}
        aria-hidden="true"
        data-splash-state={`'open'`}
      >
        <div
          className={`block relative left-[50%] top-[50%] w-[100px] h-[100px] -mt-[50px] -ml-[50px]`}
        >
          <IconBlockScale />
          <IconGrow />
        </div>
      </div>
    </>
  );
};
export default SplashScreen;

// Path: /Users/mshittu/programming-projects/javascript/react/media-fe/src/components/blocks/splash-screen/splash-screen.tsx
