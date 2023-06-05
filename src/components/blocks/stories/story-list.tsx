import { useEffect, useState, useRef } from 'react';
import { StoryListItem } from './story-list-item';
import { Button } from '@/components/button';
import { Toast } from '@/components/blocks/toast';
import { StoryItem, StoryListProps } from './types';
import { getMoreStories } from '@/testing/test-data';

export const StoryList = ({ data = [] }: StoryListProps) => {
  const [existingItems, setExistingItems] = useState<StoryItem[]>(data || []); // State for existing items
  const [newItems, setNewItems] = useState<StoryItem[]>([]); // State for newly fetched items
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for the scroll container
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
      duration: 5000,
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

    newItemsElements.forEach((item) => {
      newItemsHeight += item.offsetHeight;
    });
    console.log('newItemsHeight = ', newItemsHeight);

    // Adjust the scroll position to keep it on the same postItem
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop += newItemsHeight;
    }
  }, [newItems]);

  return (
    <div className={`mt-28 lg:mt-0`}>
      <div
        className={`flex align-middle items-center justify-centerx justify-around min-h-[56px]`}
      >
        <Button onClick={loadLatest}>Load new feeds</Button>
        <Button onClick={ShowToast}>Show Toast</Button>
      </div>
      <div
        ref={scrollContainerRef}
        // style={{ maxHeight: '100vh', overflowY: 'auto' }}
      >
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
