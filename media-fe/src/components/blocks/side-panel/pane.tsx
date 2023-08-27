import React from 'react';
import { Link } from '@/components/labs/typography';
import { PaneProps } from './types';

export const Pane = ({
  id,
  title,
  children,
  linkHref = '#', // Default value if not provided
  linkText = 'View all', // Default value if not provided
  showLink = true,
}: PaneProps) => {
  return (
    <section className="w-full max-w-md font-inter" id={id}>
      <div className="flex items-center justify-between mb-4">
        <h5
          className="text-xl font-bold leading-none text-gray-900 dark:text-white"
          id={`${id}Title`}
        >
          {title}
        </h5>
        {showLink && (
          <Link
            href={linkHref}
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            id={`${id}LinkToAll`}
          >
            {linkText}
          </Link>
        )}
      </div>
      <div className="flow-root min-h-[260px]">{children}</div>
    </section>
  );
};

// Path: src/components/blocks/side-panel/side-panel-section.tsx
