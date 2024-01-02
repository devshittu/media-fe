import { bookmarks } from '@/testing/test-data/bookmarks';
import { Bookmark } from '@/features/bookmarks';
import { InfiniteData } from '@tanstack/react-query';
import { BookmarkCategory, BookmarkListResponse } from '../types';
import { CacheRefType } from '@/types';

export type InfiniteBookmarksResponse = {
  queryKey: CacheRefType;
  data: InfiniteData<BookmarkListResponse> | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isLoading: boolean;
};

export enum BookmarkAction {
  //   MOVE_CATEGORY = 'move-category',
  MOVE_TO_SAVE = 'move-to-' + BookmarkCategory.Save,
  MOVE_TO_READ_LATER = 'move-to-' + BookmarkCategory.ReadLater,
  MOVE_TO_FAVORITES = 'move-to-' + BookmarkCategory.Favorites,
  EDIT_BOOKMARK = 'edit-bookmark',
  DELETE_BOOKMARK = 'delete-bookmark',
}

export type BookmarkDebugProps = {
  bookmark: Bookmark;
  cacheRefQueryKey: CacheRefType;
};
