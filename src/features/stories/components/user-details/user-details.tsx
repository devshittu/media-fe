import React from 'react';
import Image from 'next/image';

export type UserDetailsProps = {
  name: string;
  organization: string;
  pub_datetime: string;
};

export const UserDetails = ({
  name,
  organization,
  pub_datetime,
}: UserDetailsProps) => {
  return (
    <div className="inline-flex items-center w-full">
      <div className="flex items-center space-x-4 w-full">
        <div className="flex-shrink-0">
          <Image
            width="48"
            height="48"
            className="rounded-md w-14 h-14"
            src={`https://dummyimage.com/104x104`}
            alt="Avatar image"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm lg:text-base font-semibold text-slate-900 truncate dark:text-slate-100">
            {name || `John Doe`}
          </h3>
          <p className="text-sm text-slate-500 truncate dark:text-slate-400">
            {organization || `Correspondence, Reuter`}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-medium text-slate-700 dark:text-slate-400">
          <time className="rounded-lg">{pub_datetime}</time>
        </div>
      </div>
    </div>
  );
};

//Path: src/features/stories/components/user-details/user-details.tsx
