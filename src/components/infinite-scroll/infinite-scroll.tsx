import { useEffect, useRef } from 'react';
export type InfiniteScrollProps = {
  pageSize: number;
  onFetchMore: (page: number, pageSize: number) => void;
};

export const InfiniteScroll = ({
  pageSize,
  onFetchMore,
}: InfiniteScrollProps) => {
  const page = useRef(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          page.current++;
          onFetchMore(page.current, pageSize);
        }
      },
      { threshold: 0.1, root: null, rootMargin: '20px' },
    );

    const currentLoaderRef = loaderRef.current; // Store the current value in a variable

    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [onFetchMore, pageSize]);

  return <div ref={loaderRef}></div>;
};
