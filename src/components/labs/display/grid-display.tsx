import React, { forwardRef, useImperativeHandle, useRef } from 'react';

export interface GridDisplayProps<T> {
  items: T[];
  numColumns?: number;
  numRows?: number;
  itemWidth: 'more-than-1/1' | 'more-than-1/2' | 'more-than-2/3';
  renderItem: (item: T, index: number) => React.ReactNode;
}

export interface GridDisplayHandle {
  scrollToPrev: () => void;
  scrollToNext: () => void;
}

export const GridDisplay = forwardRef<GridDisplayHandle, GridDisplayProps<any>>(
  ({ items, numColumns = 1, numRows = 1, itemWidth, renderItem }, ref) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    if (typeof renderItem !== 'function') {
      throw new Error('GridDisplay requires a renderItem function prop');
    }

    // Adjust the number of columns based on the number of items
    const totalItems = numColumns * numRows;
    let adjustedNumColumns = numColumns;
    if (totalItems > items.length) {
      adjustedNumColumns = Math.ceil(items.length / numRows);
    }
    const finalItemCount = adjustedNumColumns * numRows;

    // Define rearrangeItems inside the component for vertical ordering
    const rearrangeItems = (items: any[]) => {
      let columns = Array.from(
        { length: adjustedNumColumns },
        () => [] as any[],
      );
      items.slice(0, finalItemCount).forEach((item, index) => {
        const columnIndex = Math.floor(index / numRows) % adjustedNumColumns;
        columns[columnIndex].push(item);
      });
      return columns;
    };

    useImperativeHandle(ref, () => ({
      scrollToPrev: () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollBy({
            left: -scrollContainerRef.current.offsetWidth,
            behavior: 'smooth',
          });
        }
      },
      scrollToNext: () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollBy({
            left: scrollContainerRef.current.offsetWidth,
            behavior: 'smooth',
          });
        }
      },
    }));

    const getWidthClass = (widthOption: string) => {
      switch (widthOption) {
        case 'more-than-1/1':
          return 'min-w-[100%]';
        case 'more-than-1/2':
          return 'min-w-[50%]';
        case 'more-than-2/3':
        default:
          return 'min-w-[66%]';
      }
    };

    const columns = rearrangeItems(items);
    const widthClass = getWidthClass(itemWidth);

    return (
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 snap-x snap-mandatory"
      >
        {columns.map((columnItems, columnIndex) => (
          <div
            key={columnIndex}
            className={`flex flex-col gap-4 ${widthClass} snap-start`}
          >
            {columnItems.map((item, index) => renderItem(item, index))}
          </div>
        ))}
      </div>
    );
  },
);

GridDisplay.displayName = 'GridDisplay';
export default GridDisplay;

// Path: src/components/labs/display/grid-display.tsx
