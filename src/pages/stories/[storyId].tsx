import { StoryItem } from '@/components/blocks/stories';
import { ReactElement } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoryList } from '@/components/blocks/stories/';
import { getAllStories } from '@/testing/test-data';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { TableOfContents } from '@/components/blocks/table-of-contents/';
type PublicStoriesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
const Index = ({ stories }: PublicStoriesPageProps) => {
  return (
    <div
      className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
    >
      <div
        className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px] box-border border-slate-100 dark:border-slate-800`}
      >
        <StoriesPageHeader />
        <section>
          <StoryList data={stories} />
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

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const stories = await getAllStories().catch(() => [] as StoryItem[]);
  return {
    props: {
      stories,
    },
  };
};

export default Index;
