import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import MainMenu from '@/components/menus/main-menu';
import { Link } from '@/components/labs/typography';
import { AppLogoIcon, Icon, MenuIcon } from '@/components/illustrations';
import { Drawer, DrawerSide } from '../drawer';
import { useScrollSync } from '@/hooks/useScrollSync';
import { Tab, TabList } from '../tab';
import { TabStore } from '@/stores/tabs/hooks';
type BaseProps = {
  pageTitle: string;
  parallax?: boolean;
};

type WithTabProps = BaseProps & {
  showTab: true;
  tabStore: () => TabStore;
};

type WithoutTabProps = BaseProps & {
  showTab?: false;
  tabStore?: never;
};

export type StoriesPageHeaderProps = WithTabProps | WithoutTabProps;

export const StoriesPageHeader = ({
  pageTitle = 'Home',
  showTab = false,
  parallax = false,
  tabStore,
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
  // const { tabs, activeTab, setActiveTab } = tabStore();

  // let tabs, activeTab, setActiveTab;

  // Provide default values
  let tabs: Tab[] = []; // Assuming Tab is the correct type
  let activeTab: string = ''; // Default active tab
  let setActiveTab = (tabId: string) => {}; // No-op function

  if (showTab && tabStore) {
    ({ tabs, activeTab, setActiveTab } = tabStore());
  }

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
          <>
            <TabList
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </>
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
            <Icon icon={<MenuIcon />} strokeWidth={3} className="w-6" />
          </Link>
          <ol className="ml-4 flex text-xl md:text-2xl leading-6 whitespace-nowrap min-w-0">
            <li className="font-semibold text-slate-900 truncate dark:text-slate-200">
              <h3
                className=" inline-block font-extrabold leading-none tracking-tight"
                id="page-title"
              >
                {pageTitle}
              </h3>
            </li>
          </ol>
        </div>
        {showTab && (
          <>
            <TabList
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </>
        )}
      </header>
    </>
  );
};

//Path: src/components/blocks/headers/stories-header.tsx
