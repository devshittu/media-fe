import React, { useState } from 'react';
import {Headings} from './headings';
import useHeadingsData from '@/components/blocks/table-of-contents/hooks/useHeadingsData';
import useIntersectionObserver from './hooks/useIntersectionObserver';
import { HeadingsLoadingPlaceholder } from './headings-loading-placeholder';
import { Story } from '@/features/stories';

export type TableOfContentsProps = {
  data?: Story[];
};

export const TableOfContents = ({ data }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>();
  const { nestedHeadings } = useHeadingsData();
  useIntersectionObserver(setActiveId);
  if (!data) {
    return <HeadingsLoadingPlaceholder />; // or show a loading indicator
  }

  return (
    <nav
      aria-label="Table of contents"
      className="overflow-auto max-h-[calc(100vh-40px)]"
    >
      <Headings headings={nestedHeadings} activeId={activeId || ''} />
    </nav>
  );
};

// Path: media-fe/src/components/blocks/table-of-contents/table-of-contents.tsx