import React, { useEffect, useState } from 'react';
import { Link } from '@/components/labs/typography';
import ThemeSwitch from '@/components/theme-switch/theme-switch';
import {
  EditIcon,
  HomeIcon,
  SettingsIcon,
  FileTextIcon,
  LayoutIcon,
  BookmarkIcon,
  HashIcon,
  UserPlusIcon,
  HelpCircleIcon,
} from '@/components/illustrations';
import { MenuItem, MenuList } from './menu-list';
import TourSequence from '../blocks/tour/tour-sequence';
import { TourPopperType } from '../blocks/tour/tour-popper';
import { FlashCard } from '../blocks/flash-card';
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
    {
      name: 'Hashtags',
      icon: <HashIcon />,
      url: '/hashtags',
      id: 'hashtags-page',
    },
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
    {
      name: 'UI/UX Components',
      icon: <LayoutIcon />,
      url: '/ui-components',
      id: 'ui-components-page',
    },
  ];

  const [showHelp, setShowHelp] = useState(false);
  const closeHelp = () => {
    setShowHelp(false);
  };
  const openHelp = () => {
    setShowHelp(true);
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
        onClickAction={openHelp}
      />

      {showHelp && (
        <TourSequence
          sequence={[
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
          ]}
          open={showHelp}
          onClose={closeHelp}
          type={TourPopperType.WARNING}
        />
      )}
    </>
  );
};

export default MainMenu;
