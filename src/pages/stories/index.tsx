import { NavMain } from '@/components/blocks/nav-main';
import { SidePanel } from '@/components/blocks/side-panel';
import { StoryItem, StoryItem2 } from '@/components/blocks/stories';
// import feedsStyles from '@/styles/feeds.module.css';

const Index = () => {
  return (
    <div className={`relative container grid grid-cols-10 max-w-7xl mx-auto`}>
      <NavMain />
      <main className={`col-span-8 border-r`}>
        <div
          className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
        >
          {/* <div className={feedsStyles.feeds_stream}> */}
          <div
            className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-[640px] box-border border-slate-100 dark:border-slate-800`}
          >
            <StoryItem />
            <StoryItem />
            <StoryItem />
            <StoryItem />
            <StoryItem />
            {/* <StoryItem2 /> */}
          </div>
          <div
            className={`relative flex p-0 z-0 min-w-0 min-h-0 box-border my-0 ml-0 flex-shrink-0 basis-auto flex-col border-0 w-[350px] items-stretch`}
          >
            <SidePanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
