import { SidePanel } from '@/components/blocks/side-panel';
import { Toast } from '@/components/blocks/toast';
import { ReactElement, useRef } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoryList } from '@/components/blocks/stories/';

// import { getAllStories } from '@/testing/test-data';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { StoryItem } from '@/testing';
import { getStories, useStories } from '@/features/stories';
type PublicStoriesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
const Index = ({ stories }: PublicStoriesPageProps) => {
  const storiesFromUse = useStories({
    // params: {
    //   organizationId: user.data?.organizationId,
    // },
  });
  const handleToastClose = () => {
    console.log('Toast closed');
  };
  const ShowToast = () => {
    const notify = new Toast({
      message: 'Hello, world!',
      position: 'bottom-center',
      type: 'success',
      onClose: () => {
        // Handle close event
        handleToastClose();
      },
      duration: 5000,
    });

    notify.open();
  };

  return (
    <div
      className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
    >
      <div
        className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px] box-border border-slate-100 dark:border-slate-800`}
      >
        <StoriesPageHeader pageTitle="Home" />
        <>
          {/* <StoryList data={stories} scrollInfinite /> */}
          <StoryList
            data={storiesFromUse.data}
            isLoading={storiesFromUse.isLoading}
            scrollInfinite
          />
        </>
      </div>
      <div
        className={`relative hidden lg:flex p-0 z-0 min-w-0 min-h-0 box-border my-0 ml-0 flex-shrink-0 basis-auto flex-col border-0 w-[350px] items-stretch`}
      >
        <SidePanel />
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
  // console.log('getServerSideProps:params:// ', params);
  const categoryId = params?.categoryId as string;
  // const stories = await getAllStories().catch(() => [] as StoryItem[]);
  const stories = await getStories({
    params: {
      categoryId: categoryId,
    },
  }).catch(() => [] as StoryItem[]);

  return {
    props: {
      stories,
    },
  };
};

export default Index;
