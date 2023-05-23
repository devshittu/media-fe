import { NavMain } from '@/components/blocks/nav-main';
import { SidePanel } from '@/components/blocks/side-panel';
import { StoryItem, StoryItem2 } from '@/components/blocks/stories';
import { useScrollBehavior } from '@/hooks';
import { useState } from 'react';
// import feedsStyles from '@/styles/feeds.module.css';

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isScrolledUp } = useScrollBehavior();

  const toggleSidebar = () => {
    console.log('toggle sidebar clicked');
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative container lg:grid lg:grid-cols-10 lg:max-w-7xl mx-auto`}
    >
      <NavMain active={isOpen} />
      <main className={`w-full lg:col-span-8`}>
        <div
          className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
        >
          <div
            className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px] box-border border-slate-100 dark:border-slate-800`}
          >
            <header
              className={`sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-500/40 bg-slate-50/75 dark:bg-slate-900/75 `}
            >
              <div className="flex items-center p-4 border-bx border-slate-900/10x lg:hidden dark:border-slate-50/[0.06]x">
                <button
                  type="button"
                  className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  onClick={toggleSidebar}
                >
                  <span className="sr-only">Navigation</span>
                  <svg width="24" height="24">
                    <path
                      d="M5 6h14M5 12h14M5 18h14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>
                <ol className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0">
                  {/* <li className="flex items-center">
                    Borders
                    <svg
                      width="3"
                      height="6"
                      aria-hidden="true"
                      className="mx-3 overflow-visible text-slate-400"
                    >
                      <path
                        d="M0 0L3 3L0 6"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                  </li> */}
                  <li className="font-semibold text-slate-900 truncate dark:text-slate-200">
                    Outline Style
                  </li>
                </ol>
              </div>
              <div
                className={`hidden  transition-all duration-500 ${
                  !isScrolledUp ? 'relative  -top-400' : 'lg:flex'
                }`}
              >
                <h1 className="mb-4x text-4xlx text-xl p-4 pl-8 font-extrabold leading-none tracking-tight text-slate-900 md:text-5xlx lg:text-6xlx dark:text-white">
                  Home
                </h1>
              </div>
              <div className={`${isScrolledUp ? 'relative' : 'sticky top-0'}`}>
                <ul
                  className="flex justify-around -mb-px text-sm font-medium text-center"
                  id="myTab"
                  data-tabs-toggle="#myTabContent"
                  role="tablist"
                >
                  <li className="mr-2" role="presentation">
                    <button
                      className="inline-block p-4 border-b-4 rounded-t-lg border-slate-500 dark:border-slate-200  font-semibold text-slate-900 truncate dark:text-slate-200"
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
                      className="inline-block p-4 border-b-4 border-transparent    hover:text-slate-600 hover:border-slate-300 dark:hover:text-slate-300"
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
            {/* <StoryItem2 /> */}
            <StoryItem />
            <StoryItem />
            <StoryItem />
            <StoryItem />
          </div>
          <div
            className={`relative hidden lg:flex p-0 z-0 min-w-0 min-h-0 box-border my-0 ml-0 flex-shrink-0 basis-auto flex-col border-0 w-[350px] items-stretch`}
          >
            <SidePanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
