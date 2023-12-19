import React, { useRef } from 'react';
import { DiscoverSection, DiscoverSectionProps } from './discover-section';
import GridDisplay, {
  GridDisplayHandle,
  GridDisplayProps,
} from '@/components/labs/display/grid-display';

// Extend DiscoverSectionProps to include GridDisplayProps
export interface DiscoverSectionGridProps<T> extends DiscoverSectionProps {
  gridProps: Omit<GridDisplayProps<T>, 'ref'>; // Exclude 'ref' from GridDisplayProps
}

export const DiscoverSectionGrid = <T,>({
  title,
  actions,
  gridProps,
}: DiscoverSectionGridProps<T>) => {
  const gridDisplayRef = useRef<GridDisplayHandle>(null);

  // Custom action handlers
  const handleActionClick = (actionId: string) => {
    if (actionId === 'scrollLeft' && gridDisplayRef.current) {
      gridDisplayRef.current.scrollToPrev();
    } else if (actionId === 'scrollRight' && gridDisplayRef.current) {
      gridDisplayRef.current.scrollToNext();
    }
  };

  // Prepare actions for DiscoverSection
  const modifiedActions = actions?.map((action) => ({
    ...action,
    onClick: () => handleActionClick(action.id),
  }));

  return (
    <DiscoverSection title={title} actions={modifiedActions}>
      <GridDisplay ref={gridDisplayRef} {...gridProps} />
    </DiscoverSection>
  );
};

// Path: src/features/trends/components/discover/discover-section-grid.tsx
