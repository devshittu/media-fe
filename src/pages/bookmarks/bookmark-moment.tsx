import {
  BarChartIcon,
  EyeIcon,
  FlagIcon,
  GlobeIcon,
  Icon,
  ShareIcon,
} from '@/components/illustrations';
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

                  <div
                    className="grid max-w-full grid-cols-4 gap-1 p-1 mx-auto my-2 bg-slate-100 rounded-lgx dark:bg-slate-600"
                    role="group"
                  >
                    <div className="px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-200 dark:text-white dark:hover:bg-slate-700 rounded-lg">
                      <Icon
                        icon={<BarChartIcon />}
                        className="w-5"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-200 dark:text-white dark:hover:bg-slate-700 rounded-lg">
                      <Icon
                        icon={<FlagIcon />}
                        className="w-5"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 dark:bg-slate-300 dark:text-slate-900 rounded-lgx">
                      <Icon
                        icon={<EyeIcon />}
                        className="w-5"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-200 dark:text-white dark:hover:bg-slate-700 rounded-lg">
                      <Icon
                        icon={<ShareIcon />}
                        className="w-5"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>
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
