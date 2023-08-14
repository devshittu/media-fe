import React from 'react';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { useStoriesByHashtag } from '@/features/stories';
import { StoryList } from '@/features/stories/components';
import { useRouter } from 'next/router';
type ExploreProps = {
  children: React.ReactNode;
  hashtag?: string;
};
export const Explore = ({ children, hashtag }: ExploreProps) => {
  return (
    <>
      <StoriesPageHeader
        pageTitle={`Explore: ${hashtag ? `#${hashtag}` : ''}`}
      />

      <section className="md:mb-36 flex justify-center w-full">
        <section className="max-w-xl md:max-w-2xl">{children}</section>
      </section>
    </>
  );
};
