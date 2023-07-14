import React from 'react';
import { Link } from '@/components/labs/typography';
import { SidePanelSectionProps } from './types';

export const SidePanelSection = ({
  id,
  title,
  children,
}: SidePanelSectionProps) => {
  return (
    <section className="w-full max-w-md font-inter" id={id}>
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white"  id={`${id}Title`}>
          {title}
        </h5>
        <Link
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500" 
          id={`${id}LinkToAll`}
        >
          View all
        </Link>
      </div>
      <div className="flow-root">{children}</div>
    </section>
  );
};
