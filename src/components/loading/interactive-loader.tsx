import React, { forwardRef, ReactNode, Ref } from 'react';
import { Button } from '@/components/button';

type InteractiveLoaderProps = {
  isLoading: boolean;
  hasNextPage: boolean;
  onClick: () => void;
  loadingPlaceholder?: ReactNode;
};

export const InteractiveLoader = forwardRef<
  HTMLDivElement,
  InteractiveLoaderProps
>((props, ref) => {
  const { isLoading, hasNextPage, onClick, loadingPlaceholder } = props;

  const defaultLoading = (
    <div className="flex justify-center py-4">
      <span>Loading...</span>
    </div>
  );

  const buttonText = hasNextPage ? 'Load Newer' : 'Nothing more to load';

  return (
    <div ref={ref}>
      {isLoading ? (
        loadingPlaceholder || defaultLoading
      ) : (
        <div className="flex justify-center py-4">
          <Button
            onClick={onClick}
            type={`primary`}
            disabled={!hasNextPage || isLoading}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
});

InteractiveLoader.displayName = 'InteractiveLoader';
