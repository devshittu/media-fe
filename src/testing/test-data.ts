import {
  users,
  admins,
  stories,
  categories,
  news_channels,
  settings,
  bookmarks,
} from './test-data/';
export const testData = {
  users,
  admins,
  stories,
  categories,
  settings,
  news_channels,
  bookmarks,
};

const delayedFn =
  <T, A extends any[]>(fn: (...args: A) => T, ms: number) =>
  (...args: A) => {
    return new Promise<T>((resolve) =>
      setTimeout(() => resolve(fn(...args)), ms),
    );
  };
