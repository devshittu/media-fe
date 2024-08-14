'use client';
import { useEffect, useState } from 'react';
import { useTabScrollManager } from './useTabScrollManager';
import { TabsConfig } from '../types';
import { TabStore } from '@/stores/tabs/hooks';

export const useTabContentManager = (
  tabStore: () => TabStore,
  tabsConfig: TabsConfig,
) => {
  const { tabs, activeTab, setScrollPosition, scrollPositions } = tabStore();
  // Use the custom hook for scroll management
  const { handleScroll, contentRef } = useTabScrollManager(
    activeTab,
    setScrollPosition,
    scrollPositions,
  );

  // State to track if data for a tab has been fetched
  const [fetchedTabs, setFetchedTabs] = useState<{ [key: string]: boolean }>(
    {},
  );

  useEffect(() => {
    // Check if the fetchData for the current tab needs to be called
    if (!fetchedTabs[activeTab] && tabsConfig[activeTab]?.fetchData) {
      tabsConfig[activeTab]?.fetchData?.();
      // Update the state to indicate that the data for this tab has been fetched
      setFetchedTabs({ ...fetchedTabs, [activeTab]: true });
    }
  }, [activeTab, tabsConfig, fetchedTabs]);
  return {
    contentRef,
    handleScroll,
    tabs,
    activeTab,
    setScrollPosition,
    scrollPositions,
    renderTabContent: () => tabsConfig[activeTab].content,
  };
};

// Path: src/components/blocks/tab/hooks/useTabContentManager.ts
