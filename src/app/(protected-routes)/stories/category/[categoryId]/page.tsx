import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoriesQueryParams } from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { getStoriesByCategory } from '@/features/stories/api/get-stories-by-category';
import CategorizedStoryList from '../../_component/CategorizedStoryList';

type PublicStoriesPageProps = {
  stories: any[]; // Replace with the appropriate type
  queryParams: StoriesQueryParams;
  error?: string;
};

export default async function StoriesByCategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const queryParams: StoriesQueryParams = {
    categoryId: params.categoryId,
    page: 1,
    per_page: PAGINATE_STORIES_LIMIT,
  };

  try {
    const stories = await getStoriesByCategory({ params: queryParams });

    if (!stories.results || stories.results.length === 0) {
      return (
        <>
          <StoriesPageHeader pageTitle={`:${queryParams.categoryId}`} />
          <p>No stories found.</p>
        </>
      );
    }

    return (
      <>
        <StoriesPageHeader pageTitle={`:${queryParams.categoryId}`} />
        <CategorizedStoryList stories={stories.results} />
      </>
    );
  } catch (error) {
    console.error('Error fetching stories:', error);
    return (
      <>
        <StoriesPageHeader pageTitle={`:${queryParams.categoryId}`} />
        <p>There was an error fetching the stories. Please try again later.</p>
      </>
    );
  }
}
