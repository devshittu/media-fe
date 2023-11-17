import Image from 'next/image';
import React, { useMemo } from 'react';
import { StorylineMiniCardProps } from '../types';
import {
  CalendarIcon,
  FileTextIcon,
  HashIcon,
  Icon,
} from '@/components/illustrations';
import { useStorylinesByStory } from '../../api/get-storylines-by-story';
import { TrendingListItem } from '@/features/trends/components/blocks/trends';
import { Loading } from '@/components/loading';
import { Storyline } from '../../types';
import { StorylineMiniPopupLoadingPlaceholder } from '../loading/storyline-mini-popup-loading-placeholder';
import { word_pluralize } from '@/utils';

export const StorylineMiniPopup = React.forwardRef<
  HTMLDivElement,
  StorylineMiniCardProps
>(({ story, identifier, ...rest }, ref) => {
  const { slug } = story;
  const { data: responseData, isLoading } = useStorylinesByStory({
    storySlug: slug,
  });

  const stableStoryline = useMemo(
    () => responseData?.results,
    [responseData?.results],
  );
  // const trend = {
  //   rank: 3,
  //   category: 'Rock',
  //   title: '#Ferrari',
  //   subtitle: '5,586 Concepts',
  //   onArrowClick: () => console.log('Clicked arrow for #Ferrari'),
  // };
  if (isLoading) {
    return (
      <div className="min-w-[320px]">
        <StorylineMiniPopupLoadingPlaceholder />
      </div>
    );
  }
  // Destructure the first element of the stableStoryline array
  const {
    summary,
    description,
    hashtags,
    id: storylineId,
    stories_count,
  } = stableStoryline[0] || ({} as Storyline);
  // Destructure the first element of the results array

  const storiesCountText = `${stories_count} ${word_pluralize(
    'story',
    stories_count,
  )}`;
  const lastUpdatedText = 'Last updated 2 weeks ago';
  const hashtagsCount = `${
    hashtags.length === 0
      ? 'No hashtags found'
      : `${hashtags.length} ${word_pluralize('hashtag', hashtags.length)}`
  }`;
  const storylineWatchers = [
    'https://dummyimage.com/104x104',
    'https://dummyimage.com/104x104',
    'https://dummyimage.com/104x104',
  ];

  return (
    <>
      <div ref={ref} {...rest}>
        <h1 className="text-xl font-semibold my-2">{summary}</h1>
        <div className="flex space-x-2 text-slate-400 text-sm">
          <Icon icon={<FileTextIcon />} className="h-5 w-5" />
          <p>{storiesCountText}</p>
        </div>
        <div className="flex space-x-2 text-slate-400 text-sm my-3">
          <Icon icon={<CalendarIcon />} className="h-5 w-5" />

          <p>{lastUpdatedText}</p>
        </div>
        <div className="flex space-x-2 text-slate-400 text-sm my-3">
          <Icon icon={<HashIcon />} className="h-5 w-5" />

          <p>{hashtagsCount}</p>
        </div>
        <div className="border-t-2 "></div>
        <div className="flex justify-between">
          <div className="my-2">
            <p className="font-semibold text-base mb-2">Watched by</p>
            <div className="flex space-x-2">
              {storylineWatchers.map((member, index) => (
                <Image
                  width={100}
                  height={100}
                  alt={summary}
                  key={index}
                  src={member}
                  className="w-6 h-6 rounded-full"
                />
              ))}
            </div>
          </div>
          <div className="my-2">
            <p className="font-semibold text-base mb-2">Views</p>
            <div className="text-base text-slate-400 font-semibold">
              {/* <p>{progress}%</p> */}
              <p>{3846}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="">{description}</p>
      {/* <h1>{`StoryID: ${id} Storyline id : ${storyline_id}`}</h1> */}
      {/* <TrendingListItem key={trend.title} {...trend} /> */}
    </>
  );
});

StorylineMiniPopup.displayName = 'StorylineMiniPopup';

// Path: src/features/storylines/components/blocks/storyline-mini-card.tsx
