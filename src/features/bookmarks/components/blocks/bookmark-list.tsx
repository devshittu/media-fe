import React from 'react'
import { Bookmark } from '../../types';
import { Link } from '@/components/labs';
import { BarChartIcon, EyeIcon, FlagIcon, Icon, ShareIcon } from '@/components/illustrations';
import { BookmarkItem } from './bookmark-item';
type BookmarkBlockProps = {
  data: Bookmark[];
};
export const BookmarkList = ({data}: BookmarkBlockProps) => {
  return (
        <ol className="mt-3 divide-y divider-slate-200 dark:divide-slate-700">
          {data.map((item) => (
            <BookmarkItem key={item.id} bookmark={item}/>
            
          ))}
        </ol>
  )
}
