import React from 'react';
import ThemeSwitch from '@/components/theme-switch/theme-switch';
import {
  EditIcon,
  HomeIcon,
  SettingsIcon,
  FileTextIcon,
  BookmarkIcon,
  UserPlusIcon,
  HelpCircleIcon,
  ClockIcon,
  Icon,
  AppLogoIcon,
  ListIcon,
} from '@/components/illustrations';
import { MenuItem, MenuList } from './menu-list';
import { TourPopperType } from '../blocks/tour/tour-popper';
import { FlashCard } from '../blocks/flash-card';
import { useTour } from '@/stores/tour';
import { AuthUserTile } from '@/features/auth';
import { Link } from '../labs';
const MainMenu = () => {
  const mainMenuList: MenuItem[] = [
    // {
    //   name: 'Home',
    //   icon: <HomeIcon />,
    //   url: '/',
    //   id: 'home-page-link',
    // },
    {
      name: 'Home',
      icon: <FileTextIcon />,
      url: '/stories',
      id: 'stories-page',
    },
    {
      name: 'Storylines',
      icon: <ClockIcon />,
      url: '/storylines',
      id: 'storyline-page',
      // tag: 'New',
    },
    // {
    //   name: 'New Story',
    //   icon: <EditIcon />,
    //   url: '/draft',
    //   id: 'new-story-page',
    // },
    {
      name: 'Topics',
      icon: <ListIcon />,
      url: '/settings',
      id: 'topics-page',
      tag: 'Coming soon',
    },
    {
      name: 'Bookmarks',
      icon: <BookmarkIcon />,
      url: '/bookmarks',
      id: 'bookmarks-page',
    },
    {
      name: 'Settings',
      icon: <SettingsIcon />,
      url: '/settings',
      id: 'settings-page',
      // tag: 'New',
    },
    // {
    //   name: 'Hashtags',
    //   icon: <HashIcon />,
    //   url: '/hashtags',
    //   id: 'hashtags-page',
    // },
    // {
    //   name: 'Music',
    //   icon: <MusicIcon />,
    //   url: '/music',
    //   id: 'music-page',
    // },
    // {
    //   name: 'Auth',
    //   icon: <UserPlusIcon />,
    //   url: '/auth/signup',
    //   id: 'auth-page',
    // },
    // {
    //   name: 'UI/UX Components',
    //   icon: <LayoutIcon />,
    //   url: '/ui-components',
    //   id: 'ui-components-page',
    // },
  ];
  const { showTour } = useTour();

  const tourSequence = [
    {
      forElement: '#page-title',
      text: 'This is where you will find the page title for the current page.',
    },
    {
      forElement: '#app-search',
      text: 'Search stories here...',
    },
    {
      forElement: '#trendsForYouTitle',
      text: 'This is where you will find some trends for you',
    },
    {
      forElement: '.App-nowhere',
      text: 'This help text will never appear',
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between w-full pl-1.5 mb-16 text-slate-900 dark:text-white">
        <Link
          href="/"
          aria-label="Company"
          title="Company"
          className="inline-flex items-center"
        >
          <AppLogoIcon strokeWidth={2} className="w-12 h-12" />
          <span className="ml-2 text-xl font-bold tracking-wide uppercase">
            Media Inc.
          </span>
        </Link>

        <span className="w-35"></span>

        <span className="w-35"></span>
      </div>
      <MenuList menu={mainMenuList} />
      <ThemeSwitch />
      <FlashCard
        title="Beta"
        closeable={false}
        text="Explore our website with the Help button for a quick tour. Discover
          seamless navigation in just a few clicks!"
        actionText="Show Help"
        actionIcon={<HelpCircleIcon />}
        onClickAction={() =>
          showTour({
            sequence: tourSequence,
            type: TourPopperType.INFO,
          })
        }
      />
      <>
        <AuthUserTile actionButtonText="Reply" />
      </>
    </>
  );
};

export default MainMenu;
