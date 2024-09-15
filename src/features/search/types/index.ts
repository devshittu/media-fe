
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
  slug: string;
  user: {
    id: number;
    username: string;
  };
  category: {
    id: number;
    title: string;
  };
  parent_story: {
    id: number;
    title: string;
  };
  title: string;
  body: string;
  source_link: string;
  event_reported_at: string;
  probable_next_words: string[];
  story_keywords: string[];
};

export type SearchHistoryResponse = PaginatedResponse<SearchHistory>;
export type AutocompleteResponse = PaginatedResponse<Autocomplete>;

export type PaginatedSearchHistoryResponse = {
  pages: SearchHistoryResponse[];
  pageParams: number[];
};



export type SearchQueryParams = PaginatedListQueryParams & {
  q?: string | undefined;
};
