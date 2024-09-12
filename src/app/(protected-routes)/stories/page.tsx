import { ReactElement } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoriesPageFrame } from '@/components/frames';
import { SEO } from '@/components';
import { Story, getStories, getUserFeedStories } from '@/features/stories';
import { cleanObject } from '@/utils';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import ClientStoriesContent from './_component/ClientStoriesContent'; // Import Client Component
import { useHomePageTabs } from '@/stores/tabs';

type StoriesPageProps = {
  stories: Story[];
  userFeed: Story[];
  error?: string;
};

export default async function StoriesPage() {
  const queryParams = cleanObject({
    page: 1,
    page_size: PAGINATE_STORIES_LIMIT,
  });

  try {
    const [userFeedResponse, storiesResponse] = await Promise.all([
      getUserFeedStories({ params: queryParams }),
      getStories({ params: queryParams }),
    ]);

    const props: StoriesPageProps = {
      stories: storiesResponse.results || [],
      userFeed: userFeedResponse.results || [],
    };

    return (
      <>
        <StoriesPageHeader
          pageTitle="Home"
          showTab
          parallax
          tabStore={useHomePageTabs}
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

// StoriesPage.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <UserLayout>
//       <StoriesPageFrame>{page}</StoriesPageFrame>
//     </UserLayout>
//   );
// };

// src/app/(protected-routes)/stories/page.tsx
