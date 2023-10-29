import React from 'react';
import { HashtagItemProps } from './types';
import { Link } from '@/components/labs/typography';
import { Icon, XIcon } from '@/components/illustrations';
import { Tag } from '../../../components/blocks/tag';

export const HashtagListItem = ({
  hashtag,
  size = 'base',
  closable = false,
}: HashtagItemProps) => {
  const classes = `inline-flex items-center px-2 mr-2 lg:mr-0 
  
   ${
     size === 'large'
       ? 'text-base lg:text-2xl '
       : size === 'base'
       ? 'text-sm lg:text-xl '
       : 'text-xs lg:text-base '
   }
   font-medium text-slate-800 dark:text-slate-300  border-2 border-slate-600 dark:border-slate-400`
    .trim()
    .replace(/\s+/g, ' ');
  return (
    <>
      <Link
        href={`/stories/hashtag/${hashtag.name}`}
        id={hashtag.name}
        className={classes}
      >
        {`#` + hashtag.name}

        {/* &nbsp;&nbsp;<Tag variant='yellow'>{hashtag.stories_count}</Tag> */}
        {closable && (
          <button
            type="button"
            className="inline-flex items-center p-0.5 ml-2 text-sm text-slate-400 bg-transparent rounded-smx hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-600 dark:hover:text-slate-300 "
            data-dismiss-target="#badge-dismiss-dark"
            aria-label="Remove"
          >
            <Icon icon={<XIcon />} className="w-3.5 h-3.5" />
            <span className="sr-only">Remove badge</span>
          </button>
        )}
      </Link>
    </>
  );
};

// src/features/hashtags/components/list-item.tsx
