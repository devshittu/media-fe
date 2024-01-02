import { BookmarkAction } from '../components/types';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { Bookmark, BookmarkCategory, BookmarkListResponse } from '../types';
import { ApiCallResultType, CacheRefType } from '@/types';

export const useUpdateCachedBookmark = () => {
  const queryClient = useQueryClient();

  const updateBookmark = (
    cacheRefQueryKey: CacheRefType,
    bookmark_id: number | string,
    actionType: BookmarkAction,
  ) => {
    const isQueryInfinite = cacheRefQueryKey[1] === ApiCallResultType.INFINITE;
    if (isQueryInfinite) {
      // Handle infinite query cache update
      queryClient.setQueryData<InfiniteData<BookmarkListResponse> | undefined>(
        cacheRefQueryKey,
        (oldData) => {
          return updateBookmarkDataInPages(oldData, bookmark_id, actionType);
        },
      );
    } else {
      // Handle regular query cache update
      queryClient.setQueryData<BookmarkListResponse | undefined>(
        cacheRefQueryKey,
        (oldData) => {
          return updateBookmarkDataInResults(oldData, bookmark_id, actionType);
        },
      );
    }
  };

  return updateBookmark;
};

function updateBookmarkDataInPages(
  data: InfiniteData<BookmarkListResponse> | undefined,
  bookmark_id: number | string,
  actionType: BookmarkAction,
): InfiniteData<BookmarkListResponse> | undefined {
  if (!data) return undefined;
  const updatedPages = data.pages
    .map((page) => updateBookmarkDataInResults(page, bookmark_id, actionType))
    .filter((page): page is BookmarkListResponse => page !== undefined);

  return {
    ...data,
    pages: updatedPages,
  };
}

function updateBookmarkDataInResults(
  data: BookmarkListResponse | undefined,
  bookmark_id: number | string,
  actionType: BookmarkAction,
): BookmarkListResponse | undefined {
  if (!data) return undefined;

  // If the action is to delete the bookmark, filter it out from the results
  if (actionType === BookmarkAction.DELETE_BOOKMARK) {
    console.log(`Form for Deleting Bookmark compeleted.`);
    const filteredResults = data.results.filter(
      (bookmark) => bookmark.id !== bookmark_id,
    );
    return { ...data, results: filteredResults };
  }

  return {
    ...data,
    results: data.results.map((bookmark) => {
      // console.log(' bookmark.id=', bookmark.id, ' bookmark_id=', bookmark_id);
      if (bookmark.id === bookmark_id) {
        return updateBookmarkBasedOnAction(bookmark, actionType);
      }
      return bookmark;
    }),
  };
}

function updateBookmarkBasedOnAction(
  bookmark: Bookmark,
  actionType: BookmarkAction,
): Bookmark {
  let updatedBookmark = { ...bookmark };
  switch (actionType) {
    case BookmarkAction.MOVE_TO_SAVE:
      updatedBookmark = {
        ...updatedBookmark,
        bookmark_category: BookmarkCategory.Save,
      };
      break;
    case BookmarkAction.MOVE_TO_FAVORITES:
      updatedBookmark = {
        ...updatedBookmark,
        bookmark_category: BookmarkCategory.Favorites,
      };
      break;
    case BookmarkAction.MOVE_TO_READ_LATER:
      updatedBookmark = {
        ...updatedBookmark,
        bookmark_category: BookmarkCategory.ReadLater,
      };
      break;

    case BookmarkAction.EDIT_BOOKMARK:
      updatedBookmark = {
        ...updatedBookmark,
        bookmark_category: BookmarkCategory.ReadLater,
      };
      // queryClient.invalidateQueries('someQueryKey');
      break;

    // Handle other action types...
  }
  return updatedBookmark;
}

//Path: src/features/stories/hooks/useUpdateCachedBookmark.ts
