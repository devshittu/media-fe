import React, { memo, useState } from 'react';
import { Storyline } from '../../types';
import { Link } from '@/components/labs';
import { Tag } from '@/components/blocks/tag';
import {
  ExpandableHashtagList,
} from '@/features/hashtags';
import { StorylineStats } from '../storyline-stats';
type StorylineBlockProps = {
  storyline: Storyline;
};

export const StorylineItem = ({ storyline }: StorylineBlockProps) => {
  const TransformedHashtags = storyline?.hashtags.map((hashtagName) => {
    return {
      name: hashtagName,
      stories_count: 0, // Todo: take out the magic number
    };
  });
  return (
    <div key={storyline?.id}>
      <div className="mx-4 items-center block p-3">
        {/* TODO: redesign this content display. */}
        {/* <Tag variant={`green`}>{storyline?.storyline_category}</Tag> */}
        <Link href={`/storylines/${storyline?.id}`}>
          <h3 className="story-header sm:text-2xl text-xl title-font mt-4 mb-4  font-extrabold tracking-tight text-slate-900 dark:text-slate-200">
            {storyline?.summary}
          </h3>
        </Link>
        <p className="leading-relaxed text-lg mb-8 text-justify text-slate-800 dark:text-slate-300">
          {storyline?.description}
        </p>
        <p>{storyline?.subject}</p>

        <ExpandableHashtagList hashtags={TransformedHashtags} size="small" />

        <StorylineStats
          viewCount={0}
          commentCount={0}
          likesCount={0}
          dislikesCount={0}
          storiesCount={0}
        />
      </div>
    </div>
  );
};
