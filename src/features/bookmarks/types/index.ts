import { Story } from '@/features/stories';
import {
  CacheRefType,
  PaginatedListQueryParams,
  PaginatedResponse,
} from '@/types';
import { InfiniteData } from '@tanstack/react-query';

export type Bookmark = {
  id: number;
  title: string;
  bookmark_category: BookmarkCategory;
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
export type UpdateBookmarkFormData = {
  bookmark_category?: BookmarkCategory;
  note?: string;
  bookmark_id: number;
};

export type DeleteBookmarkFormData = {
  bookmark_id: string;
};

export type DeleteBookmarkByStoryIdFormData = {
  story_id: string;
};

export type BookmarksQueryParams = PaginatedListQueryParams & {
  category?: string | undefined;
  hashtag?: string | undefined;
  story_id?: string | undefined;
  storyline_id?: string | undefined;
  storySlug?: string | undefined;
};
export type BookmarkListProps = {
  cacheRefQueryKey?: CacheRefType;
  queryParams: BookmarksQueryParams;
  isFinite?: boolean;
  loadMoreOnScroll?: boolean;
  useBookmarksHook: (options: GetBookmarksOptions) => InfiniteStoriesResponse;
};

export type GetBookmarksOptions = {
  params?: BookmarksQueryParams;
  initialData?: any;
};

export type InfiniteStoriesResponse = {
  queryKey: CacheRefType;
  data: InfiniteData<BookmarkListResponse> | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isLoading: boolean;
};

export type BookmarkListResponse = PaginatedResponse<Bookmark>;
