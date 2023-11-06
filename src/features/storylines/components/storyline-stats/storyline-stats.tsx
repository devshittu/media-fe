import React from 'react';
import { Link } from '@/components/labs/typography';
import {
  EyeIcon,
  MessageSquareIcon,
  ExternalLinkIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  ListIcon,
  ShareIcon,
  ClockIcon,
} from '@/components/illustrations';
import { Button } from '@/components/button';
import Image from 'next/image';
import { formatDate } from '@/utils';

type StorylineStatsProps = {
  viewCount: number;
  commentCount: number;
  likesCount: number;
  dislikesCount: number;
  storiesCount: number;
};

export const StorylineStats = ({
  viewCount = 0,
  commentCount = 0,
  likesCount = 0,
  dislikesCount = 0,
  storiesCount = 0,
}: StorylineStatsProps) => {
  const handleStorylinePop = () => alert('Storyline');
  const lastUpdated = formatDate(1698184911);
  return (
    <>
      {/* <div className="flex justify-start mb-4 border-t border-slate-100">
        <div className="flex w-full mt-1 pt-2 pl-5">
          <span className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-slate-400 cursor-pointer mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width="14px"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              ></path>
            </svg>
          </span>

          <div className="flex -space-x-4">
            <Image
              width={32}
              height={32}
              className="w-10 h-10 border-2 border-white rounded-full dark:border-slate-800"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
              alt=""
            />
            <Image
              width={32}
              height={32}
              className="w-10 h-10 border-2 border-white rounded-full dark:border-slate-800"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
              alt=""
            />
            <Image
              width={32}
              height={32}
              className="w-10 h-10 border-2 border-white rounded-full dark:border-slate-800"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
              alt=""
            />
            <Link
              className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-slate-700 border-2 border-white rounded-full hover:bg-slate-600 dark:border-slate-800"
              href="#"
            >
              +99
            </Link>
          </div>
          <Image
            width={32}
            height={32}
            className="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
            alt=""
          />
          <Image
            width={32}
            height={32}
            className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
            alt=""
          />
          <Image
            width={32}
            height={32}
            className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
            alt=""
          />
          <Image
            width={32}
            height={32}
            className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
            alt=""
          />
        </div>
        <div className="flex justify-end w-full mt-1 pt-2 pr-5">
          <span className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width="14px"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              ></path>
            </svg>
          </span>
          <span className="transition ease-out duration-300 hover:bg-slate-50 bg-slate-100 h-8 px-2 py-2 text-center rounded-full text-slate-100 cursor-pointer">
            <svg
              className="h-4 w-4 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              ></path>
            </svg>
          </span>
        </div>
      </div> */}
      <div className="flex items-center flex-wrap mt-auto w-full">
        {/* Link to "Learn more" */}
        {/* <Link href="/" className="text-cyan-500 inline-flex items-center">
        <span className="text-base">Learn more</span>
        <ExternalLinkIcon className="w-4 h-4 ml-2" />
      </Link> */}
        <span className="text-slate-500  dark:text-slate-400 inline-flex items-center">
          <ClockIcon className="w-4 h-4 mr-2" />
          <span className="text-base md:text-lg">
            Last updated on {lastUpdated}
          </span>
        </span>

        {/* Share storyline */}
        <span className="text-slate-700 dark:text-slate-300 inline-flex items-center leading-none  ml-auto mr-3 pr-3 py-1 border-r-2 border-slate-200 dark:border-slate-700">
          <EyeIcon className="w-6 h-6 mr-2" strokeWidth={2.5} />
          <h3 className=" text-base md:text-xl">Watch</h3>
        </span>
        {/* Share storyline */}
        <span className="text-slate-700 dark:text-slate-300 inline-flex items-center leading-none  pr-3">
          <ShareIcon className="w-6 h-6 mr-2" strokeWidth={2.5} />
          <h3 className=" text-base md:text-xl ">Share</h3>
        </span>
      </div>
    </>
  );
};

//Path: src/features/stories/components/story-media/story-stats.tsx
