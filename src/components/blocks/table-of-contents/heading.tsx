import { Link } from '@/components/labs/typography';
import React from 'react';

export type Heading = {
  id: string;
  title: string;
  items: Heading[];
};

type HeadingProps = {
  heading: Heading;
  activeId: string;
};

export const Heading = ({ heading, activeId }: HeadingProps) => (
  <li
    className={`group text-base ${
      heading.id === activeId ? 'active text-slate-950 dark:text-slate-50' : ''
    }`}
  >
    <Link
      href={`#${heading.id}`}
      onClick={(e) => {
        e.preventDefault();
        // document.querySelector(`#${heading.id}`)?.scrollIntoView({
        //   behavior: 'smooth',
        // });
        document.querySelector(`#scroll-to-${heading.id}`)?.scrollIntoView({
          behavior: 'smooth',
        });
      }}
    >
      {heading.title}
    </Link>
    {heading.items.length > 0 && (
      <ul>
        {heading.items.map((child) => (
          <Heading key={child.id} heading={child} activeId={activeId} />
        ))}
      </ul>
    )}
  </li>
);

// Path: media-fe/src/components/blocks/table-of-contents/heading.tsx
