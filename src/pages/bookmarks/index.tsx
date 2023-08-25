import { StoriesPageHeader } from '@/components/blocks/headers';
import UserLayout from '@/layouts/user-layout';
import React, { ReactElement, useMemo, useState } from 'react';
import { SidePanel } from '@/components/blocks/side-panel';
import { Bookmark, useGetBookmarks } from '@/features/bookmarks';
import { useListGrouping, useListSorting } from '@/hooks';
import {
  BookmarkSorter,
  BookmarkMoment,
  BookmarkMomentLoadingPlaceholder,
} from '@/features/bookmarks/components/';
import { StoriesPageFrame } from '@/components/frames';

const BookmarksPage = () => {
  const [selected, setSelected] = useState<string>('dateAdded');
  const gender = Math.random() < 0.5 ? 'male' : 'female';
  const displayPhotoUrl = `https://xsgames.co/randomusers/avatar.php?g=${gender}`;

  const { data: responseData, isLoading } = useGetBookmarks({});
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
    'desc',
  );

  // const { sortedData, sortOrder, toggleSortOrder } = useListSorting(Object.entries(groupedItems), 'created_at', 'desc');

  return (
    <>
      <StoriesPageHeader pageTitle="Bookmarks" />
      {isLoading && (
        <>
          <BookmarkMomentLoadingPlaceholder />
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
    </>
  );
};

BookmarksPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <StoriesPageFrame>{page}</StoriesPageFrame>
    </UserLayout>
  );
};

export default BookmarksPage;
