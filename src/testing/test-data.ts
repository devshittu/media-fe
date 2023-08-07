import { useEffect, useState } from 'react';
import {
  users,
  admins,
  stories,
  categories,
  news_channels,
  settings,
} from './test-data/';
import { StoryItem } from './types';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';

export const testData = {
  users,
  admins,
  stories,
  categories,
  settings,
  news_channels,
};

const delayedFn =
  <T, A extends any[]>(fn: (...args: A) => T, ms: number) =>
  (...args: A) => {
    return new Promise<T>((resolve) =>
      setTimeout(() => resolve(fn(...args)), ms),
    );
  };

export const getUser = delayedFn(() => testData.users[0], 0);

export const getCategory = delayedFn(
  (id: string) => testData.categories.find((o) => o.id === id) || null,
  300,
);
export const getCategories = delayedFn(() => testData.categories || null, 300);

export const getStory = delayedFn(
  (id: string) =>
    testData.stories.find((j: StoryItem) => j.slug === id) || null,
  300,
);

export const getStories = delayedFn(
  (category_id: string) =>
    testData.stories.filter((j: StoryItem) => j.category_id === category_id),
  300,
);

export const getAllStories = delayedFn(
  (
    page: number = 1,
    pageSize: number = PAGINATE_STORIES_LIMIT,
  ): StoryItem[] => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return testData.stories.slice(start, end);
  },
  300,
);
export const getMoreStories = delayedFn(() => testData.stories.slice(-2), 300); // get last item and -2 for the last two items

const findRelatedStories = (
  stories: StoryItem[],
  storyId: string,
  property: 'parent_stories' | 'children_stories',
): StoryItem[] => {
  const relatedStories: StoryItem[] = [];

  const findStories = (currentStoryId: string) => {
    stories.forEach((story) => {
      if (story.slug === currentStoryId && story[property].length > 0) {
        story[property].forEach((relatedId) => {
          const relatedStory = stories.find((s) => s.id === relatedId);
          if (relatedStory) {
            relatedStories.push(relatedStory);
            findStories(relatedStory.slug);
          }
        });
      }
    });
  };

  findStories(storyId);
  relatedStories.sort((a, b) => a.created_at - b.created_at); // Sort related stories by created_at in ascending order
  return relatedStories;
};

export const getParentStories = delayedFn((storyId: string): StoryItem[] => {
  return findRelatedStories(testData.stories, storyId, 'parent_stories');
}, 300);

export const getChildrenStories = delayedFn((storyId: string): StoryItem[] => {
  return findRelatedStories(testData.stories, storyId, 'children_stories');
}, 300);

export const getRelatedStories = delayedFn((storyId: string): StoryItem[] => {
  let relatedStories: StoryItem[] = [];
  console.log(storyId);
  const theStory =
    testData.stories.find((j: StoryItem) => j.slug === storyId) || null;
  const parentStories = findRelatedStories(
    testData.stories,
    storyId,
    'parent_stories',
  );
  // console.log('parentStories', parentStories);
  const childrenStories = findRelatedStories(
    testData.stories,
    storyId,
    'children_stories',
  );
  // console.log('childrenStories', childrenStories);
  if (!theStory) return relatedStories;

  relatedStories = [
    ...parentStories,
    theStory,
    ...childrenStories,
  ] as StoryItem[];
  return relatedStories;
}, 300);

const paginateStories = (
  stories: StoryItem[],
  page: number,
  storiesPerPage: number,
): StoryItem[] => {
  const startIndex = (page - 1) * storiesPerPage;
  const endIndex = startIndex + storiesPerPage;
  return stories.slice(startIndex, endIndex);
};

const useTestData = <T>(promise: Promise<T>) => {
  const [testData, setTestData] = useState<T | null>(null);

  useEffect(() => {
    if (!testData) {
      promise.then(setTestData);
    }
  }, [promise, testData]);

  return { data: testData, isLoading: !testData };
};

export const useUser = () => useTestData(getUser());

export const useCategory = (id: string) => useTestData(getCategory(id));

export const useCategories = () => useTestData(getCategories());

export const useStory = (id: string) => useTestData(getStory(id));

export const useStories = (page: number, pageSize: number) =>
  useTestData(getAllStories(page, pageSize));

export const useParentStories = (id: string) =>
  useTestData(getParentStories(id));
export const useChildrenStories = (id: string) =>
  useTestData(getChildrenStories(id));
export const useRelatedStories = (id: string) =>
  useTestData(getRelatedStories(id));
