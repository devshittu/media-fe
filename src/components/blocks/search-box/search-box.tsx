// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useDebounce } from 'use-debounce';
// import { InputField } from '@/components/form';
// import Link from 'next/link';
// import { useInfiniteSearchStories } from '@/features/stories/api/get-search-stories';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/button';
// import { ArrowUpLeftIcon, Icon } from '@/components/illustrations';

// type SearchBoxProps = {
//   onResults: (data: any) => void;
//   onClear: () => void;
// };

// type SearchInputType = {
//   q: string;
// };

// export const SearchBox = ({ onResults, onClear }: SearchBoxProps) => {
//   const router = useRouter();
//   const { register, watch, setValue } = useForm<SearchInputType>();
//   const searchQuery = watch('q');
//   const [isFocused, setIsFocused] = useState<boolean>(false); // Track input focus
//   const [suggestionsVisible, setSuggestionsVisible] = useState<boolean>(false); // Track visibility of suggestions
//   const [suggestions, setSuggestions] = useState<any[]>([]); // Store suggestions

//   // Debounce the search query by 300ms
//   const [debouncedQuery] = useDebounce(searchQuery, 300);

//   // Track previous query to avoid unnecessary API calls
//   const previousQuery = useRef<string | null>(null);

//   const { data, isLoading, refetch } = useInfiniteSearchStories({
//     params: { q: debouncedQuery },
//   });

//   useEffect(() => {
//     if (debouncedQuery !== previousQuery.current) {
//       previousQuery.current = debouncedQuery;

//       if (debouncedQuery && debouncedQuery.length > 2) {
//         refetch?.();
//       } else if (!debouncedQuery) {
//         onClear();
//         setSuggestions([]); // Clear suggestions if query is empty
//       }
//     }

//     if (data && !isLoading) {
//       onResults(data);
//       setSuggestions(data.pages.flatMap((page: any) => page.results)); // Set suggestions
//     }
//   }, [debouncedQuery, data, isLoading, onResults, onClear, refetch]);

//   // Handle input focus and blur events
//   const handleFocus = () => setIsFocused(true);
//   const handleBlur = () => {
//     setIsFocused(false);
//     setSuggestionsVisible(false);
//   };

//   const handleClearInput = () => {
//     setValue('q', '');
//     previousQuery.current = null;
//     onClear();
//     setSuggestions([]); // Clear suggestions
//   };

//   // Handle suggestion click
//   const handleSuggestionClick = (suggestion: string) => {
//     router.push(`/search?q=${suggestion}`);
//   };

//   return (
//     <div className="relative">
//       <InputField
//         id="app-search"
//         placeholder="Search app..."
//         className="mb-4"
//         autocomplete="off"
//         spellcheck="false"
//         {...register('q')}
//         onFocus={() => {
//           handleFocus();
//           setSuggestionsVisible(true);
//         }}
//         onBlur={handleBlur}
//       />

//       {/* Show clear button */}
//       {searchQuery && (
//         <button
//           type="button"
//           className="absolute right-4 top-2 text-gray-400"
//           onClick={handleClearInput}
//         >
//           &times;
//         </button>
//       )}

//       {/* Show suggestions dropdown */}
//       {suggestionsVisible && suggestions.length > 0 && isFocused && (
//         <div className="absolute z-10 w-full text-slate-900 bg-white border-2 border-slate-600  shadow-md dark:shadow-slate-950 dark:bg-slate-950 dark:border-slate-400 dark:text-white mt-1">
//           <ul className="py-1 divide-y divide-slate-200 dark:divide-slate-700">
//             {suggestions.map((suggestion, index) => (
//               <li
//                 key={index}
//                 className="relative flex items-center space-x-4 font-inter py-3 sm:py-4 px-4 hover:bg-slate-200"
//               >
//                 <div className="flex-1 min-w-0">
//                   <h2 className="text-sm lg:text-base font-semibold text-slate-900 truncate dark:text-slate-100">
//                     {suggestion.title}
//                   </h2>
//                 </div>

//                 <div className="inline-flex flex-shrink-0 space-x-3 items-center text-base font-semibold text-slate-900 dark:text-white">
//                   <Button
//                     id={`id-goto-search-or-append-button`}
//                     className=""
//                     onMouseDown={() => handleSuggestionClick(suggestion.title)} // Avoid losing focus
//                   >
//                     <Icon
//                       icon={<ArrowUpLeftIcon />}
//                       className="w-6 h-6 dark:text-slate-100"
//                       strokeWidth={2.5}
//                     />
//                   </Button>
//                 </div>
//                 {/* <button
//                   onMouseDown={() => handleSuggestionClick(suggestion.title)} // Avoid losing focus
//                   className="block w-fullx text-left px-4 py-2 text-gray-700 hover:bg-gray-200 flex-shrink-0"
//                 >
//                   {suggestion.title}
//                 </button> */}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Loading indicator */}
//       {isLoading && (
//         <div className="absolute right-2 top-2">
//           <span>Loading...</span>
//         </div>
//       )}
//     </div>
//   );
// };

// // Path: src/components/blocks/search-box/search-box.tsx

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { InputField } from '@/components/form';
import { useInfiniteSearchStories } from '@/features/stories/api/get-search-stories';
import { useRouter } from 'next/navigation';
import { Suggestions } from './suggestions';

type SearchBoxProps = {
  onResults: (data: any) => void;
  onClear: () => void;
};

type SearchInputType = {
  q: string;
};

export const SearchBox = ({ onResults, onClear }: SearchBoxProps) => {
  const { register, watch, setValue } = useForm<SearchInputType>();
  const searchQuery = watch('q');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const previousQuery = useRef<string | null>(null);

  const { data, isLoading, refetch } = useInfiniteSearchStories({
    params: { q: debouncedQuery },
  });

  useEffect(() => {
    if (debouncedQuery !== previousQuery.current) {
      previousQuery.current = debouncedQuery;

      if (debouncedQuery && debouncedQuery.length > 2) {
        refetch?.();
      } else if (!debouncedQuery) {
        onClear();
        setSuggestions([]);
      }
    }

    if (data && !isLoading) {
      onResults(data);
      setSuggestions(data.pages.flatMap((page: any) => page.results));
    }
  }, [debouncedQuery, data, isLoading, onResults, onClear, refetch]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    setSuggestionsVisible(false);
  };

  const handleClearInput = () => {
    setValue('q', '');
    previousQuery.current = null;
    onClear();
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <InputField
        id="app-search"
        placeholder="Search app..."
        className="mb-4"
        autocomplete="off"
        spellcheck="false"
        {...register('q')}
        onFocus={() => {
          handleFocus();
          setSuggestionsVisible(true);
        }}
        onBlur={handleBlur}
      />

      {searchQuery && (
        <button
          type="button"
          className="absolute right-4 top-2 text-gray-400"
          onClick={handleClearInput}
        >
          &times;
        </button>
      )}

      <Suggestions
        suggestions={suggestions}
        onClickSuggestion={(suggestion) => router.push(`/search?q=${suggestion}`)}
        isVisible={suggestionsVisible}
        isFocused={isFocused}
      />

      {isLoading && (
        <div className="absolute right-2 top-2">
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};

// Path: src/components/blocks/search-box/search-box.tsx
