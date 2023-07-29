import React from 'react';
import Image from 'next/image';

export type UserDetailsProps = {
  name: string;
  organization: string;
};

export const UserDetails = ({ name, organization }: UserDetailsProps) => {
  return (
    <div className="inline-flex items-center">
      <div className="flex items-center space-x-4">
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
          <p className="text-sm lg:text-base font-semibold text-slate-900 truncate dark:text-slate-100">
            {name || `John Doe`}
          </p>
          <p className="text-sm text-slate-500 truncate dark:text-slate-400">
            {organization || `Correspondence, Reuter`}
          </p>
        </div>
        {/* <div className="inline-flex items-center text-base font-semibold text-slate-900 dark:text-white">
          <Button className="rounded-lg">Subscribe</Button>
        </div> */}
      </div>
    </div>
  );
};

//Path: src/features/stories/components/user-details/user-details.tsx
