import React from 'react';
import { AuthUserTileProps } from '../../types';
import Image from 'next/image';
import { SettingsIcon } from '@/components/illustrations';
import { AuthUserContextMenu } from '../context-menu/auth-user-context-menu';
import { ControlledPopper } from '@/components/blocks/popup';
import { LoadingAvatar } from '@/components/loading';
import { useAuth } from '@/stores/auth';

export const AuthUserTile = ({
  actionButtonText,
  closeIcon = <SettingsIcon className="w-6 h-6" strokeWidth={2.5} />,
}: AuthUserTileProps) => {
  const auth = useAuth();
  const defaultAvatar = '/avatars/avatar.svg';
  const name = auth.authUserDetails?.name || 'Loading...';
  const subName = auth.authUserDetails?.username || 'Loading...';
  const description = auth.authUserDetails?.bio || 'Loading...';
  const profileImageSrc = auth.authUserDetails?.avatar_url || defaultAvatar;

  return (
    <>
      <div
        className="w-full max-w-xs py-4 text-slate-500x bg-whitex rounded-lgx shadowx dark:bg-slate-800x dark:text-slate-400x"
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
            <p className="text-base font-normal text-slate-500 dark:text-slate-400 whitespace-pre-wrap">
              {description}
            </p>
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
