'use client';
import React, { useCallback } from 'react';
import { Link } from '@/components/labs/typography';
import { StoryListItemProps } from '../types';
import { CarouselItem, CarouselOptions } from '@/components/blocks/carousel';
import { ContextMenu } from '../context-menu/context-menu';
import { UserDetails } from '../user-details';
import { StoryMedia } from '../story-media';
import { StoryStats } from '../story-stats';
import { formatDate } from '@/utils';
import { useUserActivityTracking } from '@/hooks/useUserActivityTracking';
import { useAnalytics } from '@/stores/analytics/analytics';
import { AnalyticsData, InteractionType } from '@/features/analytics/types';
import { StoryDebug } from '../debug';
import { useLogAnalytics } from '@/features/analytics/hooks/useLogAnalytics';

export const StoryListItem = React.memo(
  ({ story, className, cacheRefQueryKey }: StoryListItemProps) => {
    const carouselItems: CarouselItem[] = story.multimedia;

    const carouselOptions: CarouselOptions = {
      // autoplay: true,
      // autoplaySpeed: 3000,
      onNext: () => {
        console.log('Next slide');
      },
      onPrev: () => {
        console.log('Previous slide');
      },
      onSlide: () => {
        console.log('Slide changed');
      },
      onChange: () => {
        console.log('Active slide changed');
      },
    };

    const { logAnalytics } = useLogAnalytics();

    const activityRef = useUserActivityTracking(
      story.id.toString(),
      logAnalytics,
    );

    return (
      <article
        className={`relative p-4 md:p-8 lg:p-12 flex flex-col items-start  border-b-2 border-slate-100 dark:border-slate-800 ${className}`}
        ref={activityRef}
      >
        <div
          id={`scroll-to-${story.slug}`}
          style={{ position: 'absolute', top: '-100px', left: '0' }}
        ></div>
        <div
          className={`flex align-middle items-center justify-between w-full`}
        >
          <div className="inline-block py-1 px-2 rounded bg-blue-50 text-blue-500 text-xs font-medium tracking-widest uppercase">
            <Link href={`/stories/category/${story.category.slug}`}>
              {`${story.category.title}`}
            </Link>
          </div>

          {/* Context Menu Trigger */}
          <ContextMenu story={story} cacheRefQueryKey={cacheRefQueryKey} />
        </div>

        <Link href={`/stories/${story?.slug}`}>
          <h2
            id={story?.slug}
            className="story-header sm:text-2xl text-xl title-font mt-4 mb-4  font-extrabold tracking-tight text-slate-900 dark:text-slate-200"
          >
            {`${story?.id}. ${story?.title}`}
          </h2>
        </Link>
        <p className="leading-relaxed text-lg mb-8 text-justify text-slate-800 dark:text-slate-300">{`${story?.body}`}</p>

        <StoryMedia
          carouselItems={carouselItems}
          carouselOptions={carouselOptions}
        />
        <StoryStats story={story} cacheRefQueryKey={cacheRefQueryKey} />
        <UserDetails
          name={story?.user.display_name}
          organization={`Reporter, ${'Default Team'}`}
          pub_datetime={formatDate(story?.updated_at)}
        />
        <StoryDebug story={story} cacheRefQueryKey={cacheRefQueryKey} />
      </article>
    );
  },
);
StoryListItem.displayName = 'StoryListItem';

//Path: src/features/stories/components/story-list-item.tsx
