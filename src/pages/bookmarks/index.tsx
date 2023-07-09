import { StoriesPageHeader } from '@/components/blocks/headers';
import UserLayout from '@/layouts/user-layout';
import React, { ReactElement, useEffect, useState } from 'react';
import BookmarkMoment, { BookmarkMomentItem } from './bookmark-moment';
import { SidePanel } from '@/components/blocks/side-panel';
import { StoryItem, getAllStories } from '@/testing';
import { SplashLoaderComponent } from '@/components/blocks/splash-loader/splash-loader-component';

const Index = () => {
  const gender = Math.random() < 0.5 ? 'male' : 'female';
  const displayPhotoUrl = `https://xsgames.co/randomusers/avatar.php?g=${gender}`;
  const [groupedItems, setGroupedItems] = useState<{
    [key: string]: StoryItem[];
  }>({});
  const [sortOrder, setSortOrder] = useState<'latest' | 'earliest'>('latest');

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllStories();
      const data = await response;

      // Group the items by date
      const grouped = data.reduce(
        (acc: { [key: string]: StoryItem[] }, item: StoryItem) => {
          const date = new Date(item.createdAt * 1000).toLocaleDateString(
            'en-US',
            {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            },
          );

          if (!acc[date]) {
            acc[date] = [];
          }

          acc[date].push(item);

          return acc;
        },
        {},
      );

      // Sort the grouped items by date
      const sortedGrouped = Object.entries(grouped).sort(([a], [b]) => {
        const dateA = new Date(a).getTime();
        const dateB = new Date(b).getTime();

        if (sortOrder === 'latest') {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      });

      // Update the state with the grouped and sorted items
      setGroupedItems(Object.fromEntries(sortedGrouped));
    };

    fetchData();
  }, [sortOrder]);

  const handleToggleSort = () => {
    setSortOrder((prevSortOrder) =>
      prevSortOrder === 'latest' ? 'earliest' : 'latest',
    );
  };
  return (
    <div
      className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
    >
      <div
        className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px] box-border border-slate-100 dark:border-slate-800`}
      >
        <StoriesPageHeader pageTitle="Bookmarks" />
        <section className="space-y-8">
          <button onClick={handleToggleSort}>
            Sort by {sortOrder === 'latest' ? 'Earliest' : 'Latest'}
          </button>
          {Object.entries(groupedItems).map(([date, items]) => (
            <React.Fragment key={date}>
              {/* <h2>{date}</h2> 
              {items.map((item) => (*/}

              <BookmarkMoment time={date} momentData={items} />

              {/* // <div key={item.id}>{item.title}</div>
              ))} */}
            </React.Fragment>
          ))}
          {/* <SplashLoaderComponent isActive /> */}
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
