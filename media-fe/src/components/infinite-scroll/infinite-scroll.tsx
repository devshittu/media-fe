// import { useEffect, useRef, useState } from 'react';
// import useThrottle from '@/hooks/useThrottle';

// export type InfiniteScrollProps = {
//   pageSize: number;
//   totalPages: number;
//   onFetchMore: (page: number, pageSize: number) => Promise<any>;
//   LoadingComponent?: React.ComponentType<any>;
// };

// export const InfiniteScroll = ({
//   pageSize,
//   totalPages,
//   onFetchMore,
//   LoadingComponent,
// }: InfiniteScrollProps) => {
//   const page = useRef(1);
//   const loaderRef = useRef<HTMLDivElement>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [isFetching, setIsFetching] = useState(false);

//   const handleIntersection = (entries: IntersectionObserverEntry[]) => {
//     const target = entries[0];
//     if (target.isIntersecting && !isFetching && hasMore) {
//       setIsLoading(true);
//       fetchMoreData();
//     }
//   };

//   const throttledHandleIntersection = useThrottle(handleIntersection, 1000);

//   const fetchMoreData = async () => {
//     setIsFetching(true);
//     if (page.current < totalPages) {
//       page.current++;
//       try {
//         await onFetchMore(page.current, pageSize);
//       } catch (error) {
//         console.error("Fetching error:", error);
//       }
//     } else {
//       setHasMore(false);
//     }
//     setIsFetching(false);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       throttledHandleIntersection,
//       { threshold: 1.0, root: null, rootMargin: '0px' }, // Adjusted threshold and rootMargin
//     );

//     const currentLoaderRef = loaderRef.current;

//     if (currentLoaderRef) {
//       observer.observe(currentLoaderRef);
//     }

//     return () => {
//       if (currentLoaderRef) {
//         observer.unobserve(currentLoaderRef);
//       }
//     };
//   }, []); // Empty dependencies to ensure observer initializes only once

//   const renderLoading = () => {
//     if (!hasMore) {
//       return <span>No more results</span>;
//     }
//     if (LoadingComponent) {
//       return <LoadingComponent />;
//     }
//     return <span>Loading...</span>;
//   };

//   return (
//     <div ref={loaderRef} style={{ minHeight: '50px', border: '1px solid red' }}>
//       {isLoading && renderLoading()}
//     </div>
//   );
// };

import { useEffect, useRef, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

export type InfiniteScrollProps = {
  pageSize: number;
  totalPages: number;
  onFetchMore: (page: number, pageSize: number) => void;
  onError?: () => void;
  LoadingComponent?: React.ComponentType<any>;
};

export const InfiniteScroll = ({
  pageSize,
  totalPages,
  onFetchMore,
  LoadingComponent,
  onError,
}: InfiniteScrollProps) => {
  const page = useRef(1);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const debouncedTriggerFetch = useDebounce(triggerFetch, 1000);

  useEffect(() => {
    if (debouncedTriggerFetch) {
      if (page.current < totalPages) {
        try {
          page.current++;
          onFetchMore(page.current, pageSize);
          setIsLoading(false);
        } catch (error) {
          onError?.();
          setIsLoading(false);
        }
      } else {
        setHasMore(false);
        setIsLoading(false);
      }
      setTriggerFetch(false);
    }
  }, [debouncedTriggerFetch, onFetchMore, pageSize, totalPages, onError]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          setIsLoading(true);
          setTriggerFetch(true);
        }
      },
      { threshold: 0.1, root: null, rootMargin: '20px' },
    );

    const currentLoaderRef = loaderRef.current;

    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [hasMore]);

  useEffect(() => {
    if (isLoading) {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 10000); // Reset after 10 seconds

      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  const renderLoading = () => {
    if (!hasMore) {
      return <span>No more results</span>;
    }
    if (LoadingComponent) {
      return <LoadingComponent />;
    }
    return <span>Loading...</span>;
  };

  return (
    <div ref={loaderRef} style={{ minHeight: '1px' }}>
      {isLoading && renderLoading()}
    </div>
  );
};

//Path: src/components/infinite-scroll/infinite-scroll.tsx
