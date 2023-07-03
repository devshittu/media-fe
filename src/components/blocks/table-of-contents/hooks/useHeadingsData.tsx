import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  title: string;
  items: Heading[];
}

/**
 * Dynamically generates the table of contents list, using any H2s and H3s it can find in the main text
 */

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    // Todo remove the setTimeout and find a better way to delay loading.
    setTimeout(() => {
      const headingElements = Array.from(
        document.querySelectorAll(
          'main article h2.story-header, main article h3.story-header',
        ),
      ) as HTMLElement[];

      const newNestedHeadings = getNestedHeadings(headingElements);
      setNestedHeadings(newNestedHeadings);
    }, 1000);
  }, []);

  const getNestedHeadings = (headingElements: HTMLElement[]): Heading[] => {
    const nestedHeadings: Heading[] = [];

    headingElements.forEach((heading, index) => {
      const { innerText: title, id } = heading;

      if (heading.nodeName === 'H2') {
        nestedHeadings.push({ id, title, items: [] });
      } else if (heading.nodeName === 'H3' && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title,
          items: [],
        });
      }
    });

    return nestedHeadings;
  };

  return { nestedHeadings };
};

export default useHeadingsData;
