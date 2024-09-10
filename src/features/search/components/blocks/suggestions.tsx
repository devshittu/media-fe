'use client';

import React, { memo } from 'react';
import { Button } from '@/components/button';
import { ArrowUpLeftIcon, Icon } from '@/components/illustrations';
import { UserSearchHistory } from './user-search-history';
import { SuggestionItemSkeleton } from '../loading';
import { SearchHistory } from '../../types';



type SuggestionItemProps = {
  title: string;
  probableKeywords?: string[];
  userInput: string;
  onClick: () => void;
};

const HighlightText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <strong key={i} className="text-black font-bold">{part}</strong>
        ) : (
          <span key={i} className="text-gray-500">{part}</span>
        )
      )}
    </span>
  );
};

const SuggestionItem: React.FC<SuggestionItemProps> = ({ title, probableKeywords, userInput, onClick }) => (
  <li
    className="relative flex items-center space-x-4 font-inter py-3 sm:py-4 px-4 hover:bg-slate-200"
    onMouseDown={onClick}
  >
    <div className="flex-1 min-w-0">
      <h2 className="text-sm lg:text-base font-semibold text-slate-900 truncate dark:text-slate-100">
        <HighlightText text={title} highlight={userInput} />
      </h2>
      {probableKeywords && (
        <div className="text-xs text-gray-400 mt-1">
          {probableKeywords.map((keyword, i) => (
            <span key={i}>
              <HighlightText text={keyword} highlight={userInput} />
              {i < probableKeywords.length - 1 && ', '}
            </span>
          ))}
        </div>
      )}
    </div>
    <div className="inline-flex flex-shrink-0 space-x-3 items-center text-base font-semibold text-slate-900 dark:text-white">
      <Button id={"append-text"}>
        <Icon icon={<ArrowUpLeftIcon />} className="w-6 h-6 dark:text-slate-100" strokeWidth={2.5} />
      </Button>
    </div>
  </li>
);


type SuggestionsProps = {
  suggestions: Array<{ title: string; probable_keywords?: string[] }>;
  onClickSuggestion: (suggestion: string) => void;
  isVisible: boolean;
  isFocused: boolean;
  isLoading: boolean;
  userInput: string;
  showHistory: boolean;
  userSearchHistory: SearchHistory[];
  recentSearchHistory: SearchHistory[];
};

export const Suggestions = memo(
  ({ suggestions, onClickSuggestion, isVisible, isFocused, isLoading, userInput, showHistory, userSearchHistory, recentSearchHistory }: SuggestionsProps) => {
    if (!isVisible || !isFocused) return null;

    return (
      <div className="absolute z-10 w-full text-slate-900 bg-white border-2 border-slate-600 shadow-md dark:shadow-slate-950 dark:bg-slate-950 dark:border-slate-400 dark:text-white mt-1">
        <ul className="py-1 divide-y divide-slate-200 dark:divide-slate-700">
          {/* Case 1: User hasn't typed yet */}
          {!userInput && showHistory ? (
            <>
              <li className="py-4 px-4 text-center text-gray-500">
                Start typing to search...
              </li>
              {userSearchHistory.length > 0 && (
                <div>
                  <h3 className="px-4 pt-2">Your Recent Searches</h3>
                  <UserSearchHistory searchHistory={userSearchHistory} onClickHistory={onClickSuggestion} />
                </div>
              )}
              {recentSearchHistory.length > 0 && (
                <div>
                  <h3 className="px-4 pt-2">Popular Searches</h3>
                  <UserSearchHistory searchHistory={recentSearchHistory} onClickHistory={onClickSuggestion} />
                </div>
              )}
            </>
          ) : isLoading ? (
            <>
              <SuggestionItemSkeleton />
              <SuggestionItemSkeleton />
              <SuggestionItemSkeleton />
            </>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                title={suggestion.title}
                probableKeywords={suggestion.probable_keywords}
                userInput={userInput}
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

// Path: src/features/search/components/blocks/suggestions.tsx