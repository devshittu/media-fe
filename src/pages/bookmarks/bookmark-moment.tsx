import { GlobeIcon, Icon } from '@/components/illustrations';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export type BookmarkMomentItem = {
  title: string;
  channel?: string;
  channelPhoto: string;
  id: string;
  time: string;
};
export type BookmarkMomentProps = {
  time: string;
  momentData: BookmarkMomentItem[];
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
                href="#"
                className=" block hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <div className="mx-4 items-center block p-3 sm:flexx">
                  {/*<Image
                    className="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0"
                    src={moment?.channelPhoto}
                    width={48}
                    height={48}
                    alt="Jese Leos image"
                  />
                   //Todo redesign this content display. */}
                  {/* <div className="text-slate-600 dark:text-slate-400">
                    <div className="text-base font-normal">
                      <span className="font-medium text-slate-900 dark:text-white">
                        Jese Leos
                      </span>{' '}
                      likes{' '}
                      <span className="font-medium text-slate-900 dark:text-white">
                        {"Bonnie Green's"}
                      </span>{' '}
                      post in{' '}
                      <span className="font-medium text-slate-900 dark:text-white">
                        {' '}
                        How to start with Media FE library
                      </span>
                    </div>
                    <div className="text-sm font-normal">
                      {"I wanted to share a webinar zeroheight."}
                    </div>
                    <span className="inline-flex items-center text-xs font-normal text-slate-500 dark:text-slate-400">
                      <Icon icon={<GlobeIcon />} className="w-3  mr-1" />
                      Public
                    </span>
                  </div> */}

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Story Title
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
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
