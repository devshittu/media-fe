import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import MainMenu from '@/components/menus/main-menu';
import { Link } from '@/components/labs/typography';
import { AppLogoIcon, Icon, MenuIcon } from '@/components/illustrations';
import { Drawer, DrawerSide } from '../drawer';
import { useScrollSync } from '@/hooks/useScrollSync';

export type StoriesPageHeaderProps = {
  pageTitle: string;
  showTab?: boolean;
  parallax?: boolean;
};

export const StoriesPageHeader = ({
  pageTitle = 'Home',
  showTab = false,
  parallax = false,
}: StoriesPageHeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);

  const [pageTitleBoxHeightDesktop, setPageTitleBoxHeightDesktop] = useState(0);
  const [pageTitleBoxHeightMobile, setPageTitleBoxHeightMobile] = useState(0);
  const pageTitleDesktopRef = useRef<HTMLDivElement>(null);
  const pageTitleMobileRef = useRef<HTMLDivElement>(null);

  // Calculate the height of the element when the component mounts or when its content changes
  useEffect(() => {
    if (pageTitleDesktopRef.current) {
      const height = pageTitleDesktopRef.current.clientHeight;
      setPageTitleBoxHeightDesktop(height);
    }
  }, [pageTitleDesktopRef]);

  // Calculate the height of the element when the component mounts or when its content changes
  useEffect(() => {
    if (pageTitleMobileRef.current) {
      const height = pageTitleMobileRef.current.clientHeight;
      setPageTitleBoxHeightMobile(height);
    }
  }, [pageTitleMobileRef]);
  const { topPosition: topPositionDesktop } = useScrollSync({
  contentHeight: pageTitleBoxHeightDesktop,
  }); // top position set to 60
  const { topPosition: topPositionMobile } = useScrollSync({
    contentHeight: pageTitleBoxHeightMobile,
  }); // top position set to 60

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
        className={`will-change-transform hidden lg:block sticky top-0 w-full backdrop-blur flex-none  transition-all  duration-200 ease-out lg:z-20 lg:border-b lg:border-slate-900/10 dark:border-slate-500/40 bg-slate-50/75 dark:bg-slate-900/75`}
        style={{
          transform: parallax ? `translateY(${topPositionDesktop}px)` : 'none',
        }}
      >
        <div className={`transition-all duration-350 ease-out`}>
          <div
            id="page-title-wrapper"
            className="text-xl p-4 pl-8 text-slate-900  dark:text-white"
            ref={pageTitleDesktopRef}
          >
            <h3
              className=" inline-block font-extrabold leading-none tracking-tight"
              id="page-title"
            >
              {pageTitle}
            </h3>
          </div>
        </div>
        {showTab && (
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
        )}
      </header>
      {/* mobile */}
      {/*  
              ${
                isScrolledUp || yPosition < 100
                  ? 'translate-y-0 '
                  : 'translate-y-[-53px]'
              } */}
      {/* hidden lg:block sticky top-0 w-full backdrop-blur flex-none  transition-all  duration-200 ease-out lg:z-20 lg:border-b lg:border-slate-900/10 dark:border-slate-500/40 bg-slate-50/75 dark:bg-slate-900/75               */}
      <header
        className={`block lg:hidden sticky top-0 z-20
               w-full backdrop-blur flex-none  transition-transform  duration-200 ease-out lg:z-20 lg:border-b lg:border-slate-900/10 dark:border-slate-500/40 bg-slate-50/75 dark:bg-slate-900/75 
              `}
        style={{
          transform: parallax ? `translateY(${topPositionMobile}px)` : 'none',
        }}
      >
        <div
          className={`flex items-center p-4 lg:hidden `}
          ref={pageTitleMobileRef}
        >
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
        {showTab && (
          <div>
            {/* <ul
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
            </ul> */}
          </div>
        )}
      </header>
    </>
  );
};

//Path: src/components/blocks/headers/stories-header.tsx
