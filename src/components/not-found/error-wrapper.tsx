import React from 'react';
import { NotFound, NotFoundProps } from './not-found';

type ErrorWrapperProps = Omit<
  NotFoundProps,
  'errorCode' | 'title' | 'subtitle' | 'description'
> & {
  errorCode?: string;
  title?: string;
  subtitle?: string;
  description?: string;
};

export const ErrorWrapper: React.FC<ErrorWrapperProps> = ({
  errorCode = '400',
  title = 'An error occurred',
  subtitle = 'Error',
  description = 'Something went wrong. Please try again later.',
  primaryAction,
  secondaryAction,
}) => {
  return (
    <NotFound
      errorCode={errorCode}
      title={title}
      subtitle={subtitle}
      description={description}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
    />
  );
};

// src/components/not-found/ErrorWrapper.tsx
