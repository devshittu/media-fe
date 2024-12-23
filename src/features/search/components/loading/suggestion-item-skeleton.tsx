import React from 'react';

export const SuggestionItemSkeleton: React.FC = () => (
  <li className="relative flex items-center space-x-4 font-inter py-3 sm:py-4 px-4 animate-pulse">
    <div className="flex-1 min-w-0">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
    </div>
    <div className="inline-flex flex-shrink-0 space-x-3 items-center text-base font-semibold text-slate-900 dark:text-white">
      <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
    </div>
  </li>
);
// Path: src/features/search/components/loading/suggestion-item-skeleton.tsx
