import React from 'react';
import { AvatarIcon, PhotoIcon } from '@/components/illustrations/icons/others';
import {
  LoadingAvatar,
  LoadingSubheading,
  LoadingHeadingName,
  LoadingText,
  LoadingHeading,
} from '@/components/loading';
export const StorylineMiniPopupLoadingPlaceholder = () => {
  return (
    <>
      <div>
        {/* <h1 className="text-xl font-semibold my-2">{summary}</h1> */}

        <LoadingHeading />
        <div className="flex space-x-2 text-gray-400 text-sm">
          <LoadingSubheading />
        </div>
        <div className="flex space-x-2 text-gray-400 text-sm my-3">
          <LoadingSubheading />
        </div>
        <div className="border-t-2 "></div>
        <div className="flex justify-between">
          <div className="my-2">
            <p className="font-semibold text-base mb-2">
              <LoadingHeadingName />
            </p>
            <div className="flex space-x-2">
              <LoadingAvatar className="w-6 h-6 rounded-full text-slate-200 dark:text-slate-700" />
              <LoadingAvatar className="w-6 h-6 rounded-full text-slate-200 dark:text-slate-700" />
            </div>
          </div>
          <div className="my-2">
            <p className="font-semibold text-base mb-2">
              <LoadingHeadingName />
            </p>
            <div className="text-base text-gray-400 font-semibold">
              <LoadingSubheading />
            </div>
          </div>
        </div>
      </div>
      <LoadingText />
      {/* <h1>{`StoryID: ${id} Storyline id : ${storyline_id}`}</h1> */}
      {/* <TrendingListItem key={trend.title} {...trend} /> */}
    </>
  );
};
