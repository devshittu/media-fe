import { User } from '@/features/auth';
import { Category } from '@/features/categories';
import {
  Entity,
  NewsChannel,
  PaginatedListQueryParams,
  PaginatedResponse,
} from '@/types';

export type Story = {
  storylines_count: number;
  storyline_id: string | null;
  has_liked: boolean | null;
  has_disliked: boolean | null;
  has_bookmarked: boolean | null;
  user: User;
  multimedia: any[]; // You can replace 'any' with the appropriate type if you have more details about the multimedia structure
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
  parent_story: any | null; // You can replace 'any' with the appropriate type if you have more details about the parent_story structure
  source_link: string;
  event_occurred_at: number | null;
  event_reported_at: number;
};

export type StoriesQueryParams = PaginatedListQueryParams & {
  categoryId?: string | undefined;
  hashtag?: string | undefined;
  story_id?: string | undefined;
  storylineId?: string | undefined;
  storySlug?: string | undefined;
};

export type StoryListResponse = PaginatedResponse<Story>;

export type PaginatedStoryListResponse = {
  pages: StoryListResponse[];
  pageParams: number[];
};


// Path: media-fe/src/features/stories/types/index.ts
