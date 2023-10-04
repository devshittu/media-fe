import React from 'react';
import { Bookmark } from '../../types';
import { Link } from '@/components/labs';
import {
  BarChartIcon,
  EyeIcon,
  FlagIcon,
  Icon,
  ShareIcon,
} from '@/components/illustrations';
import { Tag } from '@/components/blocks/tag';
type BookmarkBlockProps = {
  bookmark: Bookmark;
};
export const BookmarkItem = ({ bookmark }: BookmarkBlockProps) => {
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
    </div>
  );
};
