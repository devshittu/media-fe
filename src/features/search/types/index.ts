
import {
  PaginatedListQueryParams,
  PaginatedResponse,
} from '@/types';

export type SearchHistory = {
  query: string;
  searched_at: number;
  hits?: number;
}
export type Autocomplete = {
  story_id: string;
  title: string;
  body_excerpt: string;
  probable_keywords?: string[];
}

export type SearchHistoryResponse = PaginatedResponse<SearchHistory>;
export type AutocompleteResponse = PaginatedResponse<Autocomplete>;

export type PaginatedSearchHistoryResponse = {
  pages: SearchHistoryResponse[];
  pageParams: number[];
};



export type SearchQueryParams = PaginatedListQueryParams & {
  q?: string | undefined;
};
