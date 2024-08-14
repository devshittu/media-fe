'use client';
import React, { useEffect, useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Icon,
  SkipForwardIcon,
  XIcon,
} from '@/components/illustrations';
import { Navigation } from './types';
import { NavigationButton } from './navigation-button';

type NavigationGroupProps = React.HTMLProps<HTMLDivElement> & {
  navigationItems: Navigation[];
  children?: React.ReactNode;
};
export const NavigationGroup = React.forwardRef<
  HTMLDivElement,
  NavigationGroupProps
>(({ children, navigationItems, ...props }: NavigationGroupProps, ref) => (
  <div className="flex space-x-2" ref={ref} {...props}>
    {children
      ? children
      : navigationItems.map(
          (nav, index) =>
            (nav.show === undefined || nav.show) && ( // Added this condition
              <NavigationButton
                key={index}
                icon={nav.icon}
                onClick={nav.onClick}
                disabled={nav.disabled}
              />
            ),
        )}
  </div>
));
NavigationGroup.displayName = 'NavigationGroup';
