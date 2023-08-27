import React from 'react';

export const ErrorText = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-red-600 text-sm md:text-base lg:text-lg">{children}</p>
  );
};
