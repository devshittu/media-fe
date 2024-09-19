// components/frames/StoriesPageFrame.tsx
'use client';
import React from 'react';
import { SidePanel } from '@/components/blocks/side-panel/side-panel';
import { HashtagList } from '@/features/hashtags';
import { UserSuggestionList } from '@/features/users/components';
import { PaneConfig } from '../blocks/side-panel/types';
import { TrendsList } from '@/features/trends/components/blocks/trends-list';

type StoriesPageFrameProps = {
  children: React.ReactNode;
  sidePanelSections?: PaneConfig[];
};

const defaultSections: PaneConfig[] = [
  { id: 'trendsForYou', title: 'Trending', component: <TrendsList /> },
  {
    id: 'hashtagsForYou',
    title: 'Popular Hashtags',
    component: <HashtagList />,
  },
  {
    id: 'channelSubscriptions',
    title: 'Latest Channels',
    component: <UserSuggestionList />,
  },
];

export const StoriesPageFrame = ({
  children,
  sidePanelSections = defaultSections,
}: StoriesPageFrameProps) => {
  return (
    <div
      className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
    >
      <div
        className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px] box-border border-slate-100 dark:border-slate-800`}
      >
        {children}
      </div>
      <div
        className={`relative hidden lg:flex p-0 z-0 min-w-0 min-h-0 box-border my-0 ml-0 flex-shrink-0 basis-auto flex-col border-0 w-[350px] items-stretch`}
      >
        <SidePanel sections={sidePanelSections} />
      </div>
    </div>
  );
};
// Path: src/components/frames/stories-page-frame.tsx
