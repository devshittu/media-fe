import { createTabStore, useTabStore } from './hooks';

const HomePageTabs = createTabStore({
  initialTabs: [
    { id: 'discover', label: 'Discover' },
    { id: 'for-you', label: 'For You' },
    // { id: 'saved', label: 'Save' },
    // Add more tabs as needed
  ],
  initialActiveTab: 'discover',
});

export const useHomePageTabs = () => useTabStore(HomePageTabs);

//path: src/stores/tabs/useHomePageTabsStore.ts
