import Image from 'next/image';
import React from 'react';
import { AccountListItemProps } from './types';
import { Button } from '@/components/button';

export const AccountListItem = ({ account }: AccountListItemProps) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Image
            width="48"
            height="48"
            className="rounded-md w-14 h-14"
            src={account.displayPhotoUrl}
            alt="Avatar image"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm lg:text-base font-semibold text-slate-900 truncate dark:text-slate-100">
            {account.displayName}
          </p>
          <p className="text-sm text-slate-500 truncate dark:text-slate-400">
            {`@` + account.username}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <Button className="rounded-lg">Subscribe</Button>
        </div>
      </div>
    </li>
  );
};
