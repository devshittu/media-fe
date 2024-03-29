import { LoadingButtonText } from '@/components/loading';
import React from 'react';

export const LoadingButtonTextList = ({
  wrapped = false,
}: {
  wrapped?: boolean;
}) => {
  return (
    <div className={`animate-pulse flex gap-4 ${wrapped && 'flex-wrap'}`}>
      <LoadingButtonText width="w-14" />
      <LoadingButtonText width="w-24" />
      <LoadingButtonText width="w-36" />
      <LoadingButtonText width="w-20" />
      <LoadingButtonText width="w-20" />
      <LoadingButtonText width="w-32" />
    </div>
  );
};
