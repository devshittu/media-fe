import React, { forwardRef } from 'react';
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
      ...props
    },
    ref,
  ) => {
    const safeWidth = parseSafeNumber(width);
    const safeHeight = parseSafeNumber(height);

    return (
      <NextImage
        src={src}
        alt={alt}
        width={safeWidth}
        height={safeHeight}
        fill={fill}
        priority={priority}
        className={className}
        style={style}
        onLoad={onLoad}
        onError={onError}
        loading={loading}
        ref={ref}
        {...props}
      />
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
