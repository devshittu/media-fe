import { NavDrawerLeft, NavMain } from '@/components/blocks/nav';
import { SidePanel } from '@/components/blocks/side-panel';
import { StoryItem, StoryItem2 } from '@/components/blocks/stories';
import { useScrollBehavior } from '@/hooks';
import { useState } from 'react';

const Index = () => {
  const { isScrolledUp } = useScrollBehavior();

  return (
    <div
      className={`relative container lg:grid lg:grid-cols-10 lg:max-w-7xl mx-auto`}
    >
      <NavMain />
      <main className={`w-full lg:col-span-8`}>
        <div
          className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
        >
          <div
            className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px] box-border border-slate-100 dark:border-slate-800`}
          >
            <header
              className={`sticky top-0 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-20 lg:border-b lg:border-slate-900/10 dark:border-slate-500/40 bg-slate-50/75 dark:bg-slate-900/75 `}
            >
              {/* ${
                  !isScrolledUp ? 'absolute hidden ' : 'lg:flex  relative'
                } */}
              <div className={`flex items-center p-4 lg:hidden `}>
                <NavDrawerLeft />
                <ol className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0">
                  <li className="font-semibold text-slate-900 truncate dark:text-slate-200">
                    Home
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
