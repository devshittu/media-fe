import React from 'react';
import { Link } from '@/components/labs/typography';
import {
  EyeIcon,
  MessageSquareIcon,
  ExternalLinkIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  ListIcon,
} from '@/components/illustrations';
import { Button } from '@/components/button';

type StoryStatsProps = {
  viewCount: number;
  commentCount: number;
  likesCount: number;
  dislikesCount: number;
  storylinesCount: number;
};

export const StoryStats = ({
  viewCount,
  commentCount,
  likesCount,
  dislikesCount,
  storylinesCount,
}: StoryStatsProps) => {
  const handleStorylinePop = () => alert('Storyline');
  return (
    <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-slate-100 dark:border-slate-800 mt-auto w-full">
      {/* Link to "Learn more" */}
      <Link href="/" className="text-cyan-500 inline-flex items-center">
        <span className="text-base">Learn more</span>
        <ExternalLinkIcon className="w-4 h-4 ml-2" />
      </Link>

      {/* Number of views */}
      <span className="text-slate-400 mr-3 inline-flex items-center ml-auto leading-none text-base pr-3 py-1 border-r-2 border-slate-200 dark:border-slate-700">
        <Link href={`/storylines/${storylinesCount}`} target="_blank">
          <EyeIcon className="w-4 h-4 mr-1" />
          {viewCount || 0}
        </Link>
      </span>

      {/* Number of storylines */}
      <Button onClick={handleStorylinePop}>
        <span className="text-slate-400  mr-3 inline-flex items-center leading-none text-base pr-3 py-1 border-r-2 border-slate-200 dark:border-slate-700">
          <ListIcon className="w-4 h-4 mr-1" />
          {storylinesCount || 0}
        </span>
      </Button>
      {/* Number of comments */}
      <span className="text-slate-400  mr-3 inline-flex items-center leading-none text-base pr-3 py-1 border-r-2 border-slate-200 dark:border-slate-700">
        <MessageSquareIcon className="w-4 h-4 mr-1" />
        {commentCount || 0}
      </span>
      {/* Number of likes */}
      <span className="text-slate-400  mr-3 inline-flex items-center leading-none text-base pr-3 py-1 border-r-2 border-slate-200 dark:border-slate-700">
        <ThumbsUpIcon className="w-4 h-4 mr-1" />
        {likesCount || 0}
      </span>
      {/* Number of dislikes */}
      <span className="text-slate-400 inline-flex items-center leading-none text-base">
        <ThumbsDownIcon className="w-4 h-4 mr-1" />
        {dislikesCount || 0}
      </span>
    </div>
  );
};

//Path: src/features/stories/components/story-media/story-stats.tsx
