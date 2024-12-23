'use client';
import React from 'react';
import { AuthUserTileProps } from '../../types';
import Image from 'next/image';
import { SettingsIcon } from '@/components/illustrations';
import { AuthUserContextMenu } from '../context-menu/auth-user-context-menu';
import { ControlledPopper } from '@/components/blocks/popup';
import { LoadingAvatar } from '@/components/loading';
import { useAuthStore } from '@/stores/auth';
import { useSession } from 'next-auth/react';

export const AuthUserTile = ({
  actionButtonText,
  closeIcon = <SettingsIcon className="w-6 h-6" strokeWidth={2.5} />,
}: AuthUserTileProps) => {
  const { data: session } = useSession();
  console.log('session (client side)', session);

  const role = session?.user?.role || undefined;
  // const {} =
  // const { user:authUserDetails } = session;
  const defaultAvatar = '/avatars/avatar.svg';
  const name = session?.user?.name || 'Loading...';
  const subName = session?.user?.username || 'Loading...';
  const description = session?.user?.bio || 'Loading...';
  const profileImageSrc = session?.user?.image || defaultAvatar;
  // const { authUserDetails } = useAuthStore();
  // const defaultAvatar = '/avatars/avatar.svg';
  // const name = authUserDetails?.display_name || 'Loading...';
  // const subName = authUserDetails?.username || 'Loading...';
  // const description = authUserDetails?.bio || 'Loading...';
  // const profileImageSrc = authUserDetails?.avatar_url || defaultAvatar;

  return (
    <>
      <div
        className="absolute bottom-0 left-0     w-full max-w-xs py-4 text-slate-500x bg-whitex rounded-lgx shadowx dark:bg-slate-800x dark:text-slate-400x"
        role="alert"
      >
        <div className="flex">
          {!profileImageSrc ? (
            <LoadingAvatar />
          ) : (
            <Image
              width={80}
              height={80}
              className="flex w-8 h-8 rounded-md"
              src={profileImageSrc || defaultAvatar}
              alt={`${name}'s image`}
              loading="lazy"
            />
          )}

          <div className="flex-1 ml-3 text-xl lg:text-xl whitespace-nowrap truncate">
            <span className="mb-1 text-xl font-semibold font-inter text-slate-900 dark:text-white text-ellipsis">
              {name}
            </span>

            <h3 className="mb-2 text-sm font-semibold">{subName}</h3>
            {session?.user?.bio && (
              <p className="text-base font-normal text-slate-500 dark:text-slate-400 whitespace-pre-wrap">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            // onClick={onCloseClick}
            className="flex ml-auto justify-center items-center flex-shrink-0 text-slate-700 hover:text-slate-900 focus:ring-2 focus:ring-slate-300 p-1.5  h-8 w-8 dark:text-slate-300 dark:hover:text-white"
            aria-label="Close"
          >
            <span className="sr-only">Settings</span>
            <ControlledPopper trigger={closeIcon}>
              <AuthUserContextMenu />
            </ControlledPopper>
          </button>
        </div>
      </div>
    </>
  );
};

// src/features/auth/components/blocks/auth-user-tile.tsx
