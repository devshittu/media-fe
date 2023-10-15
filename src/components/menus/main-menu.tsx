import React, { useEffect, useState } from 'react';
import { Link } from '@/components/labs/typography';
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
} from '@/components/illustrations';
import { MenuItem, MenuList } from './menu-list';
import { TourPopperType } from '../blocks/tour/tour-popper';
import { FlashCard } from '../blocks/flash-card';
import { useTour } from '@/stores/tour';
import { useAuth } from '@/stores/auth';
import { Button } from '../button';
import { useSignout } from '@/features/auth';
const MainMenu = () => {
  const mainMenuList: MenuItem[] = [
    {
      name: 'Home',
      icon: <HomeIcon />,
      url: '/',
      id: 'home-page-link',
    },
    {
      name: 'Stories',
      icon: <FileTextIcon />,
      url: '/stories',
      id: 'stories-page',
    },
    {
      name: 'Timelines',
      icon: <ClockIcon />,
      url: '/storylines',
      id: 'storyline-page',
      tag: 'New',
    },
    {
      name: 'New Story',
      icon: <EditIcon />,
      url: '/draft',
      id: 'new-story-page',
    },
    {
      name: 'Settings',
      icon: <SettingsIcon />,
      url: '/settings',
      id: 'settings-page',
      tag: 'New',
    },
    {
      name: 'Bookmarks',
      icon: <BookmarkIcon />,
      url: '/bookmarks',
      id: 'bookmarks-page',
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
    {
      name: 'Auth',
      icon: <UserPlusIcon />,
      url: '/auth/signup',
      id: 'music-page',
    },
    // {
    //   name: 'UI/UX Components',
    //   icon: <LayoutIcon />,
    //   url: '/ui-components',
    //   id: 'ui-components-page',
    // },
  ];
  const auth = useAuth();
  const signout = useSignout();
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

  const handleSignout = () => {
    signout.submit();
  };

  return (
    <>
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
        <div className="mt-3 sm:pr-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {auth.authUserDetails?.name}
            <br/>
            {/* {JSON.stringify(auth.authUserDetails)} */}
            {auth.authUserDetails?.username}
          </h3>
          <small className="">{auth.accessToken}</small>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            last logged in on {auth.authUserDetails?.last_activity} December 2,
            2021
          </time>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            {auth.authUserDetails?.bio}
          </p>
          <p>
            <Button onClick={handleSignout}>Signout</Button>
          </p>
        </div>
      </>
    </>
  );
};

export default MainMenu;
