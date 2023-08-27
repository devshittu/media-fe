import React, { useState } from 'react';
import Headings from './headings';
import useHeadingsData from '@/components/blocks/table-of-contents/hooks/useHeadingsData';
import useIntersectionObserver from './hooks/useIntersectionObserver';
import { StoryItem } from '@/testing';
import { HeadingsLoadingPlaceholder } from './headings-loading-placeholder';

export type TableOfContentsProps = {
  data: StoryItem[] | null;
};

const TableOfContents = ({ data }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>();
  const { nestedHeadings } = useHeadingsData();
  useIntersectionObserver(setActiveId);
  if (!data) {
    return <HeadingsLoadingPlaceholder />; // or show a loading indicator
  }

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
