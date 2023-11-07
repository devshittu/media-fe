import React, { memo } from 'react';
import { TrendingListItemProps, TrendingListProps } from '../../types';
import {
  ChevronDownIcon,
  Icon,
  TrendingUpIcon,
} from '@/components/illustrations';
import { Bullet, MiddleDot } from '@/components/labs';

const TrendingListItem: React.FC<TrendingListItemProps> = memo(
  ({ rank, category, title, subtitle, onArrowClick }) => {
    return (
      <div className="flex py-3 sm:py-4">
        <div className="flex-1">
          <p className="text-sm font-semibold">
            {rank}. {category} <Bullet className="mx-1 lg:mx-2 " /> Trending
          </p>
          <h2 className=" w-48 font-bold tracking-normal">{title}</h2>
          <p className="inline-flex content-center justify-start  w-48 text-sm font-semiboldx font-serif">
            <span>
              <Icon
                icon={<TrendingUpIcon />}
                className="w-4 h-4 mt-0.5 "
                strokeWidth={2.5}
              />
            </span>
            <Bullet className="mx-1 lg:mx-2 " />
            <span>{subtitle}</span>
          </p>
        </div>
        <div className="flex px-4x py-2 m-2x">
          <button
            onClick={onArrowClick}
            className=" text-2xl rounded-full text-slate-400 hover:bg-slate-800 hover:text-blue-300 float-right"
          >
            {/* SVG icon here */}
            <Icon
              icon={<ChevronDownIcon />}
              strokeWidth={2.5}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    );
  },
);

TrendingListItem.displayName = 'Trending List Item';

const TrendingList: React.FC<TrendingListProps> = ({ trends, onShowMore }) => {
  return (
    <div className=" divide-y divide-slate-200 dark:divide-slate-700 overflow-hidden text-slate-800 dark:text-slate-300">
      {trends.map((trend) => (
        <TrendingListItem key={trend.title} {...trend} />
      ))}
      <div className="flex">
        {/* <div className="flex-1 p-4">
          <button onClick={onShowMore} className="px-4 ml-2 w-48 font-semibold text-sm text-blue-400">Show more</button>
        </div> */}
      </div>
    </div>
  );
};

export { TrendingListItem, TrendingList };

// Path: src/features/trends/components/blocks/trends.tsx
