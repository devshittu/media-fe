import React from 'react';
import Heading from './heading';

interface HeadingsProps {
  headings: Heading[];
  activeId: string;
}

const Headings: React.FC<HeadingsProps> = ({ headings, activeId }) => (
  <ul>
    {headings.map((heading) => (
      <Heading key={heading.id} heading={heading} activeId={activeId} />
    ))}
  </ul>
);

export default Headings;
