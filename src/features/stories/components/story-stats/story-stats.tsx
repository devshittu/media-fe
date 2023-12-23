import React from 'react';
import { Link } from '@/components/labs/typography';
import {
  ExternalLinkIcon,
  ThumbsUpIcon,
  ClockIcon,
} from '@/components/illustrations';
import { Button } from '@/components/button';
import { ControlledPopper } from '@/components/blocks/popup';
import { StorylineMiniPopup } from '@/features/storylines/components';
import { useStoryActionLogic } from '../../hooks';
import { useLikeStory } from '../../api/post-like-story';
import { StoryAction, StoryStatsProps } from '../types';
import { useUnlikeStory } from '../../api/post-unlike-story';
import { IS_DEBUG_MODE } from '@/config/constants';

export const StoryStats = ({ story, cacheRefQueryKey }: StoryStatsProps) => {
  const {
    storylines_count,
    likes_count,
    source_link,
    id,
    slug,
    has_liked,
    has_bookmarked,
    has_disliked,
    dislikes_count,
  } = story;
  const likePayload = {
    story_id: id,
    story_slug: slug,
    // ... add other necessary data for like action ...
  };


  const { handleSimpleAction: handleLikeStory, isLoading: isLikeLoading } =
    useStoryActionLogic({
      basePayload: likePayload,
      action: StoryAction.LIKE,
      apiFunction: useLikeStory,
      cacheRefQueryKey: cacheRefQueryKey,
    });

  const { handleSimpleAction: handleUnlikeStory, isLoading: isUnlikeLoading } =
    useStoryActionLogic({
      basePayload: likePayload,
      action: StoryAction.UNLIKE,
      apiFunction: useUnlikeStory,
      cacheRefQueryKey: cacheRefQueryKey,
    });


  const viewCount = 1200;
  const commentCount = 6;

  const closeIcon = (
    <div className="inline-flex items-center leading-none ">
      <ClockIcon className="w-6 h-6 mr-2" strokeWidth={2.5} />
      {storylines_count || 0}
    </div>
  );

  return (
    <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-slate-100 dark:border-slate-800 mt-auto w-full">
      {/* Link to "Read more" */}
      <Link
        href={source_link || '/'}
        className="text-cyan-500 inline-flex items-center"
      >
        <span className="text-base">Read more</span>
        <ExternalLinkIcon className="w-4 h-4 ml-2" />
      </Link>

      <div className="flex justify-end">
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
        {/* Number of likes */}
        {/* {`has_liked: ${has_liked} now would use ${ !has_liked ? 'handleLikeStory' : 'handleUnlikeStory' }`} */}
        <div className="inline-flex items-center leading-none text-base md:text-lg lg:text-xl font-semibold text-slate-900 dark:text-slate-100">
          <Button
            id={`like-button`}
            onClick={!has_liked ? handleLikeStory : handleUnlikeStory}
            className="inline-flex items-center leading-none "
          >
            <ThumbsUpIcon className="w-6 h-6 mr-2" strokeWidth={2.5} />
            {likes_count || 0}
          </Button>
        </div>
      </div>
      <>
      {IS_DEBUG_MODE && (
        <pre className="text-sm whitespace-pre-wrap">
          <p>
            {`has_liked = ${JSON.stringify(
              has_liked,
            )} likes_count = ${JSON.stringify(likes_count)}`}
          </p>
          <p>
            {`has_disliked = ${JSON.stringify(
              has_disliked,
            )} dislikes_count = ${JSON.stringify(dislikes_count)}`}
          </p>
          <p>{`has_bookmarked = ${JSON.stringify(has_bookmarked)} `}</p>
        </pre>
        )}
      </>
    </div>
  );
};

//Path: src/features/stories/components/story-media/story-stats.tsx
