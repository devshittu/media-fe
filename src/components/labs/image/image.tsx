import React, { forwardRef, useState } from 'react';
import NextImage from 'next/image';
import { LoadingPhotoFailed } from '@/components/loading';

export type ImageProps = {
  src: string;
  alt: string;
  width: number | string;
  height: number | string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  loading?: 'lazy' | 'eager';
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  loaderSvg?: JSX.Element;
  fallbackSrc?: string; // Fallback image source
  errorMessage?: string; // Custom error message
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      fill = false,
      priority = false,
      className = '',
      loading = 'lazy',
      style = {},
      onLoad,
      onError,
      loaderSvg,
      fallbackSrc = '', //'/path/to/default-image.jpg', // Default fallback image
      errorMessage = 'Image failed to load.', // Default error message

      ...props
    },
    ref,
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const safeWidth = parseSafeNumber(width);
    const safeHeight = parseSafeNumber(height);

    const handleLoad = () => {
      setIsLoaded(true);
      if (onLoad) onLoad();
    };

    const handleError = () => {
      setHasError(true);
      setIsLoaded(true);
      if (onError) onError();
      console.error(`Error loading image: ${src}`); // Error logging
    };

    const brokenImageSvg = (
      <svg
        width={safeWidth}
        height={safeHeight}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M21 3H3C1.89 3 1.01 3.9 1.01 5L1 19C1 20.1 1.89 21 3 21H21C22.1 21 23 20.1 23 19V5C23 3.9 22.1 3 21 3ZM21 19H3V5H21V19ZM19 17H5L10 11L12.5 14L14 12L19 17Z"
          fill="currentColor"
        />
      </svg>
    );

    return (
      <>
        {!isLoaded && !hasError && loaderSvg}
        {hasError ? (
          <div>
            {/* <NextImage
              src={fallbackSrc}
              alt="Fallback"
              width={safeWidth}
              height={safeHeight}
              priority={priority}
              className={className}
              loading={loading}
            /> */}

            
            {fallbackSrc ? (
              <NextImage
                src={fallbackSrc}
                alt="Fallback"
                width={safeWidth}
                height={safeHeight}
                priority={priority}
                className={className}
                loading={loading}
              />
            ) : (
              <>
              <LoadingPhotoFailed />
              {/* <svg
        width={safeWidth}
        height={safeHeight}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M21 3H3C1.89 3 1.01 3.9 1.01 5L1 19C1 20.1 1.89 21 3 21H21C22.1 21 23 20.1 23 19V5C23 3.9 22.1 3 21 3ZM21 19H3V5H21V19ZM19 17H5L10 11L12.5 14L14 12L19 17Z"
          fill="currentColor"
        />
      </svg> */}
              </>
            )}
            <p>{errorMessage}</p>
          </div>
        ) : (
          <NextImage
            src={src}
            alt={alt}
            width={safeWidth}
            height={safeHeight}
            fill={fill}
            priority={priority}
            className={className}
            style={style}
            onLoad={handleLoad}
            onError={handleError}
            loading={loading}
            ref={ref}
            {...props}
          />
        )}
      </>
    );
  },
);

Image.displayName = 'Image';

export default Image;

const parseSafeNumber = (value: string | number): number | undefined => {
  if (typeof value === 'number') {
    return value;
  }

  const parsed = Number(value);
  if (!isNaN(parsed)) {
    return parsed;
  }

  return undefined;
};

// Path: src/components/labs/image/image.tsx
