import React from 'react';
import { IS_DEBUG_MODE } from '@/config/constants';
import { Markdown, ObjectTreeView } from '@/components/markdown';
import { Bookmark } from '../../types';
import { BookmarkDebugProps } from '../types';

export const BookmarkDebug = ({
  bookmark,
  cacheRefQueryKey,
}: BookmarkDebugProps) => {
  function renderObjectAsMarkdown(obj: Bookmark): string {
    // Convert the object to a JSON string with indentation for readability
    const jsonString = JSON.stringify(obj, null, 2);

    // Markdown code block syntax with JSON highlighting
    return '```json\n' + jsonString + '\n```';
  }
  const markdownContent = renderObjectAsMarkdown(bookmark);

  if (!IS_DEBUG_MODE) return null;
  return (
    <>
      <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-slate-100 dark:border-slate-800 mt-auto w-full">
        <pre className="text-sm whitespace-pre-wrap">
          <ObjectTreeView data={bookmark} />
        </pre>
      </div>
    </>
  );
};

//Path: src/features/stories/components/bookmark-media/bookmark-stats.tsx
