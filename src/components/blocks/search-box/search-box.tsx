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
