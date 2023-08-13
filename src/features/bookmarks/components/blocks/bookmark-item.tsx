import React from 'react'
import { Bookmark } from '../../types';
import { Link } from '@/components/labs';
import { BarChartIcon, EyeIcon, FlagIcon, Icon, ShareIcon } from '@/components/illustrations';
type BookmarkBlockProps = {
  bookmark: Bookmark;
};
export const BookmarkItem = ({bookmark}: BookmarkBlockProps) => {
  return (
    
            <li key={bookmark.id}>
              <Link
                href={`${bookmark.url}`}
                className=" block hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <div className="mx-4 items-center block p-3">
                  {/*
                   //Todo redesign this content display. */}

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {bookmark.title}
                  </h3>
                  <p className="mb-4 text-base font-normal text-slate-500 dark:text-slate-400">
                    {bookmark?.note}
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
  )
}
