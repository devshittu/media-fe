import React from 'react';
import { Link } from '@/components/labs/typography';
import {
  EyeIcon,
  MessageSquareIcon,
  ExternalLinkIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  ListIcon,
  ClockIcon,
} from '@/components/illustrations';
import { Button } from '@/components/button';
import { Story } from '../../types';
import { ControlledPopper } from '@/components/blocks/popup';
import { StorylineMiniPopup } from '@/features/storylines/components';
import { useStoryActionLogic } from '../../hooks';
import { useLikeStory } from '../../api/post-like-story';
import { StoryAction } from '../types';
import { useUnlikeStory } from '../../api/post-unlike-story';
import { useDislikeStory } from '../../api/post-dislike-story';
import { useUndislikeStory } from '../../api/post-undislike-story';

type StoryStatsProps = {
  story: Story;
};

export const StoryStats = ({ story }: StoryStatsProps) => {
  const {
    storylines_count,
    dislikes_count,
    likes_count,
    storyline_id,
    source_link,
    id,
    slug,
    has_liked,
    has_disliked,
  } = story;

  const { handleStoryAction: handleLikeStory, isLoading: isLikeLoading } =
    useStoryActionLogic(id, slug, StoryAction.LIKE, useLikeStory);

  const { handleStoryAction: handleUnlikeStory, isLoading: isUnlikeLoading } =
    useStoryActionLogic(id, slug, StoryAction.UNLIKE, useUnlikeStory);

  const { handleStoryAction: handleDislikeStory, isLoading: isDislikeLoading } =
    useStoryActionLogic(id, slug, StoryAction.DISLIKE, useDislikeStory);

  const {
    handleStoryAction: handleUndislikeStory,
    isLoading: isUndislikeLoading,
  } = useStoryActionLogic(id, slug, StoryAction.DISLIKE, useUndislikeStory);

  const handleStorylinePop = () => alert('Storyline');

  const viewCount = 1200;
  const commentCount = 6;
  // const closeIcon = <ClockIcon className="w-6 h-6 mr-2" strokeWidth={2.5} />;
  const closeIcon = (
    <div className="inline-flex items-center leading-none ">
      <ClockIcon className="w-6 h-6 mr-2" strokeWidth={2.5} />
      {storylines_count || 0}
    </div>
  );

  return (
    <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-slate-100 dark:border-slate-800 mt-auto w-full">
      {/* Link to "Read more" */}
      <Link
        href={source_link || '/'}
        className="text-cyan-500 inline-flex items-center"
      >
        <span className="text-base">Read more</span>
        <ExternalLinkIcon className="w-4 h-4 ml-2" />
      </Link>

      {/* Number of views */}
      <div className=" inline-flex items-center leading-none font-inter text-base md:text-lg lg:text-xl font-semibold text-slate-900 dark:text-slate-100  mr-3 ml-auto pr-3 py-1 border-r-2 border-slate-200 dark:border-slate-700">
        <Link
          href={`/storylines/${storyline_id}`}
          className="inline-flex items-center leading-none "
          target="_blank"
        >
          <EyeIcon className="w-6 h-6 mr-2" strokeWidth={2.5} />
          {viewCount || 0}
        </Link>
      </div>

      {/* Number of storylines */}

      <div className=" inline-flex items-center leading-none font-inter text-base md:text-lg lg:text-xl font-semibold text-slate-900 dark:text-slate-100  mr-3 pr-3 py-1 border-r-2 border-slate-200 dark:border-slate-700">
        <Link
          href={`#`}
          className="inline-flex items-center leading-none "
          target="_blank"
        >
          <ControlledPopper
            width={`max-w-xs sm:max-w-md`}
            placement="bottom"
            trigger={closeIcon}
            showOnHover
          >
            <>
              <div className=" text-slate-900 bg-white border-2 border-slate-600  shadow-md dark:shadow-slate-950 dark:bg-slate-950 dark:border-slate-400 dark:text-white md:p-8">
                <StorylineMiniPopup
                  key={`${id}-${slug}-mini-pop`}
                  identifier={`${slug}-mini-pop`}
                  story={story}
                />
              </div>
            </>
          </ControlledPopper>
        </Link>
      </div>
      {/* Number of comments */}
      <div className=" inline-flex items-center leading-none font-inter text-base md:text-lg lg:text-xl font-semibold text-slate-900 dark:text-slate-100  mr-3 pr-3 py-1 border-r-2 border-slate-200 dark:border-slate-700">
        <Link
          href={`#`}
          className="inline-flex items-center leading-none "
          target="_blank"
        >
          <MessageSquareIcon className="w-6 h-6 mr-2" strokeWidth={2.5} />
          {commentCount || 0}
        </Link>
      </div>
      {/* Number of likes */}
      {/* {`has_liked: ${has_liked} now would use ${ !has_liked ? 'handleLikeStory' : 'handleUnlikeStory' }`} */}
      <div className="inline-flex items-center leading-none text-base md:text-lg lg:text-xl font-semibold text-slate-900 dark:text-slate-100">
        <Button
          onClick={!has_liked ? handleLikeStory : handleUnlikeStory}
          className="inline-flex items-center leading-none "
        >
          <ThumbsUpIcon className="w-6 h-6 mr-2" strokeWidth={2.5} />
          {likes_count || 0}
        </Button>
      </div>
    </div>
  );
};

//Path: src/features/stories/components/story-media/story-stats.tsx
