import React from 'react';
import { Link } from '@/components/labs/typography';
import {
  EyeIcon,
  MessageSquareIcon,
  ExternalLinkIcon,
} from '@/components/illustrations';

type StoryStatsProps = {
  viewCount: number;
  commentCount: number;
};

export const StoryStats: React.FC<StoryStatsProps> = ({
  viewCount,
  commentCount,
}) => {
  return (
    <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-slate-100 dark:border-slate-800 mt-auto w-full">
      {/* Link to "Learn more" */}
      <Link href="/" className="text-cyan-500 inline-flex items-center">
        <span className="text-base">Learn more</span>
        <ExternalLinkIcon className="w-4 h-4 ml-2" />
      </Link>

      {/* Number of views */}
      <span className="text-slate-400 mr-3 inline-flex items-center ml-auto leading-none text-base pr-3 py-1 border-r-2 border-slate-200 dark:border-slate-700">
        <EyeIcon className="w-4 h-4 mr-1" />
        {viewCount}
      </span>

      {/* Number of comments */}
      <span className="text-slate-400 inline-flex items-center leading-none text-base">
        <MessageSquareIcon className="w-4 h-4 mr-1" />
        {commentCount}
      </span>
    </div>
  );
};

//Path: src/features/stories/components/story-media/story-stats.tsx
