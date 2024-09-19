import { ReactElement } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoriesPageFrame } from '@/components/frames';
import { SEO } from '@/components';
import { Story, getStories, getUserFeedStories } from '@/features/stories';
import { cleanObject } from '@/utils';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import ClientStoriesContent from './_component/ClientStoriesContent'; // Import Client Component
import { useSearchPageTabs } from '@/stores/tabs';

type SearchPageProps = {
  stories: Story[];
  userFeed: Story[];
  error?: string;
};

export default async function SearchPage() {
  const queryParams = cleanObject({
    page: 1,
    page_size: PAGINATE_STORIES_LIMIT,
  });

  try {
    const [userFeedResponse, storiesResponse] = await Promise.all([
      getUserFeedStories({ params: queryParams }),
      getStories({ params: queryParams }),
    ]);

    const props: SearchPageProps = {
      stories: storiesResponse.results || [],
      userFeed: userFeedResponse.results || [],
    };

    return (
      <>
        <StoriesPageHeader
          pageTitle="Search Results"
          showTab
          parallax
          tabStore={useSearchPageTabs}
        />
        <ClientStoriesContent {...props} />
      </>
    );
  } catch (error) {
    console.error('Error fetching stories:', error);
    return (
      <div>
        <p>There was an error fetching the stories. Please try again later.</p>
      </div>
    );
  }
}
