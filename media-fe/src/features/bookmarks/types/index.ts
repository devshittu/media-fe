export type Bookmark = {
  id: string;
  title: string;
  url: string;
  thumbnail_url?: string;
  category: string; //  'Read Later'...
  story_id: string;
  excerpt?: string;
  note?: string;
  story_published_at: number;
  created_at: number;
  updated_at: number;
};

export type BookmarkResponse = {
  bookmarks: Bookmark[];
  page: number;
  total_pages: number;
  total: number;
};
