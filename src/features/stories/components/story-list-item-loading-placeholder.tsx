import { Icon } from '@/components/illustrations';
import { AvatarIcon, PhotoIcon } from '@/components/illustrations/icons/others';
import React from 'react';

export const StoryListItemLoadingPlaceholder = () => {
  return (
    <>
      <article
        className={`animate-pulse flex p-4 md:p-8 lg:p-12 flex-col w-full lg:min-w-[640px]`}
      >
        <div className="mb-4">
          <div className="h-2.5 bg-slate-200  dark:bg-slate-700 w-48 mb-4"></div>
          <div className="h-2 bg-slate-200  dark:bg-slate-700 mb-2.5"></div>
          <div className="h-2 bg-slate-200  dark:bg-slate-700 mb-2.5"></div>
          <div className="h-2 bg-slate-200  dark:bg-slate-700 mb-2.5"></div>
          <div className="flex items-center w-full space-x-4 max-w-[360px]">
            <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-full"></div>
            <div className="h-2.5 bg-slate-200 dark:bg-slate-700 w-80"></div>
            <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-full"></div>
          </div>
        </div>
        <div className="flex items-center justify-center h-48 mb-4 bg-slate-300 rounded dark:bg-slate-700">
          <Icon
            icon={<PhotoIcon />}
            className="w-12 h-12 text-slate-200 dark:text-slate-600"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700"></div>
          </div>
          <div>
            <div className="h-2.5 bg-slate-300 dark:bg-slate-700 w-12"></div>
          </div>
        </div>
        <div className="flex items-center mt-4 space-x-3">
          <Icon
            icon={<AvatarIcon />}
            className="text-slate-200 w-14 h-14 dark:text-slate-700"
          />
          <div>
            <div className="h-2.5 bg-slate-200  dark:bg-slate-700 w-32 mb-2"></div>
            <div className="w-48 h-2 bg-slate-200  dark:bg-slate-700"></div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </article>
    </>
  );
};
