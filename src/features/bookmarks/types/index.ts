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

// export type BookmarksQueryParams = {
//   page?: number | undefined;
//   per_page?: number | undefined;
// };

export type BookmarkListProps = {
  data: BookmarkListResponse;
  queryParams: PaginatedListQueryParams;
};

export type BookmarkListResponse = PaginatedResponse<Bookmark>;
