import { StoriesPageHeader } from '@/components/blocks/headers';
import { EyeOffIcon, GlobeIcon, Icon } from '@/components/illustrations';
import UserLayout from '@/layouts/user-layout';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';
import BookmarkMoment, { BookmarkMomentItem } from './bookmark-moment';
import { SidePanel } from '@/components/blocks/side-panel';
import { StoryItem, getAllStories, getMoreStories } from '@/testing';

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
  const [groupedItems, setGroupedItems] = useState<{
    [key: string]: StoryItem[];
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the list of items from the REST API\

      const response = await getAllStories();
      //   const response = await fetch('https://api.example.com/items');
      const data = await response;
      console.log('bookmark data:// ', data);

      // Group the items by date
      //   const grouped = data.reduce((acc: { [key: string]: StoryItem[] }, item: StoryItem) => {
      //     const date = new Date(item.createdAt).toLocaleDateString('en-US', {
      //       day: 'numeric',
      //       month: 'long',
      //       year: 'numeric',
      //     });

      //     if (!acc[date]) {
      //       acc[date] = [];
      //     }

      //     acc[date].push(item);

      //     return acc;
      //   }, {});

      //   // Sort the grouped items by date in descending order
      //   const sortedGrouped = Object.entries(grouped).sort(([a], [b]) => {
      //     const dateA = new Date(a).getTime();
      //     const dateB = new Date(b).getTime();

      //     return dateB - dateA;
      //   });

      //   // Update the state with the grouped and sorted items
      //   setGroupedItems(Object.fromEntries(sortedGrouped));
      // };

      // fetchData();

      // Get all unique dates from the list
      const uniqueDates = Array.from(
        new Set(data.map((item: StoryItem) => item.createdAt)),
      );

      // Group the items by date
      const grouped = uniqueDates.reduce(
        (acc: { [key: string]: StoryItem[] }, date: number) => {
          const formattedDate = new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });

          acc[formattedDate] = data.filter(
            (item: StoryItem) => item.createdAt === date,
          );

          return acc;
        },
        {},
      );

      // Update the state with the grouped items
      setGroupedItems(grouped);
    };

    fetchData();
  }, []);
  return (
    <div
      className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
    >
      <div
        className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px] box-border border-slate-100 dark:border-slate-800`}
      >
        <StoriesPageHeader pageTitle="Bookmarks" />
        <section className="space-y-8">
          {Object.entries(groupedItems).map(([date, items]) => (
            <div key={date}>
              <h2>{date}</h2>

              {items.map((item) => (
                <div key={item.id}>{item.title}</div>
              ))}
            </div>
          ))}
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
