'use client'
import React, { forwardRef } from 'react';
import { CloudOffIcon, Icon } from '../illustrations';

type LoadingPhotoFailedProps = {
  bgHeight?: string; // Background height
  bgWidth?: string; // Background width
  iconHeight?: string; // Icon height
  iconWidth?: string; // Icon width
  className?: string;
};

export const LoadingPhotoFailed = forwardRef<
  HTMLDivElement,
  LoadingPhotoFailedProps
>(
  (
    {
      bgHeight = 'h-48', // Default height
      bgWidth = 'w-full', // Default width
      iconHeight = 'h-12', // Default icon height
      iconWidth = 'w-12', // Default icon width
      className = '',
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-center mb-4 bg-slate-300 rounded dark:bg-slate-700 ${bgHeight} ${bgWidth} ${className}`}
        {...props}
      >
        <Icon
          icon={<CloudOffIcon />}
          className={`${iconHeight} ${iconWidth} text-slate-200 dark:text-slate-600`}
        />
      </div>
    );
  },
);

LoadingPhotoFailed.displayName = 'LoadingPhotoFailed';

// src/components/loading/loading-photo-failed.tsx
