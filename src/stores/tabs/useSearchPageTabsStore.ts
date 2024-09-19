'use client';
import { createTabStore, useTabStore } from './hooks';

const SearchPageTabs = createTabStore({
  initialTabs: [
    { id: 'searchStories', label: 'Stories' },
    // { id: 'searchStorylines', label: 'Storylines' },
    // { id: 'saved', label: 'Save' },
    // Add more tabs as needed
  ],
  initialActiveTab: 'searchStories',
});

export const useSearchPageTabs = () => useTabStore(SearchPageTabs);

//path: src/stores/tabs/useSearchPageTabsStore.ts
