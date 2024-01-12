import React, { forwardRef, useState } from 'react';
import NextImage from 'next/image';

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
      fallbackSrc = '/path/to/default-image.jpg', // Default fallback image
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

    return (
      <>
        {!isLoaded && !hasError && loaderSvg}
        {hasError ? (
          <div>
            <NextImage
              src={fallbackSrc}
              alt="Fallback"
              width={safeWidth}
              height={safeHeight}
              priority={priority}
              className={className}
              loading={loading}
            />
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
