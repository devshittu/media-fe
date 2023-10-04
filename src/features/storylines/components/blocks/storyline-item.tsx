import React from 'react';
import { Storyline } from '../../types';
import { Link } from '@/components/labs';
import { Tag } from '@/components/blocks/tag';
type StorylineBlockProps = {
  storyline: Storyline;
};
export const StorylineItem = ({ storyline }: StorylineBlockProps) => {
  return (
    <div key={storyline?.id}>
      <Link
        href={`/storylines/${storyline?.id}`}
        className=" block hover:bg-slate-100 dark:hover:bg-slate-700"
      >
        <div className="mx-4 items-center block p-3">
          {/* TODO: redesign this content display. */}
          {/* <Tag variant={`green`}>{storyline?.storyline_category}</Tag> */}
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {storyline?.summary}
          </h3>
          <p className="mb-4 text-base font-normal text-slate-500 dark:text-slate-400">
            {storyline?.description}
          </p>
          <p>{storyline?.subject}</p>
          <p>{storyline?.hashtags}</p>
        </div>
      </Link>
    </div>
  );
};
