import {
  NavDrawerLeft,
  NavDrawerTop,
  NavDrawerRight,
  NavMain,
} from '@/components/blocks/nav';
import { SidePanel } from '@/components/blocks/side-panel';
import { StoryItem } from '@/components/blocks/stories';
import { useScrollBehavior } from '@/hooks';
import { useState } from 'react';
import Link from 'next/link';
import ThemeSwitch from '@/components/theme-switch/theme-switch';

const Index = () => {
  const { isScrolledUp, yPosition } = useScrollBehavior();

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
            {/* Desktop */}
            <header
              className={`hidden lg:block sticky top-0 w-full backdrop-blur flex-none  transition-all  duration-350 ease-out  lg:z-20 lg:border-b lg:border-slate-900/10 dark:border-slate-500/40 bg-slate-50/75 dark:bg-slate-900/75 
                ${
                  isScrolledUp || yPosition === 0
                    ? 'transform translate-x-0 translate-z-0 translate-y-0 '
                    : 'transform translate-x-0 translate-z-0 translate-y-[-53px]'
                }
              `}
            >
              <div className={`flex items-center p-4 lg:hidden `}>
                {/* <NavDrawerLeft /> */}
                <ol className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0">
                  <li className="font-semibold text-slate-900 truncate dark:text-slate-200">
                    Home
                  </li>
                </ol>
              </div>
              <div className={`transition-all duration-350 ease-out`}>
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
            {/* mobile */}
            <header
              className={`lg:hidden fixed left-0 top-[-1.5px] w-full backdrop-blur flex-none transition-all duration-350 ease-out lg:z-20 lg:border-b lg:border-slate-900/10 dark:border-slate-500/40 bg-slate-50/75 dark:bg-slate-900/75 
              transform translate-x-0 translate-z-0 
              ${
                isScrolledUp || yPosition === 0
                  ? 'translate-y-0 '
                  : 'translate-y-[-53px]'
              }`}
            >
              <div className={`flex items-center p-4 lg:hidden `}>
                <NavDrawerLeft>
                  <MenuLeft />
                </NavDrawerLeft>
                <NavDrawerRight>
                  <MenuLeft />
                </NavDrawerRight>
                <NavDrawerTop>
                  <MenuTop />
                </NavDrawerTop>
                <ol className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0">
                  <li className="font-semibold text-slate-900 truncate dark:text-slate-200">
                    Home
                  </li>
                </ol>
              </div>
              <div>
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
            <section>
              <div className={`mt-28 lg:mt-0`}>
                <StoryItem />
                {/* <StoryItem2 /> */}
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
              </div>
            </section>
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

const MenuTop = () => {
  return (
    <>
      <p className="max-w-lg mb-6 text-sm text-slate-500 dark:text-slate-400">
        Supercharge your hiring by taking advantage of our{' '}
        <Link
          href="#"
          className="text-blue-600 underline font-medium dark:text-blue-500 hover:no-underline"
        >
          limited-time sale
        </Link>{' '}
        for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked
        candidates and the #1 design job board.
      </p>
      <Link
        href="#"
        className="px-4 py-2 mr-2 text-sm font-medium text-center text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none hover:bg-slate-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600 dark:hover:text-white dark:hover:bg-slate-700"
      >
        Learn more
      </Link>
      <Link
        href="#"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Get access{' '}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
    </>
  );
};
const MenuLeft = () => {
  return (
    <nav className="py-4 overflow-y-auto">
      <ul className="space-y-2 font-medium">
        <li>
          <Link
            href="#"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span className="ml-3">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
            <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
              Pro
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
              <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
              3
            </span>
          </Link>
        </li>
      </ul>

      <div className="grid grid-cols-2 gap-4">
        <Link
          href="#"
          className="px-4 py-2 text-sm font-medium text-center text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none hover:bg-slate-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600 dark:hover:text-white dark:hover:bg-slate-700"
        >
          <ThemeSwitch />
        </Link>
        <Link
          href="#"
          className="px-4 py-2 text-sm font-medium text-center text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none hover:bg-slate-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600 dark:hover:text-white dark:hover:bg-slate-700"
        >
          Learn more
        </Link>
        <Link
          href="#"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Get access{' '}
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </nav>
  );
};

export default Index;
