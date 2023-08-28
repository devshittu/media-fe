import { useIntersectionObserver } from '../table-of-contents/hooks/';
import React, { useEffect, useState } from 'react';
import {Headings} from '../table-of-contents/headings';
import { Heading, HeadingsLoadingPlaceholder, TableOfContentsProps } from '../table-of-contents';
import { StoryResponse } from '@/features/stories';

export type TimelineScrollbarProps = {
  data?: StoryResponse;
};

const TimelineScrollbar = ({data}: TimelineScrollbarProps) => {
  const [activeId, setActiveId] = useState<string>();
  // const { nestedHeadings } = useHeadingsData();
  const [nestedHeadings, setNestedHeadings] = useState<Heading[]>([]);


  useEffect(() => {
    if (data && data.stories && data.stories.length > 0) {
      
      // Transform your data into nestedHeadings here
      const newNestedHeadings = data?.stories.map((story) => {
        return {
          id: story.slug,  // Replace with actual id field
          title: `${story.id} ${story.title}`,  // Replace with actual title field
          items: []  // Populate this array based on your data structure
        };
      });
      setNestedHeadings(newNestedHeadings);
    }
  }, [data]);
  useIntersectionObserver(setActiveId);
  if (!data) {
    return <HeadingsLoadingPlaceholder />; // or show a loading indicator
  }

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
