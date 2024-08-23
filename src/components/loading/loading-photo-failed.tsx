'use client';
import React, { forwardRef } from 'react';
import { CloudOffIcon, Icon } from '../illustrations';

type LoadingPhotoFailedProps = {
  className?: string;
};

export const LoadingPhotoFailed = forwardRef<
  HTMLDivElement,
  LoadingPhotoFailedProps
>(
  (
    { className = '', ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-center w-full h-full bg-slate-300 dark:bg-slate-700 ${className}`}
        {...props}
      >
        <Icon
          icon={<CloudOffIcon />}
          className="w-12 h-12 text-slate-200 dark:text-slate-600"
        />
      </div>
    );
  },
);

LoadingPhotoFailed.displayName = 'LoadingPhotoFailed';

// Path: src/components/loading/loading-photo-failed.tsx
