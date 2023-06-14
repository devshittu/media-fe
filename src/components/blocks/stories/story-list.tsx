import { ChangeEvent, ReactEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { StoryListItem } from './story-list-item';
import { Button } from '@/components/button';
import { Toast } from '@/components/blocks/toast';
import { StoryItem, StoryListProps } from './types';
import { getMoreStories } from '@/testing/test-data';
import useDebounce from '@/hooks/useDebounce';

const pageLimit = 10;
export const StoryList = ({ data = [] }: StoryListProps) => {
  const [existingItems, setExistingItems] = useState<StoryItem[]>(data || []); // State for existing items
  const [newItems, setNewItems] = useState<StoryItem[]>([]); // State for newly fetched items
  const [moreItems, setMoreItems] = useState<StoryItem[]>([]);


  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  // const { loading, error, list } = useFetch(query, page);
  const loader = useRef(null);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(false);

  // const [page, setPage] = useState(1);
  // const loader = useRef(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
      loadMore();
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

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
    getMoreStories().then((res) => {
      console.log('res', res);
      setNewItems(res);
    });
  };
  const loadMore = () => {
    getMoreStories().then((res) => {
      console.log('loadMore res', res);
      setMoreItems(res);
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
        <div ref={loader}></div>
      </div>
    </div>
  );
};
