import { SidePanel } from '@/components/blocks/side-panel';
import { StoryItem } from '@/components/blocks/stories';
import { Toast } from '@/components/blocks/toast';
import { Button } from '@/components/button';
import { ReactElement } from 'react';
import PublicLayout from '@/layouts/public-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';

const Index = () => {
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

  const loadLatest = () => {
    console.log('Loading latest');
  };
  return (
    <div
      className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
    >
      <div
        className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px] box-border border-slate-100 dark:border-slate-800`}
      >
        <StoriesPageHeader />
        <section>
          <div className={`mt-28 lg:mt-0`}>
            <div
              className={`flex align-middle items-center justify-centerx justify-around min-h-[56px]`}
            >
              <Button onClick={loadLatest}>Load new feeds</Button>
              <Button onClick={ShowToast}>Show Toast</Button>
            </div>
            <article>
              <StoryItem />
              <StoryItem />
              <StoryItem />
              <StoryItem />
              <StoryItem />
            </article>
          </div>
        </section>
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
  return <PublicLayout>{page}</PublicLayout>;
};

export default Index;
