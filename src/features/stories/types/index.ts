import { User } from '@/features/auth';
import { Category } from '@/features/categories';
import {
  Entity,
  NewsChannel,
  PaginatedListQueryParams,
  PaginatedResponse,
} from '@/types';
import { MultimediaItem } from '../components';

export type Story = {
  storylines_count: number;
  storyline_id: string | null;
  has_liked: boolean | null;
  has_disliked: boolean | null;
  has_bookmarked: boolean | null;
  user: User;
  multimedia: MultimediaItem[]; // You can replace 'any' with the appropriate type if you have more details about the multimedia structure
  likes_count: number;
  dislikes_count: number;
  id: number;
  deleted_at: string | null;
  created_at: number;
  updated_at: number;
  is_flagged: boolean;
  title: string;
  slug: string;
  body: string;
  category: Category;
  parent_story: string | null; // You can replace 'any' with the appropriate type if you have more details about the parent_story structure
  source_link: string;
  event_occurred_at: number | null;
  event_reported_at: number;
};

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

export type StoriesQueryParams = PaginatedListQueryParams & {
  categoryId?: string | undefined;
  hashtag?: string | undefined;
  story_id?: string | undefined;
  storylineId?: string | undefined;
  storySlug?: string | undefined;
  q?: string | undefined;
};

export type StoryListResponse = PaginatedResponse<Story>;
export type SearchHistoryResponse = PaginatedResponse<SearchHistory>;
export type AutocompleteResponse = PaginatedResponse<Autocomplete>;

export type PaginatedStoryListResponse = {
  pages: StoryListResponse[];
  pageParams: number[];
};

export type PaginatedSearchHistoryResponse = {
  pages: SearchHistoryResponse[];
  pageParams: number[];
};

// Path: media-fe/src/features/stories/types/index.ts
