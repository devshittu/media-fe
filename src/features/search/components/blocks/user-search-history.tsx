import React from 'react';
import { SearchHistory } from '../../types';

type UserSearchHistoryProps = {
  searchHistory: SearchHistory[];
  onClickHistory: (query: string) => void;
};

export const UserSearchHistory: React.FC<UserSearchHistoryProps> = ({ searchHistory = [], onClickHistory }) => {
  // Ensure searchHistory is always an array
  if (searchHistory.length === 0) {
    return <li className="py-4 px-4 text-center">No recent searches</li>;
  }

  return (
    <ul className="py-1 divide-y divide-slate-200 dark:divide-slate-700">
      {searchHistory.map((item, index) => (
        <li
          key={index}
          className="relative flex items-center space-x-4 font-inter py-3 sm:py-4 px-4 hover:bg-slate-200"
          onMouseDown={() => onClickHistory(item.query)}
        >
          <div className="flex-1 min-w-0">
            <h2 className="text-sm lg:text-base font-semibold text-slate-900 truncate dark:text-slate-100">
              {item.query}
            </h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

// Path: src/features/search/components/blocks/user-search-history.tsx