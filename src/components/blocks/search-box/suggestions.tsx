'use client';

import React, { memo } from 'react';
import { Button } from '@/components/button';
import { ArrowUpLeftIcon, Icon } from '@/components/illustrations';

type SuggestionsProps = {
  suggestions: Array<{ title: string }>;
  onClickSuggestion: (suggestion: string) => void;
  isVisible: boolean;
  isFocused: boolean;
  isLoading: boolean;
};

type SuggestionItemProps = {
  title?: string;
  onClick?: () => void;
};

// SuggestionItem component (for actual suggestions)
const SuggestionItem: React.FC<SuggestionItemProps> = ({ title, onClick }) => (
  <li
    className="relative flex items-center space-x-4 font-inter py-3 sm:py-4 px-4 hover:bg-slate-200"
    onMouseDown={onClick}
  >
    <div className="flex-1 min-w-0">
      <h2 className="text-sm lg:text-base font-semibold text-slate-900 truncate dark:text-slate-100">
        {title}
      </h2>
    </div>
    <div className="inline-flex flex-shrink-0 space-x-3 items-center text-base font-semibold text-slate-900 dark:text-white">
      <Button className="">
        <Icon icon={<ArrowUpLeftIcon />} className="w-6 h-6 dark:text-slate-100" strokeWidth={2.5} />
      </Button>
    </div>
  </li>
);

// SkeletonItem component (for loading state)
const SkeletonItem: React.FC = () => (
  <li className="relative flex items-center space-x-4 font-inter py-3 sm:py-4 px-4 animate-pulse">
    <div className="flex-1 min-w-0">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
    </div>
    <div className="inline-flex flex-shrink-0 space-x-3 items-center text-base font-semibold text-slate-900 dark:text-white">
      <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
    </div>
  </li>
);

// Main Suggestions component
export const Suggestions = memo(
  ({ suggestions, onClickSuggestion, isVisible, isFocused, isLoading }: SuggestionsProps) => {
    if (!isVisible || !isFocused) return null;

    return (
      <div className="absolute z-10 w-full text-slate-900 bg-white border-2 border-slate-600 shadow-md dark:shadow-slate-950 dark:bg-slate-950 dark:border-slate-400 dark:text-white mt-1">
        <ul className="py-1 divide-y divide-slate-200 dark:divide-slate-700">
          {isLoading ? (
            // Render 3 skeleton items
            <>
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
            </>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                title={suggestion.title}
                onClick={() => onClickSuggestion(suggestion.title)}
              />
            ))
          ) : (
            <li className="py-4 px-4 text-center">No suggestions found</li>
          )}
        </ul>
      </div>
    );
  }
);

Suggestions.displayName = 'Suggestions';

// src/components/blocks/search-box/suggestions.tsx
