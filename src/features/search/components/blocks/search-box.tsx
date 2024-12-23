'use client';
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { InputField } from '@/components/form';
import { useUserSearchHistory } from '@/features/search/api/get-user-search-history';
import { useInfiniteSearchAutocomplete } from '@/features/search/api/get-search-autocomplete';
import { Suggestions } from './suggestions';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; // Import useSearchParams
import { useRecentSearchHistory } from '@/features/search/api/get-recent-search-history';

type SearchBoxProps = {
  onResults: (data: any) => void;
  onClear: () => void;
};

type SearchInputType = {
  q: string;
};

export const SearchBox: React.FC<SearchBoxProps> = ({ onResults, onClear }) => {
  const { register, watch, setValue, getValues, resetField } =
    useForm<SearchInputType>();
  const searchQuery = watch('q');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const previousQuery = useRef<string | null>(null);

  const [debouncedQuery] = useDebounce(searchQuery, 300);

  // Fetch user-specific search history
  const { data: userSearchHistory, refetch: refetchUserHistory } =
    useUserSearchHistory({ params: { page: 1, page_size: 3 } });

  // Fetch app-wide recent search history
  const { data: recentSearchHistory, refetch: refetchRecentHistory } =
    useRecentSearchHistory({ params: { page: 1, page_size: 3 } });

  const { data, refetch } = useInfiniteSearchAutocomplete({
    params: { q: debouncedQuery, page: 1, page_size: 20 },
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Hook to access query parameters

  const suggestions = useMemo(
    () => (data ? data.pages.flatMap((page: any) => page.results) : []),
    [data],
  );

  // Populate search input with 'q' from the URL when the page loads or when the query changes
  useEffect(() => {
    const query = searchParams?.get('q'); // Get 'q' from the URL
    if (query) {
      setValue('q', query); // Populate the search input with the query value
      setSuggestionsVisible(true); // Keep suggestions visible when navigating with a query
      setIsFocused(true); // Focus the input field
    }
  }, [searchParams, setValue]);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      const currentQuery = getValues('q');
      const matchIndex =
        currentQuery?.lastIndexOf(suggestion.split(' ')[0]) || 0;
      const updatedQuery = currentQuery
        ? `${currentQuery.slice(0, matchIndex)}${suggestion}`
        : suggestion;

      setValue('q', updatedQuery);

      if (pathname === '/search') {
        // If already on the search page, just trigger a refetch
        router.replace(`/search?q=${updatedQuery}`);
        refetch?.(); // Trigger the refetch separately
      } else {
        // If not on the search page, navigate to it
        router.push(`/search?q=${updatedQuery}`);
      }
    },
    [getValues, setValue, pathname, router, refetch],
  );

  const handleEnterKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const currentQuery = getValues('q');
        if (pathname === '/search') {
          // If already on the search page, trigger a refetch
          router.replace(`/search?q=${currentQuery}`);
          refetch?.(); // Trigger the refetch separately
        } else {
          // If not on the search page, navigate to it
          router.push(`/search?q=${currentQuery}`);
        }
      }
    },
    [getValues, pathname, router, refetch],
  );

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
        refetch?.();
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
    resetField('q'); // Clear the input
    previousQuery.current = null;
    onClear();
  }, [resetField, onClear]);

  return (
    <div className="relative">
      <InputField
        id="app-search"
        placeholder="Search app..."
        className="mb-4"
        autoComplete="off"
        spellCheck="false"
        {...register('q')}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleEnterKey}
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

SearchBox.displayName = 'SearchBox';

// Path: src/features/search/components/blocks/search-box.tsx
