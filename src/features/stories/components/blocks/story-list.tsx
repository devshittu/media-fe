import { useCallback, useEffect, useState } from 'react';
import { StoryListItem } from './story-list-item';
import { Button } from '@/components/button';
import { Toast, ToastPosition, ToastType } from '@/components/blocks/toast';
import { StoryListProps } from '../types';
import { getMoreStories } from '@/testing/test-data';
import { InfiniteScroll } from '@/components/infinite-scroll';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { useScrollSync } from '@/hooks/useScrollSync';
import { useCategoryContext } from '@/features/categories/hooks';
import { Story } from '../../types';
import { getStories } from '../../api/get-stories';

export const StoryList = ({
  data = [] as Story[],
  totalPages,
  scrollInfinite = false,
}: StoryListProps) => {
  // the data prop is prefilled some stories however, it is returned from an async function i.e it is fetched from the server.
  const [newItems, setNewItems] = useState<Story[]>([]); // State for newly fetched items
  const { categoryTitlesLookUpTable } = useCategoryContext();
  const { topPosition } = useScrollSync(53);
  const [allStories, setAllStories] = useState<Story[]>(data);

  const [showLatestButton, setShowLatestButton] = useState(false);
  //Todo calculate the 53 which is the real height of the header
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLatestButton(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const pageSize = PAGINATE_STORIES_LIMIT;

  const fetchMoreStories = useCallback((page: number, pageSize: number) => {
    const stories = getStories({
      params: {
        page: page,
        per_page: pageSize,
      },
    }).then(({ stories }) => {
      console.log('fetchMoreStories:// ', stories);
      setAllStories((prevStories) => [...prevStories, ...stories]);
    });
  }, []);
  const handleFetchMore = useCallback(
    (page: number, pageSize: number) => {
      fetchMoreStories(page, pageSize); // This loads more stories and we want to append them to the existing stories.
    },
    [fetchMoreStories],
  );

  const ShowToast = () => {
    const notify = new Toast({
      message: 'Hello, world!',
      position: ToastPosition.BOTTOM_CENTER,
      type: ToastType.SUCCESS,
      onClose: () => {
        // Handle close event
        // handleToastClose();
        console.log('Toast closed');
      },
      duration: 3000,
    });

    notify.open();
  };

  const loadNewStories = () => {
    getMoreStories().then((res) => {
      console.log('loadNewStories res:// ', res);
      setNewItems(res); // This loads newer stories and we want to prepend them to the existing stories.
    });
  };

  useEffect(() => {
    if (newItems.length > 0) {
      setAllStories((prevStories) => [...newItems, ...prevStories]);
      adjustScrollForNewItems();
      setNewItems([]);
    }
  }, [newItems]);

  const adjustScrollForNewItems = () => {
    let newItemsHeight = 0;
    const newItemsElements = document.querySelectorAll(
      '.new-item',
    ) as NodeListOf<HTMLDivElement>;

    newItemsElements.forEach((item) => {
      newItemsHeight += item.offsetHeight;
    });

    // Adjust the scroll position to keep it on the same StoryListItem
    const { scrollTop } = document.documentElement || document.body;
    document.documentElement.scrollTop = scrollTop + newItemsHeight;
    document.body.scrollTop = scrollTop + newItemsHeight; // For older browser compatibility
  };

  return (
    <div id="stream" className={`mt-28 lg:mt-0 relative`}>
      <>
        {/* {showLatestButton && ( */}
        <div
          id="refresh-set"
          className={`flex items-center justify-around min-h-[56px] sticky top-32 z-50 w-98  transition-all  duration-200 ease-out  ${
            showLatestButton
              ? 'transform-none opacity-100'
              : '-translate-y-full  opacity-0'
          }`}
          style={{ transform: `translateY(${topPosition}px)` }}
        >
          <Button onClick={loadNewStories} type="primary">
            Load new feeds
          </Button>
          <Button onClick={ShowToast}>Show Toast</Button>
        </div>
        {/* )} */}
        <div>
          {allStories.map((item, index) => (
            <StoryListItem
              key={item.id + index}
              story={item}
              categories={categoryTitlesLookUpTable}
              className={index < newItems.length ? 'new-item' : ''}
            /> // Add 'new-item' class to newly added items
          ))}
          {scrollInfinite && (
            <InfiniteScroll
              totalPages={totalPages}
              pageSize={pageSize}
              onFetchMore={handleFetchMore}
              // LoadingComponent={StoryListItemLoadingPlaceholder}
            />
          )}
        </div>
      </>
    </div>
  );
};

// Path: src/components/blocks/stories/story-list.tsx
