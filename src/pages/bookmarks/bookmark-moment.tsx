import { GlobeIcon, Icon } from '@/components/illustrations';
import { StoryItem } from '@/testing';
import Image from 'next/image';
import { Link } from '@/components/labs/typography';
import React from 'react';

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
  momentData: StoryItem[] | BookmarkMomentItem[];
};

const BookmarkMoment = ({ time, momentData }: BookmarkMomentProps) => {
  return (
    <section className="flex flex-col space-y-5">
      <div className="p-5x">
        <time className="ml-4 text-lg font-semibold text-slate-900 dark:text-white">
          {time}
        </time>
        <ol className="mt-3 divide-y divider-slate-200 dark:divide-slate-700">
          {momentData.map((moment) => (
            <li key={moment.id}>
              <Link
                href={`/stories/${moment.slug}`}
                className=" block hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <div className="mx-4 items-center block p-3">
                  {/*
                   //Todo redesign this content display. */}

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {moment.title}
                  </h3>
                  <p className="mb-4 text-base font-normal text-slate-500 dark:text-slate-400">
                    {moment?.body}
                    <br></br>
                    Story overview and analytics and possibly buttons for
                    sharing.
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default BookmarkMoment;
