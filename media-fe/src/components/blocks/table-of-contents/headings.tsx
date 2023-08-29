import React from 'react';
import { Heading } from './heading';

type HeadingsProps = {
  headings: Heading[];
  activeId: string;
};

export const Headings = ({ headings, activeId }: HeadingsProps) => (
  <ul>
    {headings.map((heading) => (
      <Heading key={heading.id} heading={heading} activeId={activeId} />
    ))}
  </ul>
);

// Path: media-fe/src/components/blocks/table-of-contents/headings.tsx
