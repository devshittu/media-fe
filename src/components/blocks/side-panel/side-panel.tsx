import React, { useEffect, useState, useRef, use } from 'react';
import { InputField } from '@/components/form';
import { useScrollBehavior } from '@/hooks';
import { AccountList } from '../account/list';
import { SidePanelSection } from './side-panel-section';
import { HashtagList } from '../hashtags';
import { rangeLimit } from '@/utils';

export const SidePanel = () => {
  const { isScrolledUp, yPosition, screenHeight } = useScrollBehavior();
  const sidePanelRef = useRef<HTMLDivElement>(null);
  const [sidePanelHeight, setSidePanelHeight] = useState<number>(0);

  const [sidebarTop, setSidebarTop] = useState(0); // Initial top position of the sidebar

  useEffect(() => {
    function handleScroll() {
      // console.log('screenHeight', screenHeight);
      if (sidePanelRef.current) {
        setSidePanelHeight(sidePanelRef.current.clientHeight);
        // console.log('sidePanelHeight', sidePanelHeight);
        // console.log(
        //   `screenHeight (${screenHeight}) - sidePanelHeight(${sidePanelHeight}) = `,
        //   screenHeight - sidePanelHeight,
        // );
      }
      // Increase or decrease the position of the header based on the scroll direction
      setSidebarTop((prevTopPosition) => {
        const newTop = rangeLimit(
          (isScrolledUp ? prevTopPosition + 1 : prevTopPosition - 1) * 10,
          -200,
          0,
        ); // 1 is the speed
        return newTop;
      });
    }

    // Attach the event listener to the mouse wheel scroll event
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolledUp]);
  return (
    <div
      className="flex-1 pb-0 hidden lg:block lg:sticky top-0 min-h-screen"
      // style={{ top: `${sidebarTop}px` }}
    >
      {/* <div className={`sticky top-0 pb-16 `}> */}
      <div className={`sticky top-0 z-10 bg-white dark:bg-slate-900`}>
        <div className="py-4">
          <InputField name="Search" placeholder="Search app" className="mb-4" />
        </div>
      </div>
      <div
        className=" space-y-16 min-h-screen sticky top-24 overflow-hidden pb-60"
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
