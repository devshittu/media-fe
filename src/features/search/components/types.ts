import { CacheRefType } from '@/types';
import { AutocompleteResponse, SearchHistoryResponse } from '../types';
import { InfiniteData, QueryKey } from '@tanstack/react-query';

export type InfiniteSearchHistoryResponse = {
  queryKey: CacheRefType;
  data: InfiniteData<SearchHistoryResponse> | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  count: number;
  error?: Error | null;
  refetch?: () => void;
};

export type InfiniteAutocompleteResponse = {
  queryKey: CacheRefType;
  data: InfiniteData<AutocompleteResponse> | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  count: number;
  error?: Error | null;
  refetch?: () => void;
};
export type LikeStoryFormData = {
  story_slug?: string;
  story_id: number;
};

// Path: src/features/search/components/types.ts
