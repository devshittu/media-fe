import React, { useEffect, useState, useRef, use } from 'react';
import { InputField } from '@/components/form';
import { useScrollBehavior } from '@/hooks';
import { AccountList } from '../account/list';
import { SidePanelSection } from './side-panel-section';
import { HashtagList } from '../hashtags';
import { rangeLimit } from '@/utils';

export const SidePanel = () => {
  const { isScrolledUp, screenHeight } = useScrollBehavior();
  const sidePanelRef = useRef<HTMLDivElement>(null);
  const [sidePanelHeight, setSidePanelHeight] = useState<number>(0);
  const [sidebarTop, setSidebarTop] = useState(0); // Initial top position of the sidebar

  useEffect(() => {
    function handleScroll() {
      if (sidePanelRef.current) {
        setSidePanelHeight(sidePanelRef.current.getBoundingClientRect().height);
      }

      setSidebarTop((prevTopPosition) => {
        const minTop = screenHeight - sidePanelHeight;
        const newTop = rangeLimit(
          prevTopPosition + (isScrolledUp ? 1 : -1) * 10, // Adjust the scroll speed as desired
          minTop,
          0,
        );
        return newTop;
      });
    }
    // Attach the event listener to the mouse wheel scroll event
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolledUp, sidePanelHeight, screenHeight]);
  return (
    <div
      className="flex-1 pb-0 hidden lg:block lg:sticky top-0 min-h-screen"
      // style={{ top: `${sidebarTop}px` }}
    >
      <div className={`sticky top-0 z-10 bg-white dark:bg-slate-900`}>
        <div className="py-4">
          <InputField
            id="app-search"
            name="Search"
            placeholder="Search app"
            className="mb-4"
          />
        </div>
      </div>
      <div
        className=" space-y-16 min-h-screen sticky top-28 overflow-hidden pb-60  transition-all  duration-75"
        ref={sidePanelRef}
        style={{ transform: `translateY(${sidebarTop}px)` }}
        // style={{ top: `${sidebarTop}px` }}
      >
        <SidePanelSection id="trendsForYou" title="Trending">
          <HashtagList />
        </SidePanelSection>
        <SidePanelSection id="channelSubscriptions" title="Latest Channels">
          <AccountList />
        </SidePanelSection>
      </div>
    </div>
  );
};
