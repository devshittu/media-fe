import {
  LoadingAvatar,
  LoadingHeadingName,
  LoadingSubheading,
} from '@/components/loading';
import React from 'react';
import { UserItemLoadingPlaceholder } from './user-item-loading-placeholder';

export const UserListLoadingPlaceholder = () => {
  return (
    <>
      <UserItemLoadingPlaceholder />
      <UserItemLoadingPlaceholder />
      <UserItemLoadingPlaceholder />
    </>
  );
};

//Path: src/features/auth/components/loading/user-item-loading-placeholder.tsx
