import { useEffect } from 'react';
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

  useEffect(() => {
    tabsConfig[activeTab]?.fetchData?.();
  }, [activeTab, tabsConfig]);

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
