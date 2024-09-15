'use client';

import React, { memo } from 'react';
import { Button } from '@/components/button';
import { ArrowUpLeftIcon, Icon } from '@/components/illustrations';
import fuzzysort from 'fuzzysort';
import { UserSearchHistory } from './user-search-history';
import { SuggestionItemSkeleton } from '../loading';
import { SearchHistory } from '../../types';

const stopwords = ['the', 'and', 'is', 'of', 'in', 'to', 'a', 'for', 'with', 'on', 'by'];
const suggestionLimit = 5; // Limiting the number of suggestions shown

type SuggestionItemProps = {
  probableKeyword: string;
  userInput: string;
  onClick: () => void;
};

const HighlightText: React.FC<{ text: string; matches: fuzzysort.KeysResult | null }> = ({ text, matches }) => {
  if (!matches || matches.indexes.length === 0) return <span>{text}</span>;

  const highlighted = [];
  let lastIndex = 0;

  // Iterate over the matched indexes to highlight the matching characters
  matches.indexes.forEach((matchIndex) => {
    if (lastIndex < matchIndex) {
      // Add the text before the match in grey
      highlighted.push(
        <span key={lastIndex} className="text-gray-500">
          {text.slice(lastIndex, matchIndex)}
        </span>
      );
    }
    // Add the matched character in bold black
    highlighted.push(
      <strong key={matchIndex} className="text-black font-bold">
        {text[matchIndex]}
      </strong>
    );
    lastIndex = matchIndex + 1;
  });

  // Add the remaining part of the text in grey
  if (lastIndex < text.length) {
    highlighted.push(
      <span key={lastIndex} className="text-gray-500">
        {text.slice(lastIndex)}
      </span>
    );
  }

  return <span>{highlighted}</span>;
};

const SuggestionItem: React.FC<SuggestionItemProps> = ({ probableKeyword, userInput, onClick }) => {
  // Use fuzzysort to match user input to probable next words
  const fuzzyResult = fuzzysort.single(userInput, probableKeyword);

  if (!fuzzyResult) return null; // Skip rendering if no match

  return (
    <li
      className="relative flex items-center space-x-4 font-inter py-3 sm:py-4 px-4 hover:bg-slate-200"
      onMouseDown={onClick}
    >
      <div className="flex-1 min-w-0">
        <h2 className="text-sm lg:text-base font-semibold text-slate-900 truncate dark:text-slate-100">
          <HighlightText text={probableKeyword} matches={fuzzyResult} />
        </h2>
      </div>
      <div className="inline-flex flex-shrink-0 space-x-3 items-center text-base font-semibold text-slate-900 dark:text-white">
        <Button id={"append-text"}>
          <Icon icon={<ArrowUpLeftIcon />} className="w-6 h-6 dark:text-slate-100" strokeWidth={2.5} />
        </Button>
      </div>
    </li>
  );
};

type SuggestionsProps = {
  suggestions: Array<{ probable_next_words?: string[] }>;
  onClickSuggestion: (suggestion: string) => void;
  isVisible: boolean;
  isFocused: boolean;
  isLoading: boolean;
  userInput: string;
  showHistory: boolean;
  userSearchHistory: SearchHistory[];
  recentSearchHistory: SearchHistory[];
};

const getPriorityKeyword = (probableWords: string[]): string | null => {
  if (probableWords.length === 0) return null;

  // Sort by length to prioritize more verbose suggestions
  const sortedByLength = probableWords.sort((a, b) => b.length - a.length);

  // Check for words without stopwords first
  const withoutStopwords = sortedByLength.filter((word) => !stopwords.some((stopword) => word.toLowerCase().includes(stopword)));

  // If there are any valid ones without stopwords, return the first
  if (withoutStopwords.length > 0) {
    return withoutStopwords[0];
  }

  // Otherwise, return the most verbose (longest) word
  return sortedByLength[0];
};

export const Suggestions = memo(
  ({ suggestions, onClickSuggestion, isVisible, isFocused, isLoading, userInput, showHistory, userSearchHistory, recentSearchHistory }: SuggestionsProps) => {
    if (!isVisible || !isFocused) return null;

    return (
      <div className="absolute z-10 w-full text-slate-900 bg-white border-2 border-slate-600 shadow-md dark:shadow-slate-950 dark:bg-slate-950 dark:border-slate-400 dark:text-white mt-1">
        <ul className="py-1 divide-y divide-slate-200 dark:divide-slate-700">
          {!userInput && showHistory ? (
            <>
              <li className="py-4 px-4 text-center text-gray-500">Start typing to search...</li>
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
            suggestions
              .filter((suggestion) => suggestion.probable_next_words?.length) // Filter out suggestions with no probable_next_words
              .slice(0, suggestionLimit) // Limit the number of suggestions
              .map((suggestion, index) => {
                const probableKeyword = getPriorityKeyword(suggestion.probable_next_words || []);
                if (!probableKeyword) return null; // Skip if no valid keyword

                return (
                  <SuggestionItem
                    key={index}
                    probableKeyword={probableKeyword}
                    userInput={userInput}
                    onClick={() => onClickSuggestion(probableKeyword)}
                  />
                );
              })
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



// TODO: Without the fuzzysort function
// 'use client';

// import React, { useEffect, useState, useCallback, memo } from 'react';
// import fuzzysort from 'fuzzysort'; // Import fuzzysort
// import { Button } from '@/components/button';
// import { ArrowUpLeftIcon, Icon } from '@/components/illustrations';
// import { UserSearchHistory } from './user-search-history';
// import { SuggestionItemSkeleton } from '../loading';
// import { SearchHistory } from '../../types';

// const suggestionLimit = 5; // Limiting the number of suggestions shown

// type SuggestionItemProps = {
//   title: string;
//   probableKeyword: string;
//   userInput: string;
//   onClick: () => void;
// };

// const HighlightedText: React.FC<{ suggestion: fuzzysort.Result }> = ({ suggestion }) => {
//   return (
//     <span
//       dangerouslySetInnerHTML={{
//         __html: fuzzysort.highlight(suggestion, '<strong>', '</strong>') || suggestion.target
//       }}
//     />
//   );
// };

// const SuggestionItem: React.FC<SuggestionItemProps> = ({ probableKeyword, userInput, onClick }) => {
//   return (
//     <li
//       className="relative flex items-center space-x-4 font-inter py-3 sm:py-4 px-4 hover:bg-slate-200"
//       onMouseDown={onClick}
//     >
//       <div className="flex-1 min-w-0">
//         <h2 className="text-sm lg:text-base font-semibold text-slate-900 truncate dark:text-slate-100">
//           {probableKeyword}
//         </h2>
//       </div>
//       <div className="inline-flex flex-shrink-0 space-x-3 items-center text-base font-semibold text-slate-900 dark:text-white">
//         <Button id={"append-text"}>
//           <Icon icon={<ArrowUpLeftIcon />} className="w-6 h-6 dark:text-slate-100" strokeWidth={2.5} />
//         </Button>
//       </div>
//     </li>
//   );
// };

// type SuggestionsProps = {
//   suggestions: Array<{ title: string; probable_next_words?: string[] }>;
//   onClickSuggestion: (suggestion: string) => void;
//   isVisible: boolean;
//   isFocused: boolean;
//   isLoading: boolean;
//   userInput: string;
//   showHistory: boolean;
//   userSearchHistory: SearchHistory[];
//   recentSearchHistory: SearchHistory[];
// };

// export const Suggestions = memo(
//   ({ suggestions, onClickSuggestion, isVisible, isFocused, isLoading, userInput, showHistory, userSearchHistory, recentSearchHistory }: SuggestionsProps) => {
//     const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);

//     useEffect(() => {
//       // Process fuzzy matching asynchronously
//       if (userInput) {
//         const promises = suggestions.map(async (suggestion) => {
//           if (!suggestion.probable_next_words?.length) return null;

//           const results = await fuzzysort.goAsync(userInput, suggestion.probable_next_words, {
//             threshold: -10000, // Threshold to eliminate bad matches
//           });

//           if (results.length > 0) {
//             return {
//               ...suggestion,
//               probable_next_words: results.map((result) => ({
//                 ...result.obj,
//                 highlighted: fuzzysort.highlight(result, '<strong>', '</strong>'),
//               })),
//             };
//           }

//           return null;
//         });

//         Promise.all(promises).then((result) => {
//           setFilteredSuggestions(result.filter(Boolean)); // Filter out null results
//         });
//       }
//     }, [suggestions, userInput]);

//     if (!isVisible || !isFocused) return null;

//     return (
//       <div className="absolute z-10 w-full text-slate-900 bg-white border-2 border-slate-600 shadow-md dark:shadow-slate-950 dark:bg-slate-950 dark:border-slate-400 dark:text-white mt-1">
//         <ul className="py-1 divide-y divide-slate-200 dark:divide-slate-700">
//           {!userInput && showHistory ? (
//             <>
//               <li className="py-4 px-4 text-center text-gray-500">Start typing to search...</li>
//               {userSearchHistory.length > 0 && (
//                 <div>
//                   <h3 className="px-4 pt-2">Your Recent Searches</h3>
//                   <UserSearchHistory searchHistory={userSearchHistory} onClickHistory={onClickSuggestion} />
//                 </div>
//               )}
//               {recentSearchHistory.length > 0 && (
//                 <div>
//                   <h3 className="px-4 pt-2">Popular Searches</h3>
//                   <UserSearchHistory searchHistory={recentSearchHistory} onClickHistory={onClickSuggestion} />
//                 </div>
//               )}
//             </>
//           ) : isLoading ? (
//             <>
//               <SuggestionItemSkeleton />
//               <SuggestionItemSkeleton />
//               <SuggestionItemSkeleton />
//             </>
//           ) : filteredSuggestions.length > 0 ? (
//             filteredSuggestions.slice(0, suggestionLimit).map((suggestion, index) => (
//               <SuggestionItem
//                 key={index}
//                 probableKeyword={suggestion.probable_next_words}
//                 userInput={userInput}
//                 onClick={() => onClickSuggestion(suggestion.probable_next_words)}
//               />
//             ))
//           ) : (
//             <li className="py-4 px-4 text-center">No suggestions found</li>
//           )}
//         </ul>
//       </div>
//     );
//   }
// );

// Suggestions.displayName = 'Suggestions';



// // Path: src/features/search/components/blocks/suggestions.tsx
