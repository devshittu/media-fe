import React from 'react';
import ReactMarkdown from 'react-markdown';

export const Markdown = ({
  children,
}: {
  children: string | null | undefined;
}) => {
  return <ReactMarkdown>{children}</ReactMarkdown>;
};
