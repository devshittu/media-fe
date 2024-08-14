'use client';
import { createTabStore, useTabStore } from './hooks';

const BookmarkPageTabs = createTabStore({
  initialTabs: [
    { id: 'save', label: 'Save' },
    { id: 'read-later', label: 'Read Later' },
    { id: 'favorite', label: 'Favorite' },
    // Add more tabs as needed
  ],
  initialActiveTab: 'save',
});

export const useBookmarkPageTabs = () => useTabStore(BookmarkPageTabs);

// import { createTabStore, useTabStore } from './hooks';
// import { Tab } from '@/components/blocks/tab/tab-list';

// const createBookmarkPageTabs = (initialTabs: Tab[], initialActiveTab: string) =>
//   createTabStore({
//     initialTabs,
//     initialActiveTab,
//   });

// // Updated hook with TypeScript types
// export const useBookmarkPageTabs = (initialTabs: Tab[], initialActiveTab: string) => {
//   const BookmarkPageTabs = createBookmarkPageTabs(initialTabs, initialActiveTab);
//   return useTabStore(BookmarkPageTabs);
// };

// path: src/stores/tabs/useBookmarkPageTabsStore.ts
