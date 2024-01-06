import React from 'react';
import { IconBlockScale, IconGrow, LoadingFallingGlyph, LoadingSplash } from '@/components/loading';
import Portal from '@/hoc/Portal';
import { AppLogoIcon, Icon } from '@/components/illustrations';

export const SplashScreen = ({ id = 'app-splash' }: { id?: string }) => {

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
            <IconBlockScale/>
        <IconGrow
        />
          </div>
        </div>
      </>
  );
};
export default SplashScreen;

// Path: src/components/blocks/splash-loader/splash-loader.tsx
