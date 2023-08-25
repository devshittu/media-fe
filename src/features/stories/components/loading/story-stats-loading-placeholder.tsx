import { Icon } from '@/components/illustrations';
import { AvatarIcon, PhotoIcon } from '@/components/illustrations/icons/others';
import {
  LoadingPhoto,
  LoadingParagraph,
  LoadingAvatar,
  LoadingSubheading,
  LoadingHeadingName,
} from '@/components/loading';
import { UserItemLoadingPlaceholder } from '@/features/auth';
import React from 'react';

export const StoryStatsLoadingPlaceholder = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-24 mb-2.5"></div>
        <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700"></div>
      </div>
      <div>
        <div className="h-2.5 bg-slate-300 dark:bg-slate-700 w-12"></div>
      </div>
    </div>
  );
};

//Path: src/features/stories/components/story-list-item-loading-placeholder.tsx
