'use client';

import React from 'react';
import { Button } from '@/components/button';
import { ArrowUpLeftIcon, Icon } from '@/components/illustrations';
import { useRouter } from 'next/navigation';

type SuggestionsProps = {
  suggestions: Array<{ title: string }>;
  onClickSuggestion: (suggestion: string) => void;
  isVisible: boolean;
  isFocused: boolean;
};

export const Suggestions = ({ suggestions, onClickSuggestion, isVisible, isFocused }: SuggestionsProps) => {
  const router = useRouter();

  const handleSuggestionClick = (suggestion: string) => {
    router.push(`/search?q=${suggestion}`);
  };

  if (!isVisible || !isFocused || suggestions.length === 0) return null;

  return (
    <div className="absolute z-10 w-full text-slate-900 bg-white border-2 border-slate-600 shadow-md dark:shadow-slate-950 dark:bg-slate-950 dark:border-slate-400 dark:text-white mt-1">
      <ul className="py-1 divide-y divide-slate-200 dark:divide-slate-700">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="relative flex items-center space-x-4 font-inter py-3 sm:py-4 px-4 hover:bg-slate-200"
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-sm lg:text-base font-semibold text-slate-900 truncate dark:text-slate-100">
                {suggestion.title}
              </h2>
            </div>

            <div className="inline-flex flex-shrink-0 space-x-3 items-center text-base font-semibold text-slate-900 dark:text-white">
              <Button
                id={`id-goto-search-or-append-button`}
                className=""
                onMouseDown={() => onClickSuggestion(suggestion.title)} 
              >
                <Icon
                  icon={<ArrowUpLeftIcon />}
                  className="w-6 h-6 dark:text-slate-100"
                  strokeWidth={2.5}
                />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
