import { LoadingPhoto, LoadingParagraph } from '@/components/loading';
import { UserItemLoadingPlaceholder } from '@/features/auth';
import React from 'react';
import { StoryStatsLoadingPlaceholder } from './story-stats-loading-placeholder';

export const StoryListItemLoadingPlaceholder = () => {
  return (
    <>
      <article
        className={`animate-pulse flex p-4 md:p-8 lg:p-12 flex-col w-full lg:min-w-[640px]`}
      >
        <LoadingParagraph />
        <LoadingPhoto />
        <StoryStatsLoadingPlaceholder />
        <UserItemLoadingPlaceholder />
        <span className="sr-only">Loading...</span>
      </article>
    </>
  );
};

//Path: src/features/stories/components/story-list-item-loading-placeholder.tsx
