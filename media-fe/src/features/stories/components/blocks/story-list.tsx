// import React, { useEffect, useCallback, useState } from 'react';
// import { StoryListItem } from './story-list-item';
// import { Button } from '@/components/button';
// import { Toast, ToastPosition, ToastType } from '@/components/blocks/toast';
// import { StoryListProps } from '../types';
// import { getMoreStories } from '@/testing/test-data';
// import { InfiniteScroll } from '@/components/infinite-scroll';
// import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
// import { useScrollSync } from '@/hooks/useScrollSync';
// import { useCategoryContext } from '@/features/categories/hooks';
// import { useUserFeedsStore } from '@/stores/feeds';
// import { getStories } from '../../api/get-stories';
// import { Story } from '../../types';

// export const StoryList = ({
//   data = [] as Story[],
//   totalPages,
//   scrollInfinite = false,
// }: StoryListProps) => {
//   const {
//     allItems: allStories,
//     setAllItems: setAllStories,
//     currentPage,
//     setCurrentPage,
//     scrollPosition,
//     setScrollPosition,
//   } = useUserFeedsStore();
//   const [newItemsCount, setNewItemsCount] = useState(0); // State for newly fetched items
//   // Initialize Zustand store with initial data if empty
//   useEffect(() => {
//     if (allStories.length === 0) {
//       setAllStories(data);
//     }
//   }, [data, allStories, setAllStories]);

//   const { categoryTitlesLookUpTable } = useCategoryContext();
//   const { topPosition } = useScrollSync({ minTop: 53 });

//   const pageSize = PAGINATE_STORIES_LIMIT;

//   const fetchMoreStories = useCallback(
//     (page: number, pageSize: number) => {
//       getStories({
//         params: {
//           page: page,
//           per_page: pageSize,
//         },
//       }).then(({ stories }) => {
//         setAllStories((prevStories) => [...prevStories, ...stories]);
//         setCurrentPage(page);
//       });
//     },
//     [setAllStories],
//   );

//   const handleFetchMore = useCallback(
//     (page: number, pageSize: number) => {
//       fetchMoreStories(page, pageSize);
//     },
//     [fetchMoreStories],
//   );

//   const loadNewStories = () => {
//     getMoreStories().then((res) => {
//       console.log('loadNewStories triggered://', res);
//       setAllStories((prevStories) => [...res, ...prevStories]);
//       setNewItemsCount(res.length);
//       // adjustScrollForNewItems(res.length);
//     });
//   };

//   useEffect(() => {
//     if (newItemsCount > 0) {
//       adjustScrollForNewItems(newItemsCount);
//     }
//   }, [newItemsCount]);

//   const adjustScrollForNewItems = (newItemsCount: number) => {
//     // Wait for the new items to be rendered
//     setTimeout(() => {
//       let newItemsHeight = 0;
//       const newItemsElements = document.querySelectorAll(
//         '.new-item',
//       ) as NodeListOf<HTMLDivElement>;

//       newItemsElements.forEach((item, index) => {
//         if (index < newItemsCount) {
//           newItemsHeight += item.offsetHeight;
//         }
//       });

//       // Adjust the scroll position to keep it on the same StoryListItem
//       const { scrollTop } = document.documentElement || document.body;
//       document.documentElement.scrollTop = scrollTop + newItemsHeight;
//       document.body.scrollTop = scrollTop + newItemsHeight; // For older browser compatibility
//     }, 0);
//   };

//   const [showLatestButton, setShowLatestButton] = useState(false);
//   //Todo calculate the 53 which is the real height of the header
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setShowLatestButton(true);
//     }, 2000);
//     return () => clearTimeout(timeout);
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, scrollPosition);
//   }, []);

//   // Save scroll position when component unmounts
//   useEffect(() => {
//     return () => {
//       setScrollPosition(window.scrollY);
//     };
//   }, []);
//   return (
//     <div id="stream" className={`mt-0 md:mt-28 lg:mt-0 relative`}>
//       {showLatestButton && (
//         <div
//           id="refresh-set"
//           className={`flex items-center justify-around min-h-[56px] sticky top-10 md:top-32 z-30 w-98  transition-all  duration-200 ease-out  ${
//             showLatestButton
//               ? 'transform-none opacity-100'
//               : '-translate-y-full  opacity-0'
//           }`}
//           style={{ transform: `translateY(${topPosition}px)` }}
//         >
//           <Button onClick={loadNewStories} type="primary">
//             Load new feeds
//           </Button>
//           {/* <Button onClick={ShowToast}>Show Toast</Button> */}
//         </div>
//       )}
//       <div>
//         {/* {JSON.stringify(allStories)} */}
//         {allStories.map((item, index) => (
//           <StoryListItem
//             key={item.id + index}
//             story={item}
//             categories={categoryTitlesLookUpTable}
//             className={index < newItemsCount ? 'new-item' : ''}
//           />
//         ))}
//         {scrollInfinite && (
//           <InfiniteScroll
//             startPage={currentPage}
//             totalPages={totalPages}
//             pageSize={pageSize}
//             onFetchMore={handleFetchMore}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// // Path: src/components/blocks/stories/story-list.tsx



// src/components/blocks/stories/story-list.tsx
import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Story, StoryListItem, StoryListProps, StoryResponse } from '@/features/stories';
import { useUserFeedsStore } from '@/stores/feeds/user-feeds';
import { getStories, useStoriesInfiniteQuery } from '@/features/stories/api/get-stories';
import { useCategoryContext } from '@/features/categories/hooks';

export const StoryList = ({ data = {} as StoryResponse,
  totalPages,
  scrollInfinite = false, }: StoryListProps) => {
  const { ref, inView } = useInView();
  const { scrollPosition, setScrollPosition } = useUserFeedsStore();

  const category_id = '2';
  // const {
  //   data: dataFromStories,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = useInfiniteQuery(
  //   ['stories', category_id],
  //   async ({ pageParam = 1 }) => {
  //     const res = await getStories({
  //       params: { category_id, page: pageParam },
  //     });
  //     return res;
  //   },
  //   {
  //     getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  //   },
  // );
const { categoryTitlesLookUpTable } = useCategoryContext();
  const {
    data: dataFromStories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useStoriesInfiniteQuery({initialData: data})
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  console.log(dataFromStories)

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, []);

  useEffect(() => {
    return () => {
      setScrollPosition(window.scrollY);
    };
  }, []);

  return (
    <div>
      {dataFromStories?.pages.map((page, i) => (
  <React.Fragment key={i}>
    {page?.stories?.map((story: Story) => (
      <React.Fragment key={story.id}>
          
        <div key={story.id}>{story.id}. {story.title}</div>
      </React.Fragment>
    ))} 
  </React.Fragment>
))}

      <div>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
        </button>
      </div>
    </div>
  );
};
