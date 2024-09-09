import React from 'react';

export const StorylineItemSkeleton = () => {
  return (
    <article>
      <div className="mx-4 items-center block p-3 animate-pulse">
        {/* Title Skeleton */}
        <div className="h-6 bg-slate-200 dark:bg-slate-700 w-3/4 sm:w-2/3 mt-4 mb-4"></div>

        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 w-full mb-2"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 w-5/6"></div>
        </div>

        {/* Subject Skeleton */}
        <div className="h-4 bg-slate-200 dark:bg-slate-700 w-1/2 my-4"></div>

        {/* Hashtags Skeleton */}
        <div className="flex justify-start gap-4 flex-wrap mb-4 md:mb-8">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 w-20"></div>
          <div className="h-6 bg-slate-200 dark:bg-slate-700 w-24"></div>
          <div className="h-6 bg-slate-200 dark:bg-slate-700 w-28"></div>
          <div className="h-6 bg-slate-200 dark:bg-slate-700 w-20"></div>
          <div className="h-6 bg-slate-200 dark:bg-slate-700 w-24"></div>
        </div>

        {/* Storyline Stats Skeleton */}
        <div className="flex items-center flex-wrap mt-auto w-full">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 w-40"></div>
          <div className="ml-auto mr-3 pr-3 py-1 border-r-2 border-slate-200 dark:border-slate-700">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 w-24"></div>
          </div>
          <div className="h-6 bg-slate-200 dark:bg-slate-700 w-24"></div>
        </div>
      </div>
    </article>
  );
};

// src/features/storylines/components/loading/storyline-item-loading-placeholder.tsx
