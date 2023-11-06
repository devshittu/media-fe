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
  const closeIcon = <ClockIcon className="w-6 h-6" strokeWidth={2.5} />;

  return (
    <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-slate-100 dark:border-slate-800 mt-auto w-full">
      {/* Link to "Learn more" */}
      <Link
        href={source_link || '/'}
        className="text-cyan-500 inline-flex items-center"
      >
        <span className="text-base">Learn more</span>
        <ExternalLinkIcon className="w-4 h-4 ml-2" />
      </Link>

      {/* Number of views */}
      <span className="text-slate-400 mr-3 inline-flex items-center ml-auto leading-none text-base pr-3 py-1 border-r-2 border-slate-200 dark:border-slate-700">
        <Link href={`/storylines/${storyline_id}`} target="_blank">
          <EyeIcon className="w-4 h-4 mr-1" />
          {viewCount || 0}
        </Link>
      </span>

      {/* Number of storylines */}
      <button
        type="button"
        // onClick={onCloseClick}
        className="flex ml-autox -mx-1.5x -my-1.5x bg-whitex justify-center items-center flex-shrink-0 text-slate-700 hover:text-slate-900 rounded-lgx focus:ring-2 focus:ring-slate-300 p-1.5 hover:bg-slate-100x  h-8 w-8 dark:text-slate-300 dark:hover:text-white dark:bg-slate-800x dark:hover:bg-slate-700x"
        aria-label="Close"
      >
        <span className="sr-only">Storyline</span>
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
      </button>
      <Button onClick={handleStorylinePop}>
        <span className="text-slate-400  mr-3 inline-flex items-center leading-none text-base pr-3 py-1 border-r-2 border-slate-200 dark:border-slate-700">
          <ListIcon className="w-4 h-4 mr-1" />
          {storylines_count || 0}
        </span>
      </Button>
      {/* Number of comments */}
      <span className="text-slate-400 mr-3 inline-flex items-center leading-none text-base pr-3 py-1 border-r-2 border-slate-200 dark:border-slate-700">
        <MessageSquareIcon className="w-4 h-4 mr-1" />
        {commentCount || 0}
      </span>
      {/* Number of likes */}
      {/* {`has_liked: ${has_liked} now would use ${ !has_liked ? 'handleLikeStory' : 'handleUnlikeStory' }`} */}
      <Button onClick={!has_liked ? handleLikeStory : handleUnlikeStory}>
        <span className="text-slate-400 inline-flex items-center leading-none text-base">
          <ThumbsUpIcon className="w-4 h-4 mr-1" />
          {likes_count || 0}
        </span>
      </Button>
      {/* Number of dislikes */}
      {/* TODO: has_disliked call it from the backend. Number of dislikes */}
      {/* <Button
        onClick={!has_disliked ? handleDislikeStory : handleUndislikeStory}
      >
        <span className="text-slate-400 inline-flex items-center leading-none text-base">
          <ThumbsDownIcon className="w-4 h-4 mr-1" />
          {dislikes_count || 0}
        </span>
      </Button> */}
    </div>
  );
};

//Path: src/features/stories/components/story-media/story-stats.tsx
