import { useState } from 'react';
import { useAddBookmark } from '../api/add-bookmark';
import { useDeleteBookmark } from '../api/delete-bookmark';

export const useBookmark = (storyId: string, initialBookmarkState: boolean) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarkState);
  const data = { story_id: storyId };
  const addBookmark = useAddBookmark({
    data,
    onSuccess: (response) => {
      console.log(response);
      setIsBookmarked(true);
    },
  });
  const deleteBookmark = useDeleteBookmark({
    data,
    onSuccess: (response) => {
      console.log(response);
      setIsBookmarked(false);
    },
  });

  const handleBookmark = () => {
    addBookmark.submit({ data });
  };

  const handleUnbookmark = () => {
    deleteBookmark.submit({ data });
  };

  return {
    isBookmarked, // This should be derived from your data, e.g., check if the post ID exists in the user's bookmarked posts.
    handleBookmark,
    handleUnbookmark,
  };
};
