'use client';
import { TabStore } from '@/stores/tabs/hooks';
import { useCallback, useEffect, useRef } from 'react';
// import { TabStore } from '@/components/blocks/tab/store';

export const useTabScrollManager = (
  activeTab: string,
  setScrollPosition: (tabId: string, scrollPosition: number) => void,
  scrollPositions: TabStore['scrollPositions'],
) => {
  const contentRef = useRef<HTMLDivElement>(null);
  // Memoize Function to handle scroll events
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrollPosition(activeTab, scrollY);
  }, [activeTab, setScrollPosition]);

  // Set up and clean up the global scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab, setScrollPosition, handleScroll]);

  // Restore scroll position when the active tab changes
  useEffect(() => {
    const savedScrollPosition = scrollPositions[activeTab] || 0;
    window.scrollTo(0, savedScrollPosition);
  }, [activeTab, scrollPositions]);
  return { handleScroll, contentRef };
};
// Path: src/components/blocks/tab/hooks/useScrollManager.ts
