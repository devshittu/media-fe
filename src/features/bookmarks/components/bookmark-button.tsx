import { Button } from '@/components/button';
import React from 'react';

type Props = {
  isBookmarked: boolean;
  onBookmark: () => void;
  onUnbookmark: () => void;
};

const BookmarkButton: React.FC<Props> = ({
  isBookmarked,
  onBookmark,
  onUnbookmark,
}) => {
  return (
    <Button
      id={`bookmark-toggle`}
      className="p-2 bg-blue-500 text-white"
      onClick={isBookmarked ? onUnbookmark : onBookmark}
    >
      {isBookmarked ? 'Unbookmark' : 'Bookmark'}
    </Button>
  );
};

export default BookmarkButton;
