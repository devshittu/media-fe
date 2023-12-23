import { Story } from '@/features/stories';
import { PaginatedListQueryParams, PaginatedResponse } from '@/types';

export type Bookmark = {
  id: number;
  title: string;
  bookmark_category: string;
  note: string;
  user: number;
  story: Story;
  created_at: number;
};

export enum BookmarkCategory {
  ReadLater = 'Read Later',
  Favorites = 'Favorites',
  Save = 'Save',
}

export type AddBookmarkFormData = {
  bookmark_category: BookmarkCategory;
  note: string;
  story_id: number;
};

export type DeleteBookmarkFormData = {
  story_id: string;
};

export type BookmarkListProps = {
  data: BookmarkListResponse;
  queryParams: PaginatedListQueryParams;
};

export type BookmarkListResponse = PaginatedResponse<Bookmark>;
