import { Icon, LoaderIcon } from '@/components/illustrations';
import Portal from '@/hoc/Portal';
import React from 'react';
import { SplashLoaderProps } from './types';


export const SplashLoaderComponent = ({
  id = 'app-splash-loader',
  isActive,
  onExit,
  children
}: SplashLoaderProps) => {
  const handleClick = () => {
    if (onExit) onExit();
  };
  return (
    <Portal>
      <div
        className={`fixed top-0 left-0 z-[999] bg-slate-50 dark:bg-slate-900 w-full h-screen overflow-y-hidden ${
          isActive ? 'block' : 'hidden '
        } transition-opacity duration-100 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
        id={`${id}-splash-loader`}
        aria-labelledby={`${id}-label`}
        aria-hidden="true"
        onClick={handleClick}
        data-splash-state={`${isActive ? 'open' : 'close'}`}
      >
        {children ? (children) :(
        <div
          className={`block relative left-[50%] top-[50%] w-[100px] h-[100px] -mt-[50px] -ml-[50px] animate-spin duration-1000 z-[1000]`}
        >
          <LoaderIcon />
        </div>
        )}
      </div>
    </Portal>
  );
};
