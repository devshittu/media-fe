import { ReactElement, use, useEffect, useState } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoryList, StoryListItem } from '@/components/blocks/stories/';
import {
  getChildrenStories,
  getParentStories,
  getStory,
  useChildrenStories,
  useParentStories,
  useRelatedStories,
  useStory,
} from '@/testing/test-data';
import { TableOfContents } from '@/components/blocks/table-of-contents/';
import { useRouter } from 'next/router';
import { StoryItem } from '@/testing';
import { Loading } from '@/components/loading';
import { NotFound } from '@/components/not-found';
import { TimelineScrollbar } from '@/components/blocks/timeline-scroller';

const Index = () => {
  const [stories, setStories] = useState<StoryItem[]>([]);

  const router = useRouter();
  const storyId = router.query.storyId as string;
  const story = useStory(storyId);
  // const relatedStories = useRelatedStories(storyId);
  // const parentStories = useParentStories(storyId);
  // const childrenStories = useChildrenStories(storyId);

  useEffect(() => {
    const fetchData = async () => {
      const theStory = await getStory(storyId);
      const parentResponse = await getParentStories(storyId);
      const childrenResponse = await getChildrenStories(storyId);
      setStories([...(parentResponse || []), ...(childrenResponse || [])]);
      console.log([theStory], parentResponse, childrenResponse);
    };

    fetchData();
  }, [storyId]);

  if (story.isLoading) {
    return <Loading />;
  }

  if (!story.data) {
    return <NotFound />;
  }
  return (
    <div
      className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
    >
      <div
        className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px] box-border border-slate-100 dark:border-slate-800`}
      >
        <StoriesPageHeader />
        <section>
          {/* <StoryListItem story={story.data} /> */}
          {/* <StoryList
            data={[
              ...(parentStories.data || []),
              story.data,
              ...(childrenStories.data || []),
            ]}
          /> */}
          <StoryList data={stories} />
        </section>
      </div>
      <div
        className={`relative hidden lg:flex p-0 z-0 min-w-0 min-h-0 box-border my-0 ml-0 flex-shrink-0 basis-auto flex-col border-0 w-[350px] items-stretch`}
      >
        <TableOfContents />
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default Index;

// Path: pages/stories/[storyId]