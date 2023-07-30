import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import MainMenu from '@/components/menus/main-menu';
import { useScrollBehavior } from '@/hooks';
import { rangeLimit } from '@/utils/helpers';
import { Link } from '@/components/labs/typography';
import { AppLogoIcon, Icon, MenuIcon } from '@/components/illustrations';
import { Drawer, DrawerSide } from '../drawer';
import { Button } from '@/components/button';
import { useScrollSync } from '../../../hooks/useScrollSync';

export type StoriesPageHeaderProps = {
  pageTitle: string;
};

export const StoriesPageHeader = ({
  pageTitle = 'Home',
}: StoriesPageHeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);

  const [pageTitleBoxHeight, setPageTitleBoxHeight] = useState(0);
  const pageTitleRef = useRef<HTMLDivElement>(null);

  // Calculate the height of the element when the component mounts or when its content changes
  useEffect(() => {
    if (pageTitleRef.current) {
      const height = pageTitleRef.current.clientHeight;
      setPageTitleBoxHeight(height);
    }
  }, [pageTitleRef]);
  const { topPosition } = useScrollSync(pageTitleBoxHeight); // top position set to 60

  const openMainMenuDrawer = () => {
    const drawer = new Drawer({
      title: 'Media Inc.',
      showAppLogo: true,
      titleIcon: <AppLogoIcon />,
      id: 'story-list-item-share',
      side: DrawerSide.LEFT,
      children: <MainMenu />,
      onClose: () => {
        // Handle close event
        console.log('Drawer closed');
      },
    });

    drawer.open();
  };
  const handleOpenDrawer = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    openMainMenuDrawer();
  };
  return (
    <>
      {/* Desktop */}
      <header
        ref={headerRef}
        className={`hidden lg:block sticky top-0 w-full backdrop-blur flex-none  transition-all  duration-200 ease-out lg:z-20 lg:border-b lg:border-slate-900/10 dark:border-slate-500/40 bg-slate-50/75 dark:bg-slate-900/75`}
        style={{ transform: `translateY(${topPosition}px)` }}
      >
        <div className={`transition-all duration-350 ease-out`}>
          <div
            id="page-title-wrapper"
            className="text-xl p-4 pl-8 text-slate-900  dark:text-white"
            ref={pageTitleRef}
          >
            <h3
              className=" inline-block font-extrabold leading-none tracking-tight"
              id="page-title"
            >
              {pageTitle}
            </h3>
          </div>
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
          {/* Main Menu Trigger */}

          <Link href="/" onClick={handleOpenDrawer}>
            <Icon icon={<MenuIcon />} className="w-6" />
          </Link>
          <ol className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0">
            <li className="font-semibold text-slate-900 truncate dark:text-slate-200">
              {pageTitle}
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
                id="profile-tab-mobile"
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
                id="dashboard-tab-mobile"
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
