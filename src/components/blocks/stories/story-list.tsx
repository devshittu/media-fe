import { useEffect, useState, useRef, useContext } from 'react';
import { StoryListItem } from './story-list-item';
import { Button } from '@/components/button';
import { Toast } from '@/components/blocks/toast';
import { StoryItem, StoryListProps } from './types';
import { getMoreStories } from '@/testing/test-data';
// import { NavContext } from '../nav';

export const StoryList = ({ data = [] }: StoryListProps) => {
  const [existingItems, setExistingItems] = useState<StoryItem[]>(data || []); // State for existing items
  const [newItems, setNewItems] = useState<StoryItem[]>([]); // State for newly fetched items

  // const { scrollContainerRef } = useContext(NavContext); // Access the scrollContainerRef from the layout context
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Access the scrollContainerRef from the layout context

  const handleToastClose = () => {
    console.log('Toast closed');
  };
  const ShowToast = () => {
    const notify = new Toast({
      message: 'Hello, world!',
      position: 'bottom-center',
      type: 'success',
      onClose: () => {
        // Handle close event
        handleToastClose();
      },
      duration: 10000,
    });

    notify.open();
  };

  const loadLatest = () => {
    console.log('Loading latest');
    getMoreStories().then((res) => {
      console.log('res', res);
      setNewItems(res);
    });

    console.log('Finished Loading latest');
  };

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

    console.log('newItemsElements = ', newItemsElements);
    newItemsElements?.forEach((item) => {
      newItemsHeight += item.offsetHeight;
    });
    console.log('newItemsHeight = ', newItemsHeight);
    // Adjust the scroll position to keep it on the same StoryListItem
    // if (scrollContainerRef?.current) {
    //   scrollContainerRef.current.scrollTop += newItemsHeight;
    // }
    // Adjust the scroll position to keep it on the same StoryListItem
    const { scrollTop } = document.documentElement || document.body;
    document.documentElement.scrollTop = scrollTop + newItemsHeight;
    // document.body.scrollTop = scrollTop + newItemsHeight; // For older browser compatibility
  }, [newItems]);

  return (
    <div className={`mt-28 lg:mt-0`}>
      <div
        className={`flex align-middle items-center justify-centerx justify-around min-h-[56px]`}
      >
        <Button onClick={loadLatest}>Load new feeds</Button>
        <Button onClick={ShowToast}>Show Toast</Button>
      </div>
      <div>
        {existingItems.map((item, index) => (
          <StoryListItem
            key={item.id + index}
            story={item}
            className={index < newItems.length ? 'new-item' : ''}
          /> // Add 'new-item' class to newly added items
        ))}
      </div>
    </div>
  );
};
