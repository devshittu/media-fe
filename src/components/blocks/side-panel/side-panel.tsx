import React, { useEffect, useState, useRef } from 'react';
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

  // useEffect(() => {
  //   // if (sidePanelRef.current) {
  //   //   setSidePanelHeight(sidePanelRef.current.clientHeight);
  //   // }
  //   const handleScroll = () => {
  //     const scrollOffset = window.scrollY;
  //     const minTop = -200; // Minimum top position (-200px)
  //     const maxTop = 0; // Maximum top position (0px)

  //     const newTop = rangeLimit(-scrollOffset - 200, minTop, maxTop); // Calculate the new top position using clamp function
  //     setSidebarTop(newTop);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    function handleScroll() {
      // Increase or decrease the position of the header based on the scroll direction

      setSidebarTop((prevTopPosition) => {
        const newTop = rangeLimit(
          (isScrolledUp ? prevTopPosition + 1 : prevTopPosition - 1) * 1,
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
  // console.log('screenHeight', screenHeight);
  // console.log('sidePanelHeight', sidePanelHeight);
  // console.log('screenHeight', screenHeight);
  return (
    <div
      className="flex-1 pb-0 hidden lg:block lg:sticky top-0"
      // style={{ top: `${sidebarTop}px` }}
    >
      {/* <div className={`sticky top-0 pb-16 `}> */}
      <div className={`sticky top-0 z-10 pb-2 bg-white dark:bg-slate-900`}>
        <div className="py-4">
          <InputField name="Search" placeholder="Search app" className="mb-4" />
        </div>
      </div>
      {/* className=" space-y-16 min-h-screen sticky top-40" */}
      <div
        className=" space-y-16 min-h-screen sticky top-6"
        ref={sidePanelRef}
        style={{ transform: `translateY(${sidebarTop}px)` }}
      >
        {/* ${
          isScrolledUp ? 'sticky top-12 mt-16' : ''
        } */}

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
