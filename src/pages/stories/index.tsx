import { NavMain } from '@/components/blocks/nav-main';
import { SidePanel } from '@/components/blocks/side-panel';
import { StoryItem, StoryItem2 } from '@/components/blocks/stories';
// import feedsStyles from '@/styles/feeds.module.css';

const Index = () => {
  return (
    <div className={`relative container grid grid-cols-10 max-w-7xl mx-auto`}>
      <NavMain />
      <main className={`col-span-8`}>
        <div
          className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
        >
          {/* <div className={feedsStyles.feeds_stream}> */}
          <div
            className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-[640px] box-border border-slate-100 dark:border-slate-800`}
          >
            <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-slate-50/75 dark:bg-slate-900/75">
              <div>
                <h1 className="mb-4x text-4xlx text-xl p-4 pl-8 font-extrabold leading-none tracking-tight text-slate-900 md:text-5xlx lg:text-6xlx dark:text-white">
                  Home
                </h1>
              </div>
              <div className="relative">
                <ul
                  className="flex justify-around -mb-px text-smx font-medium text-center"
                  id="myTab"
                  data-tabs-toggle="#myTabContent"
                  role="tablist"
                >
                  <li className="mr-2" role="presentation">
                    <button
                      className="inline-block p-4 border-b-4 rounded-t-lg border-slate-500 dark:border-slate-200"
                      id="profile-tab"
                      data-tabs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      For You
                    </button>
                  </li>
                  <li role="presentation">
                    <button
                      className="inline-block p-4 border-b-4 border-transparent rounded-t-lg hover:text-slate-600 hover:border-slate-300 dark:hover:text-slate-300"
                      id="dashboard-tab"
                      data-tabs-target="#dashboard"
                      type="button"
                      role="tab"
                      aria-controls="dashboard"
                      aria-selected="false"
                    >
                      Following
                    </button>
                  </li>
                </ul>
              </div>
            </header>
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
