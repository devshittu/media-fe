import { createTabStore, useTabStore } from './hooks';

const HomePageTabs = createTabStore({
  initialTabs: [
    { id: 'for-you', label: 'For You' },
    { id: 'following', label: 'Following' },
    // { id: 'saved', label: 'Save' },
    // Add more tabs as needed
  ],
  initialActiveTab: 'for-you',
});

export const useHomePageTabs = () => useTabStore(HomePageTabs);

//path: src/stores/tabs/useHomePageTabsStore.ts
