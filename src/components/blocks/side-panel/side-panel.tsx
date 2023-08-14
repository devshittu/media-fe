import React, { useEffect, useState, useRef, useMemo } from 'react';
import { InputField } from '@/components/form';
import { useScrollBehavior, useScrollSpeed } from '@/hooks';
import { AccountList } from '../../../features/users/components/blocks/list';
import { Pane } from './pane';
import { HashtagList } from '@/features/hashtags/components';
import { useScrollSync } from '@/hooks/useScrollSync';
import { PaneConfig } from './types';

type SidePanelProps = {
  sections: PaneConfig[];
};

export const SidePanel = ({ sections }: SidePanelProps) => {
  const { screenHeight } = useScrollBehavior();
  const sidePanelRef = useRef<HTMLDivElement>(null);
  const [sidePanelHeight, setSidePanelHeight] = useState<number>(0);

  useEffect(() => {
    // Listen for changes in the content rendered by <HashtagList /> and <AccountList />
    // This effect will run after the content has updated
    if (sidePanelRef.current) {
      const sidePanelTop = sidePanelRef.current.getBoundingClientRect().top;
      const sidePanelHeightIn =
        sidePanelRef.current.getBoundingClientRect().height;
      setSidePanelHeight(
        Math.abs(screenHeight - (sidePanelHeightIn - sidePanelTop)),
      );
    }
  }, [sidePanelRef.current?.innerHTML, screenHeight]); // This effect will run whenever the content rendered by <HashtagList /> or <AccountList /> changes

  const { topPosition: sidebarTop } = useScrollSync(sidePanelHeight || 0); // top position set to 60

  const renderedSections = useMemo(
    () =>
      sections.map((section) => (
        <Pane
          key={section.id}
          id={section.id}
          title={section.title}
        >
          {section.component}
        </Pane>
      )),
    [sections],
  );

  return (
    <div className="flex-1 pb-0 hidden lg:block lg:sticky top-0 min-h-screen">
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
        className=" space-y-16 min-h-screen sticky top-28 overflow-hidden pb-60  transition-all  duration-100 ease-out"
        ref={sidePanelRef}
        style={{ transform: `translateY(${sidebarTop}px)` }}
      >
        {renderedSections}
      </div>
    </div>
  );
};

// Path: src/components/blocks/side-panel/side-panel.tsx
