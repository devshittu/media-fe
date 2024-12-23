'use client';
import React, { ReactNode } from 'react';
import NextLink from 'next/link';
import { useLoaderStore } from '@/stores/ui/hooks/useLoaderStore'; // Import the Zustand store

export type LinkProps = {
  href: string;
  id?: string;
  title?: string;
  children: ReactNode;
  variant?: 'link' | 'solid' | 'outline';
  icon?: JSX.Element;
  shallow?: boolean;
  className?: string;
  target?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export const Link = ({
  href,
  children,
  shallow = false,
  className = '',
  onClick,
  target,
  ...props
}: LinkProps) => {
  const startLoading = useLoaderStore((state) => state.startLoading); // Zustand's startLoading function

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    startLoading(); // Trigger loader on click
    if (onClick) {
      onClick(event); // Execute the onClick if provided
    }
  };

  return (
    <NextLink
      href={href}
      shallow={shallow}
      className={className}
      onClick={handleLinkClick}
      target={target}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;

// src/components/labs/typography/link/link.tsx
