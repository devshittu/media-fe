import React, { useState } from 'react';
import Headings from './headings';
import useHeadingsData from '@/components/blocks/table-of-contents/hooks/useHeadingsData';
import useIntersectionObserver from './hooks/useIntersectionObserver';

const TableOfContents: React.FC = () => {
  const [activeId, setActiveId] = useState<string>();
  const { nestedHeadings } = useHeadingsData();
  useIntersectionObserver(setActiveId);

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-6 overflow-auto max-h-[calc(100vh-40px)]"
    >
      <Headings headings={nestedHeadings} activeId={activeId || ''} />
    </nav>
  );
};

export default TableOfContents;
