// pages/exportBookmarks.tsx
import { ReactElement, useMemo, useState } from 'react';
import { useBookmarks } from '@/features/bookmarks';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageContainer } from '@/features/stories';
import { StoryListLoadingPlaceholder } from '@/features/stories/components';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { formatDate } from '@/utils';
import { Seo } from '@/components';

const ExportPage = () => {
  const { data: responseData, isLoading } = useBookmarks({});
  const stableBookmarks = useMemo(
    () => responseData?.bookmarks,
    [responseData?.bookmarks],
  );

  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedBookmarks((prev) => {
      if (prev.includes(id)) {
        return prev.filter((bookmarkId) => bookmarkId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedBookmarks.length === stableBookmarks?.length) {
      setSelectedBookmarks([]);
    } else {
      setSelectedBookmarks(stableBookmarks?.map((b) => b.id) || []);
    }
  };

  const handleExport = () => {
    const bookmarksToExport = stableBookmarks?.filter((b) =>
      selectedBookmarks.includes(b.id),
    );
    const blob = new Blob([JSON.stringify(bookmarksToExport)], {
      type: 'application/json',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'bookmarks.json';
    link.click();
  };
  return (
    <>
      <Seo title="Export Bookmarks" />
      <StoriesPageHeader pageTitle="Export Bookmarks" />
      {isLoading && (
        <>
          <StoryListLoadingPlaceholder />
        </>
      )}
      {stableBookmarks?.length > 0 && (
        <div className="p-4">
          <button
            onClick={handleSelectAll}
            className="mb-4 p-2 bg-blue-500 text-white"
          >
            {selectedBookmarks.length === stableBookmarks?.length
              ? 'Deselect All'
              : 'Select All'}
          </button>
          <button
            onClick={handleExport}
            className="ml-4 p-2 bg-green-500 text-white"
          >
            Export Selected
          </button>
          <div className="mt-4">
            {stableBookmarks?.map((bookmark) => (
              <div key={bookmark.id} className="border p-4 mb-2">
                <input
                  type="checkbox"
                  checked={selectedBookmarks.includes(bookmark.id)}
                  onChange={() => handleSelect(bookmark.id)}
                  id={bookmark.id}
                />
                <label htmlFor={bookmark.id} className="ml-2">
                  {bookmark.title} {formatDate(bookmark.created_at)}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

ExportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <StoriesPageContainer>{page}</StoriesPageContainer>
    </UserLayout>
  );
};

export default ExportPage;
