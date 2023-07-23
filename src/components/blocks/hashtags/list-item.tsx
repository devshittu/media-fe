import React from 'react';
import { HashtagItemProps } from './types';
import { Link } from '@/components/labs/typography';
import { Icon, XIcon } from '@/components/illustrations';
import { Tag } from '../tag';

export const HashtagListItem = ({
  hashtag,
  closable = false,
}: HashtagItemProps) => {
  return (
    <>
      <Link
        href={`/hashtag/${hashtag.label}`}
        id={hashtag.id}
        className="inline-flex items-center px-2 py-1x mr-2 lg:mr-0 text-sm lg:text-xl font-medium text-slate-800 roundedx  bg-slate-100x dark:bg-slate-700x dark:text-slate-300  border-2 border-slate-600 dark:border-slate-400"
      >
        {`#` + hashtag.label }

        {/* &nbsp;&nbsp;<Tag variant='yellow'>{hashtag.count}</Tag> */}
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
