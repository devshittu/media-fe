import React from 'react';

import { StoryStatsProps } from '../types';
import { IS_DEBUG_MODE } from '@/config/constants';
import { Markdown, ObjectTreeView } from '@/components/markdown';
import { Story } from '../../types';

export const StoryDebug = ({ story, cacheRefQueryKey }: StoryStatsProps) => {
  function renderObjectAsMarkdown(obj: Story): string {
    // Convert the object to a JSON string with indentation for readability
    const jsonString = JSON.stringify(obj, null, 2);

    // Markdown code block syntax with JSON highlighting
    return '```json\n' + jsonString + '\n```';
  }
  const markdownContent = renderObjectAsMarkdown(story);

  if (!IS_DEBUG_MODE) return null;
  return (
    <>
      <Markdown>{markdownContent}</Markdown>

      <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-slate-100 dark:border-slate-800 mt-auto w-full">
        <pre className="text-sm whitespace-pre-wrap">
          <ObjectTreeView data={story} />
        </pre>
      </div>
    </>
  );
};

//Path: src/features/stories/components/story-media/story-stats.tsx
