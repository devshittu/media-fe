import { useCallback, useEffect, useState } from 'react';
import { StoryListItem } from './story-list-item';
import { Button } from '@/components/button';
import { Toast } from '@/components/blocks/toast';
import { StoryListProps } from './types';
import { getAllStories, getMoreStories, useStories } from '@/testing/test-data';
import { StoryItem } from '@/testing';
import { InfiniteScroll } from '@/components/infinite-scroll';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { useHeaderScroll } from '../headers/useHeaderScroll';

export const StoryList = ({
  data = [] as StoryItem[],
  scrollInfinite = false,
}: StoryListProps) => {
  const [existingItems, setExistingItems] = useState<StoryItem[]>(data || []); // State for existing items
  const [newItems, setNewItems] = useState<StoryItem[]>([]); // State for newly fetched items
  const [moreItems, setMoreItems] = useState<StoryItem[]>([]);
  const [showLatestButton, setShowLatestButton] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLatestButton(true);
    }, 10000);
    return () => clearTimeout(timeout);
  }, []);
  const { topPosition } = useHeaderScroll(53);
  const pageSize = PAGINATE_STORIES_LIMIT;

  const fetchMoreStories = useCallback((page: number, pageSize: number) => {
    getAllStories(page, pageSize).then((res) => {
      setMoreItems(res);
    });
  }, []);
  const handleFetchMore = (page: number, pageSize: number) => {
    fetchMoreStories(page, pageSize);
  };

  const ShowToast = () => {
    const notify = new Toast({
      message: 'Hello, world!',
      position: 'bottom-center',
      type: 'success',
      onClose: () => {
        // Handle close event
        // handleToastClose();
        console.log('Toast closed');
      },
      duration: 3000,
    });

    notify.open();
  };

  const loadLatest = () => {
    getMoreStories().then((res) => {
      console.log('res', res);
      setNewItems(res);
    });
  };
  useEffect(() => {
    // Append moreItems to existingItems when moreItems state changes
    const combinedItems = [...existingItems, ...moreItems];
    setExistingItems(combinedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moreItems]);

  useEffect(() => {
    // Prepend newItems to existingItems when newItems state changes
    const combinedItems = [...newItems, ...existingItems];
    setExistingItems(combinedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newItems]);

  useEffect(() => {
    // Calculate the height of the new items
    let newItemsHeight = 0;
    const newItemsElements = document.querySelectorAll(
      '.new-item',
    ) as NodeListOf<HTMLDivElement>; // Add a CSS class 'new-item' to each postItem element

    newItemsElements?.forEach((item) => {
      newItemsHeight += item.offsetHeight;
    });
    // Adjust the scroll position to keep it on the same StoryListItem
    const { scrollTop } = document.documentElement || document.body;
    document.documentElement.scrollTop = scrollTop + newItemsHeight;
    // document.body.scrollTop = scrollTop + newItemsHeight; // For older browser compatibility
  }, [newItems]);

  return (
    <div id="stream" className={`mt-28 lg:mt-0 relative`}>
      {/* {showLatestButton && ( */}
      <div
        id="refresh-set"
        className={`flex items-center justify-around min-h-[56px] sticky top-32 z-50 w-98 transition-transform -translate-y-full   ${
          showLatestButton
            ? 'transform-none opacity-100'
            : '-translate-y-full  opacity-0'
        }`}
        style={{ transform: `translateY(${topPosition}px)` }}
      >
        <Button onClick={loadLatest} type="primary">
          Load new feeds
        </Button>
        <Button onClick={ShowToast}>Show Toast</Button>
      </div>
      {/* )} */}
      <div>
        {existingItems.map((item, index) => (
          <StoryListItem
            key={item.id + index}
            story={item}
            className={index < newItems.length ? 'new-item' : ''}
          /> // Add 'new-item' class to newly added items
        ))}
        {scrollInfinite && (
          <InfiniteScroll pageSize={pageSize} onFetchMore={handleFetchMore} />
        )}
      </div>
    </div>
  );
};

// Path: src/components/blocks/stories/story-list.tsx
