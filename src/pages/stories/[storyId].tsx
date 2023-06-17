'use client';
import { ReactElement, use, useEffect, useState } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoryList, StoryListItem } from '@/components/blocks/stories/';
import {
  useChildrenStories,
  useParentStories,
  useStory,
} from '@/testing/test-data';
import { TableOfContents } from '@/components/blocks/table-of-contents/';
import { useRouter } from 'next/router';
import { StoryItem } from '@/testing';
import { Loading } from '@/components/loading';
import { NotFound } from '@/components/not-found';

const Index = () => {
  const [stories, setStories] = useState<StoryItem[]>([]);

  const router = useRouter();
  const storyId = router.query.storyId as string;
  const story = useStory(storyId);
  const parentStories = useParentStories(storyId);
  const childrenStories = useChildrenStories(storyId);

  if (story.isLoading) {
    return <Loading />;
  }

  if (!story.data) {
    return <NotFound />;
  }
  // setStories([story.data]);
  // useEffect(() => {
  //   if (story.data !== null) {
  //     console.log('story.data', story.data);
  //     setStories([story.data]);
  //   }
  // }, [story.data]);

  // useEffect(() => {
  //   if (
  //     parentStories.data !== null &&
  //     story !== null &&
  //     childrenStories.data !== null
  //   ) {
  //     setStories([
  //       ...parentStories.data,
  //       story,
  //       ...childrenStories.data,
  //     ]);
  //   }
  // }, [parentStories.data, story, childrenStories.data]);

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
          <StoryList
            data={[
              ...(parentStories.data || []),
              story.data,
              ...(childrenStories.data || []),
            ]}
          />
        </section>
      </div>
      <div
        className={`relative hidden lg:flex p-0 z-0 min-w-0 min-h-0 box-border my-0 ml-0 flex-shrink-0 basis-auto flex-col border-0 w-[350px] items-stretch`}
      >
        {/* <TimelineScrollbar /> */}
        <TableOfContents />
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default Index;
