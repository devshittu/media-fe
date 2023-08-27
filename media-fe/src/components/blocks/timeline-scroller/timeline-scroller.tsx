import { useHeadingsData } from '../table-of-contents/hooks/';
import React, { useState } from 'react';
import Headings from '../table-of-contents/headings';

const TimelineScrollbar = () => {
  const [activeId, setActiveId] = useState<string>();
  const { nestedHeadings } = useHeadingsData();
  return (
    <nav
      aria-label="Timeline Scrollbar"
      className="sticky top-6 overflow-auto max-h-[calc(100vh-40px)]"
    >
      <Headings headings={nestedHeadings} activeId={activeId || ''} />
    </nav>
  );
};

export default TimelineScrollbar;
