import { useEffect, useRef, useState } from 'react';
import { NavDrawerLeft, NavDrawerRight, NavDrawerTop } from '../nav';
import MainMenu from '@/components/menus/main-menu';
import { TopDrawerMenu } from '@/components/menus';
import { useScrollBehavior } from '@/hooks';
import { rangeLimit } from '@/utils/helper';

export const StoriesPageHeader = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [topPosition, setTopPosition] = useState(0);
  const { isScrolledUp } = useScrollBehavior();

  useEffect(() => {
    function handleScroll() {
      // Increase or decrease the position of the header based on the scroll direction
      setTopPosition((prevTopPosition) => {
        const newTop = isScrolledUp
          ? rangeLimit(prevTopPosition + 1 * 1, -53, 0)
          : rangeLimit(prevTopPosition - 1 * 1, -53, 0); // 1 is the speed
        return newTop;
      });
    }

    // Attach the event listener to the mouse wheel scroll event
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolledUp]);

  return (
    <>
      {/* Desktop */}
      <header
        ref={headerRef}
        className={`hidden lg:block sticky top-0 w-full backdrop-blur flex-none  transition-all  duration-150 ease-out transform translate-x-0 translate-z-0  lg:z-20 lg:border-b lg:border-slate-900/10 dark:border-slate-500/40 bg-slate-50/75 dark:bg-slate-900/75`}
        style={{ transform: `translateY(${topPosition}px)` }}
      >
        <div className={`transition-all duration-350 ease-out`}>
          <h1 className="mb-4x text-4xlx text-xl p-4 pl-8 font-extrabold leading-none tracking-tight text-slate-900 md:text-5xlx lg:text-6xlx dark:text-white">
            Home
          </h1>
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
      {/* mobile */}
      {/*  
              ${
                isScrolledUp || yPosition < 100
                  ? 'translate-y-0 '
                  : 'translate-y-[-53px]'
              } */}
      <header
        className={`lg:hidden fixed left-0 top-[-1.5px]x z-30
               w-full backdrop-blur flex-none transition-all duration-150 ease-out lg:z-20 lg:border-b lg:border-slate-900/10 dark:border-slate-500/40 bg-slate-50/75 dark:bg-slate-900/75 
              transform translate-x-0 translate-z-0`}
        style={{ transform: `translateY(${topPosition}px)` }}
      >
        <div className={`flex items-center p-4 lg:hidden `}>
          <NavDrawerLeft id="right" title="Menu">
            <MainMenu />
          </NavDrawerLeft>
          <NavDrawerRight id="right" title="Menu">
            <MainMenu />
          </NavDrawerRight>
          <NavDrawerTop id="right" title="Menu">
            <TopDrawerMenu />
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
    </>
  );
};
