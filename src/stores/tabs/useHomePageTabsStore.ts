import { createTabStore, useTabStore } from './hooks';

const HomePageTabs = createTabStore({
  initialTabs: [
    { id: 'for-you', label: 'For You' },
    { id: 'discover', label: 'Discover' },
    // { id: 'saved', label: 'Save' },
    // Add more tabs as needed
  ],
  initialActiveTab: 'discover',
});

export const useHomePageTabs = () => useTabStore(HomePageTabs);

//path: src/stores/tabs/useHomePageTabsStore.ts
