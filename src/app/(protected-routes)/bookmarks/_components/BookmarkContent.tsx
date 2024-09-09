'use client';

import { BookmarkList } from '@/features/bookmarks/components';
import {
  Bookmark,
  BookmarkCategory,
  useInfiniteBookmarks,
} from '@/features/bookmarks';
import { useTabContentManager } from '@/components/blocks/tab';
import { useBookmarkPageTabs } from '@/stores/tabs';
import React from 'react';

type BookmarkContentProps = {
  bookmarks?: Bookmark[];
  queryParams: Record<string, any>;
};

export default function BookmarkContent({
  bookmarks,
  queryParams,
}: BookmarkContentProps) {
  const tabsConfig = {
    save: {
      content: (
        <BookmarkList
          useBookmarksHook={useInfiniteBookmarks}
          queryParams={{ ...queryParams, category: BookmarkCategory.Save }}
          loadMoreOnScroll
        />
      ),
      fetchData: async () => {
        console.log('Fetching data for Save tab');
      },
    },
    'read-later': {
      content: (
        <BookmarkList
          useBookmarksHook={useInfiniteBookmarks}
          queryParams={{ ...queryParams, category: BookmarkCategory.ReadLater }}
          loadMoreOnScroll
        />
      ),
      fetchData: async () => {
        console.log('Fetching data for Read Later tab');
      },
    },
    favorite: {
      content: (
        <BookmarkList
          useBookmarksHook={useInfiniteBookmarks}
          queryParams={{ ...queryParams, category: BookmarkCategory.Favorites }}
          loadMoreOnScroll
        />
      ),
      fetchData: async () => {
        console.log('Fetching data for Favorites tab');
      },
    },
  };

  const { handleScroll, contentRef, renderTabContent } = useTabContentManager(
    useBookmarkPageTabs,
    tabsConfig,
  );

  return (
    <div ref={contentRef} onScroll={handleScroll} className="tab-content">
      {renderTabContent()}
    </div>
  );
}
