'use client';

import { useEffect, useState } from 'react';

type ClientStoryProps = {
  storyId: string;
};

export function ClientStoryComponent({ storyId }: ClientStoryProps) {
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    async function fetchStory() {
      try {
        const response = await fetch(`/api/stories/${storyId}`);
        const data = await response.json();
        setStory(data);
      } catch (error) {
        console.error('Failed to fetch story', error);
      }
    }
    fetchStory();
  }, [storyId]);

  if (!story) return <p>Loading story...</p>;

  return <StoryListItem story={story} />;
}