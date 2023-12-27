/* eslint-disable */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Markdown.module.css';
interface MarkdownProps {
  children: string | null | undefined;
  truncate?: boolean;
  truncateLength?: number;
  truncateEnding?: string;
}

export const Markdown: React.FC<MarkdownProps> = ({
  children,
  truncate,
  truncateLength = 100,
  truncateEnding = '...',
}) => {
  // let content = '';
  // if (typeof children === 'string') {
  let content = children;

  if (truncate && content && content.length > truncateLength) {
    content = content.slice(0, truncateLength) + truncateEnding;
  }
  // }

  return (
    <div className={`${styles.markdown} text-slate-700 dark:text-slate-300`}>
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <p className="" {...props} />,
          h1: ({ node, ...props }) => (
            <h1
              className="text-4xl font-bold mt-6 mb-4 text-slate-800 dark:text-slate-200"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-3xl font-semibold mt-5 mb-3 text-slate-800 dark:text-slate-200"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="text-2l font-semibold mt-4 mb-2 text-slate-800 dark:text-slate-200"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-5 my-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-5 my-4" {...props} />
          ),
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          pre: ({ node, ...props }) => (
            <pre
              className="text-sm bg-slate-200 dark:bg-slate-800 p-3 rounded overflow-x-auto my-4 max-w-full whitespace-break-spaces "
              {...props}
            />
          ),
          code: ({ node, ...props }) => (
            <code
              className="bg-slate-100 text-red-600 px-1 py-0.5 rounded"
              {...props}
            />
          ),
          img: ({ node, ...props }) => (
            <img className="my-4 max-w-full h-auto rounded" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-blue-600 hover:underline" {...props} />
          ),
          hr: ({ node, ...props }) => <hr className="my-4" {...props} />,
          // Add more HTML tag mappings as needed
        }}
      >
        {/* {(typeof children === 'string') ? content : children} */}
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;

// Path: src/components/markdown/markdown.tsx
