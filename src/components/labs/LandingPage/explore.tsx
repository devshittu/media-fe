import { StoriesPageHeader } from '@/components/blocks/headers';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { useStoriesByHashtag } from '@/features/stories';
import { StoryList } from '@/features/stories/components';
import { useRouter } from 'next/router';
import React from 'react'
type ExploreProps = {
    hashtag?: string
}
export const Explore = ({hashtag = 'Sustainability'}: ExploreProps) => {
  const storiesByHashtagFromUse = useStoriesByHashtag({
    params: {
      page: 1,
      per_page: PAGINATE_STORIES_LIMIT,
      hashtag: hashtag
    },
  });

  return (
        <>
        <StoriesPageHeader pageTitle={`Explore:#${hashtag}`}  />

        <section className='md:mb-36 flex justify-center w-full'>
        <section className='max-w-xl md:max-w-2xl'>
          <StoryList
            data={storiesByHashtagFromUse.data?.stories}
            totalPages={storiesByHashtagFromUse.data?.total_pages}
            isLoading={storiesByHashtagFromUse.isLoading}
            // scrollInfinite
          />
          </section>
          </section>
        </>
  );
};
