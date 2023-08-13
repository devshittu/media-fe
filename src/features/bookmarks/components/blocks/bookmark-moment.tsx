import React from 'react';
import { Bookmark, BookmarkList } from '@/features/bookmarks';


export type BookmarkMomentItem = {
  title: string;
  channel?: string;
  channelPhoto: string;
  id: string;
  time: string;
  body: string; //Todo redesign this to bring the StoryItem.
  slug: string;
};
export type BookmarkMomentProps = {
  time: string;
  momentData: Bookmark[]; //| StoryItem[] | BookmarkMomentItem[];
};

export const BookmarkMoment = ({ time, momentData }: BookmarkMomentProps) => {
  return (
    <section className="flex flex-col space-y-5">
      <div className="p-5x">
        <time className="ml-4 text-lg font-semibold text-slate-900 dark:text-white">
          {time}
        </time>
        <BookmarkList data={momentData} />
      </div>
    </section>
  );
};
