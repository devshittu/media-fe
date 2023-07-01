import { StoriesPageHeader } from '@/components/blocks/headers';
import { EyeOffIcon, GlobeIcon, Icon } from '@/components/illustrations';
import UserLayout from '@/layouts/user-layout';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import BookmarkMoment, { BookmarkMomentItem } from './bookmark-moment';
import { SidePanel } from '@/components/blocks/side-panel';

const Index = () => {
  const gender = Math.random() < 0.5 ? 'male' : 'female';
  const displayPhotoUrl = `https://xsgames.co/randomusers/avatar.php?g=${gender}`;
  const bookmarkItem: BookmarkMomentItem[] = [
    {
      title: 'Example Title 1',
      channel: 'Example Channel 1',
      channelPhoto: displayPhotoUrl,
      id: '123456789',
      time: 'January 12th, 2022',
    },
    {
      title: 'Example Title 2',
      channelPhoto: displayPhotoUrl,
      id: '987654321',
      time: 'February 24th, 2022',
    },
    {
      title: 'Example Title 3',
      channel: 'Example Channel 3',
      channelPhoto: displayPhotoUrl,
      id: '567890123',
      time: 'April 7th, 2022',
    },
    {
      title: 'Example Title 4',
      channelPhoto: displayPhotoUrl,
      id: '321098765',
      time: 'June 18th, 2022',
    },
    {
      title: 'Example Title 5',
      channel: 'Example Channel 5',
      channelPhoto: displayPhotoUrl,
      id: '654321098',
      time: 'November 30th, 2022',
    },
  ];

  return (
    <div
      className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
    >
      <div
        className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px] box-border border-slate-100 dark:border-slate-800`}
      >
        <StoriesPageHeader pageTitle="Bookmarks" />
        <section className="space-y-8">
          <BookmarkMoment time="January 13th, 2022" momentData={bookmarkItem} />
          <BookmarkMoment time="January 13th, 2022" momentData={bookmarkItem} />
        </section>
      </div>
      <div
        className={`relative hidden lg:flex p-0 z-0 min-w-0 min-h-0 box-border my-0 ml-0 flex-shrink-0 basis-auto flex-col border-0 w-[350px] items-stretch`}
      >
        <SidePanel />
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default Index;
