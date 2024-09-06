import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoriesQueryParams } from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { getStoriesByHashtag } from '@/features/stories/api/get-stories-by-hashtag';
import HashtaggedStoryList from '../../_component/HashtaggedStoryList';

type PublicStoriesPageProps = {
  stories: any[]; // Replace with appropriate type
  queryParams: StoriesQueryParams;
  error?: string;
};

export default async function StoriesByHashtagPage({
  params,
}: {
  params: { hashtagId: string };
}) {
  const queryParams: StoriesQueryParams = {
    hashtag: params.hashtagId,
    page: 1,
    page_size: PAGINATE_STORIES_LIMIT,
  };

  try {
    const stories = await getStoriesByHashtag({ params: queryParams });

    if (!stories.results || stories.results.length === 0) {
      return (
        <>
          <StoriesPageHeader pageTitle={`#${queryParams.hashtag}`} />
          <p>No stories found.</p>
        </>
      );
    }

    return (
      <>
        <StoriesPageHeader pageTitle={`#${queryParams.hashtag}`} />
        <HashtaggedStoryList stories={stories.results} />
      </>
    );
  } catch (error) {
    console.error('Error fetching stories:', error);
    return (
      <>
        <StoriesPageHeader pageTitle={`#${queryParams.hashtag}`} />
        <p>There was an error fetching the stories. Please try again later.</p>
      </>
    );
  }
}
// src/app/(protected-routes)/stories/hashtag/[hashtagId]/page.tsx
