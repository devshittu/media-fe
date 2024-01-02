import React from 'react';
import { Bookmark } from '../../types';
import { Link } from '@/components/labs';

import { Tag } from '@/components/blocks/tag';
import { CacheRefType } from '@/types';
import { BookmarkDebug } from '../debug';
import { ContextMenu } from '../context-menu';
type BookmarkBlockProps = {
  bookmark: Bookmark;
  cacheRefQueryKey: CacheRefType;
};
export const BookmarkItem = ({
  bookmark,
  cacheRefQueryKey,
}: BookmarkBlockProps) => {
  return (
    <div key={bookmark?.id}>
      <Link
        href={`/stories/${bookmark?.story?.slug}`}
        className=" block hover:bg-slate-100 dark:hover:bg-slate-700"
      >
        <div className="mx-4 items-center block p-3">
          {/* TODO: redesign this content display. */}
          <Tag variant={`green`}>{bookmark?.bookmark_category}</Tag>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {bookmark?.title}
          </h3>
          <p className="mb-4 text-base font-normal text-slate-500 dark:text-slate-400">
            {bookmark?.note}
          </p>
        </div>
      </Link>

      {/* Context Menu Trigger */}
      <ContextMenu bookmark={bookmark} cacheRefQueryKey={cacheRefQueryKey} />
      <BookmarkDebug bookmark={bookmark} cacheRefQueryKey={cacheRefQueryKey} />
    </div>
  );
};
