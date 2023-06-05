import React, { useEffect, useState, useRef } from 'react';
import { InputField } from '@/components/form';
import { useScrollBehavior } from '@/hooks';
import { AccountList } from '../account/list';
import { SidePanelSection } from './side-panel-section';
import { HashtagList } from '../hashtags';

export const SidePanel = () => {
  const { isScrolledUp, yPosition, screenHeight } = useScrollBehavior();
  const sidePanelRef = useRef<HTMLDivElement>(null);
  const [sidePanelHeight, setSidePanelHeight] = useState<number>(0);

  useEffect(() => {
    if (sidePanelRef.current) {
      setSidePanelHeight(sidePanelRef.current.clientHeight);
    }
  }, []);

  // console.log('screenHeight', screenHeight);
  // console.log('sidePanelHeight', sidePanelHeight);
  // console.log('screenHeight', screenHeight);
  return (
    <div className="flex-1 pb-0 hidden lg:block">
      {/* <div className={`sticky top-0 pb-16 `}> */}
      <div className={`sticky top-0 z-10 pb-2 bg-white dark:bg-slate-900`}>
        <div className="py-4">
          <InputField name="Search" placeholder="Search app" className="mb-4" />
        </div>
      </div>
      {/* className=" space-y-16 min-h-screen sticky top-40" */}
      <div className=" space-y-16 min-h-screen sticky" ref={sidePanelRef}>
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
