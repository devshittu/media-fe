import {
  LoadingAvatar,
  LoadingHeadingName,
  LoadingSubheading,
} from '@/components/loading';
import React from 'react';

export const UserItemLoadingPlaceholder = () => {
  return (
    <div className="flex items-center mt-4 space-x-3">
      <LoadingAvatar />
      <div>
        <LoadingHeadingName />
        <LoadingSubheading />
      </div>
    </div>
  );
};

//Path: src/features/auth/components/loading/user-item-loading-placeholder.tsx
