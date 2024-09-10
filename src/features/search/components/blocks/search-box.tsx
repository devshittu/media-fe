'use client';
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { InputField } from '@/components/form';
import { useUserSearchHistory } from '@/features/search/api/get-user-search-history';
import { useInfiniteSearchAutocomplete } from '@/features/search/api/get-search-autocomplete';
import { Suggestions } from './suggestions';
import { useRouter, usePathname } from 'next/navigation';
import { useRecentSearchHistory } from '@/features/search/api/get-recent-search-history';


type SearchBoxProps = {
  onResults: (data: any) => void;
  onClear: () => void;
};

type SearchInputType = {
  q: string;
};
export const SearchBox = ({ onResults, onClear }: SearchBoxProps) => {
  const { register, watch, setValue, getValues } = useForm<SearchInputType>();
  const searchQuery = watch('q');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const previousQuery = useRef<string | null>(null);

  const [debouncedQuery] = useDebounce(searchQuery, 300);

  // Fetch user-specific search history
  const { data: userSearchHistory, refetch: refetchUserHistory } = useUserSearchHistory({ params: { page: 1, page_size: 5 } });
  
  // Fetch app-wide recent search history
  const { data: recentSearchHistory, refetch: refetchRecentHistory } = useRecentSearchHistory({ params: { page: 1, page_size: 5 } });

  const { data, refetch } = useInfiniteSearchAutocomplete({
    params: { q: debouncedQuery, page: 1, page_size: 3 },
  });

  const router = useRouter();
  const pathname = usePathname();

  const suggestions = useMemo(
    () => (data ? data.pages.flatMap((page: any) => page.results) : []),
    [data]
  );

  const handleSuggestionClick = useCallback((suggestion: string) => {
    const currentQuery = getValues('q');
    const updatedQuery = currentQuery ? `${currentQuery} ${suggestion}` : suggestion;

    setValue('q', updatedQuery);

    // if (pathname !== '/search') {
    //   router.push(`/search?q=${updatedQuery}`);
    // } else {
    //   router.replace(`/search?q=${updatedQuery}`).then(() => refetch());
    // }
  }, [getValues, setValue, pathname, router, refetch]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setSuggestionsVisible(true);
    refetchUserHistory();
    refetchRecentHistory();
  }, [refetchUserHistory, refetchRecentHistory]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setSuggestionsVisible(false);
  }, []);

  useEffect(() => {
    if (debouncedQuery !== previousQuery.current) {
      previousQuery.current = debouncedQuery;

      if (debouncedQuery && debouncedQuery.length > 2) {
        setIsLoading(true);
        refetch();
      } else if (!debouncedQuery) {
        onClear();
      }
    }

    if (data) {
      onResults(data);
      setIsLoading(false);
    }
  }, [debouncedQuery, data, onResults, onClear, refetch]);

  const handleClearInput = useCallback(() => {
    setValue('q', '');
    previousQuery.current = null;
    onClear();
  }, [setValue, onClear]);

  return (
    <div className="relative">
      <InputField
        id="app-search"
        placeholder="Search app..."
        className="mb-4"
        autocomplete="off"
        spellcheck="false"
        {...register('q')}
        onFocus={handleFocus}
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
        onClickSuggestion={handleSuggestionClick}
        isVisible={suggestionsVisible}
        isFocused={isFocused}
        isLoading={isLoading}
        userInput={debouncedQuery}
        showHistory={!debouncedQuery} // Only show history if input is empty
        userSearchHistory={userSearchHistory?.results || []}
        recentSearchHistory={recentSearchHistory?.results || []}
      />
    </div>
  );
};

// Path: src/features/search/components/blocks/search-box.tsx