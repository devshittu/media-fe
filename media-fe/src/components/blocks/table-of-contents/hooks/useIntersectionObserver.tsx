import { useEffect, useRef } from 'react';

interface HeadingElement extends IntersectionObserverEntry {
  target: HTMLElement;
}

const useIntersectionObserver = (
  setActiveId: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
  const headingElementsRef = useRef<{ [key: string]: HeadingElement }>({});

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        headingElementsRef.current[entry.target.id] = entry as HeadingElement;
      });

      const visibleHeadings: HeadingElement[] = Object.values(
        headingElementsRef.current,
      ).filter((headingElement) => headingElement.isIntersecting);

      if (visibleHeadings.length === 0) {
        setActiveId(undefined); // No visible headings, set activeId to undefined
      } else {
        const getIndexFromId = (id: string): number =>
          visibleHeadings.findIndex((heading) => heading.target.id === id);

        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id),
        );

        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '500px',
    });

    const headingElements = Array.from(
      document.querySelectorAll('h2, h3'),
    ) as HTMLElement[];

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

export default useIntersectionObserver;

// Path: src/hooks/useIntersectionObserver.tsx
