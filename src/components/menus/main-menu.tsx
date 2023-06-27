import React from 'react';
import Link from 'next/link';
import ThemeSwitch from '@/components/theme-switch/theme-switch';
import {
  ArchiveIcon,
  EditIcon,
  HomeIcon,
  SettingsIcon,
  Icon,
  FileTextIcon,
  LayoutIcon,
  BookmarkIcon,
  HashIcon,
  MusicIcon,
} from '@/components/illustrations';
import { MenuItem, MenuList } from './menu-list';

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
    {
      name: 'Music',
      icon: <MusicIcon />,
      url: '/music',
      id: 'music-page',
    },
    {
      name: 'UI/UX Components',
      icon: <LayoutIcon />,
      url: '/ui-components',
      id: 'ui-components-page',
    },
  ];
  return (
    <>
      <MenuList menu={mainMenuList} />
      <ThemeSwitch />
      <div
        id="dropdown-cta"
        className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
        role="alert"
      >
        <div className="flex items-center mb-3">
          <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
            Beta
          </span>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 inline-flex h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
            data-dismiss-target="#dropdown-cta"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
          Preview the new Media FE dashboard navigation! You can turn the new
          navigation off for a limited time in your profile.
        </p>
        <Link
          className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
          href="#"
        >
          Turn new navigation off
        </Link>
      </div>
    </>
  );
};

export default MainMenu;
