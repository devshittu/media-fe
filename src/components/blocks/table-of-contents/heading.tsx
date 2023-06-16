import Link from 'next/link';
import React from 'react';

interface Heading {
  id: string;
  title: string;
  items: Heading[];
}

interface HeadingProps {
  heading: Heading;
  activeId: string;
}

const Heading: React.FC<HeadingProps> = ({ heading, activeId }) => (
  <li className={`group text-base ${heading.id === activeId ? 'active text-slate-950 dark:text-slate-50' : ''}`}>
    <Link
      href={`#${heading.id}`}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(`#${heading.id}`)?.scrollIntoView({
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

export default Heading;
