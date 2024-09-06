import React from 'react';

export const AccordionItemSkeleton: React.FC = () => {
  return (
    <details className="w-full border-2 border-slate-700 dark:border-slate-300 rounded-none animate-pulse">
      <summary className="px-4 py-6 flex items-center justify-between text-slate-900 dark:text-slate-100">
        {/* Title Skeleton */}
        <div className="h-6 bg-slate-200 dark:bg-slate-700 w-3/4"></div>

        {/* Icon Skeleton */}
        <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
      </summary>
      <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-slate-700 dark:text-slate-400 transition-max-height duration-300 overflow-hidden max-h-96">
        {/* Content Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 w-5/6"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 w-4/6"></div>
        </div>
      </p>
    </details>
  );
};

export default AccordionItemSkeleton;

// src/features/support/components/loading/AccordionItemSkeleton.tsx
