import React from 'react';
import { HashtagItemProps } from './types';
import Link from 'next/link';

export const HashtagListItem = ({
  hashtag,
  closable = false,
}: HashtagItemProps) => {
  return (
    <>
      <Link
        href={`/hashtag/${hashtag.name}`}
        id={hashtag.hashtagId}
        role="button"
        className="inline-flex items-center px-2 py-1x mr-2 lg:mr-0 text-sm lg:text-xl font-medium text-slate-800 roundedx  bg-slate-100x dark:bg-slate-700x dark:text-slate-300  border-2 border-slate-600 dark:border-slate-400"
      >
        {`#` + hashtag.name}
        {closable && (
          <button
            type="button"
            className="inline-flex items-center p-0.5 ml-2 text-sm text-slate-400 bg-transparent rounded-smx hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-600 dark:hover:text-slate-300 "
            data-dismiss-target="#badge-dismiss-dark"
            aria-label="Remove"
          >
            <svg
              aria-hidden="true"
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Remove badge</span>
          </button>
        )}
      </Link>
    </>
  );
};
