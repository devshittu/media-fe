import { StoriesPageHeader } from '@/components/blocks/headers';
import UserLayout from '@/layouts/user-layout';
import React, { ReactElement, useMemo, useState } from 'react';
import BookmarkMoment from './bookmark-moment';
import { SidePanel } from '@/components/blocks/side-panel';
import { Bookmark, useBookmarks } from '@/features/bookmarks';
import { useListGrouping, useListSorting } from '@/hooks';
import { StoriesPageContainer, StoryListLoadingPlaceholder } from '@/features/stories';
import {BookmarkSorter} from '@/features/bookmarks/components/';

const BookmarksPage = () => {
  const [selected, setSelected] = useState<string>('dateAdded');
  const gender = Math.random() < 0.5 ? 'male' : 'female';
  const displayPhotoUrl = `https://xsgames.co/randomusers/avatar.php?g=${gender}`;

  const { data: responseData, isLoading } = useBookmarks({});
  const stableBookmarks = useMemo(
    () => responseData?.bookmarks,
    [responseData?.bookmarks],
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Group bookmarks by date
  const groupedItems = useListGrouping<Bookmark>(
    stableBookmarks,
    'created_at',
    formatDate,
  );

  // Sort the grouped bookmarks
  const { sortedData, sortOrder, toggleSortOrder } = useListSorting(
    Object.entries(groupedItems),
    '0', // since the data is an array of [date, items], we sort by the date which is at index 0
    'desc'
  );

  // const { sortedData, sortOrder, toggleSortOrder } = useListSorting(Object.entries(groupedItems), 'created_at', 'desc');


  return (
    <div
      className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto`}
    >
      <div
        className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px] box-border border-slate-100 dark:border-slate-800`}
      >
        <StoriesPageHeader pageTitle="Bookmarks" />
        {isLoading && (
          <>
            <StoryListLoadingPlaceholder />
          </>
        )}

        {sortedData?.length > 0 && (
          <section className="space-y-8">
            <button onClick={toggleSortOrder}>
              Sort by {sortOrder === 'desc' ? 'Earliest' : 'Latest'}
            </button>
            <BookmarkSorter
              selectedValue={selected}
              onSelect={(value) => setSelected(value)}
            />
            {sortedData.map(([date, items]) => (
              <React.Fragment key={date}>
                <BookmarkMoment time={date} momentData={items} />
              </React.Fragment>
            ))}
          </section>
        )}
      </div>
      <div
        className={`relative hidden lg:flex p-0 z-0 min-w-0 min-h-0 box-border my-0 ml-0 flex-shrink-0 basis-auto flex-col border-0 w-[350px] items-stretch`}
      >
        <SidePanel />
      </div>
    </div>
  );
};

BookmarksPage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout><StoriesPageContainer>{page}</StoriesPageContainer></UserLayout>;
};

export default BookmarksPage;
