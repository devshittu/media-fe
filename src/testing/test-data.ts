import { useEffect, useState } from 'react';

export const testData = {
  users: [
    {
      id: 'KV4Lv9yUHtNVB42V0ZrFf',
      createdAt: 1645628972465,
      email: 'user1@test.com',
      password: 'test@123',
      categoryId: 'amYXmIyT9mD9GyO6CCr',
    },
  ],
  categories: [
    {
      id: 'amYXmIyT9mD9GyO6CCr',
      createdAt: 1645628972465,
      adminId: 'KV4Lv9yUHtNVB42V0ZrFf',
      name: 'Test Org 1',
      email: 'org1@test.com',
      phone: '944-528-1711',
      info: 'Totam alias fuga enim esse ullam sit. Nisi animi ut at voluptatem odit nam ea. Et fuga consequatur similique asperiores non suscipit corrupti aperiam. Molestiae quae aut laborum soluta blanditiis cupiditate hic nobis provident.Et quae aut labore aut rerum. Nisi at autem. Enim ipsum enim consectetur sequi consequatur. Sint qui qui quam. Voluptas dignissimos rem et natus. Autem et mollitia hic suscipit illum placeat.Optio aut sit assumenda quo eius omnis sed non consequatur. Numquam perferendis ea sit rerum officia cupiditate aut itaque doloremque. Itaque alias est repellendus. Esse consectetur tenetur velit autem excepturi. Velit perspiciatis saepe dolorum fugiat. Adipisci odio porro quibusdam similique sunt temporibus ipsam.Dolor assumenda aut qui et in perferendis et. Possimus quam qui impedit. Nesciunt aliquid qui consequatur possimus eos velit deserunt magni qui. Nam accusantium libero corrupti.Nulla in ut sunt rerum voluptatem rerum voluptates. Quis expedita natus earum similique officiis rem. Possimus similique architecto ut ad ea quia laborum. Officia voluptatibus quos aliquid delectus. Est voluptates necessitatibus iure et provident iusto at voluptatem sit. Molestiae exercitationem repellat tempore. Id excepturi officiis iste ullam similique et hic sit. Quis et eaque quidem. Qui voluptas ea et rem recusandae suscipit voluptatem sit. Sint ut officiis nihil perferendis nihil quibusdam molestiae. Blanditiis nihil ab illo. Voluptatem mollitia officia aperiam. Esse voluptatum voluptatem nihil minima. Placeat itaque aut numquam. Quis nobis commodi voluptatum ipsum perspiciatis aut. Omnis nulla enim natus architecto in. Autem ab aperiam vitae ipsa quia. Adipisci deleniti voluptas ea nam nesciunt. Doloribus delectus modi et. Voluptatem qui sit eaque qui totam. In facilis excepturi et quae et ullam maiores et sit. Enim consequatur dolorem dolorem eum ullam rerum cum similique odit. Aut velit rem est id et tenetur ut. Velit sunt et velit odit qui mollitia aut harum aut. Cupiditate doloribus dicta reprehenderit aliquid consequatur eum voluptas veritatis. Ut corporis sed et magni consequatur voluptatem.',
    },
  ],
  stories: [
    {
      id: '1',
      categoryId: '1',
      title: 'Story 1',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      createdAt: 1622851200, // Unix timestamp for June 5, 2021
      updatedAt: 1622851200,
    },
    {
      id: '2',
      categoryId: '1',
      title: 'Story 2',
      body: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      createdAt: 1622851200,
      updatedAt: 1622851200,
    },
    {
      id: '3',
      categoryId: '1',
      title: 'Story 3',
      body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      createdAt: 1622851200,
      updatedAt: 1622851200,
    },
    {
      id: '4',
      categoryId: '1',
      title: 'Story 4',
      body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      createdAt: 1622851200,
      updatedAt: 1622851200,
    },
    {
      id: '5',
      categoryId: '1',
      title: 'Story 5',
      body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      createdAt: 1622851200,
      updatedAt: 1622851200,
    },
    {
      id: '6',
      categoryId: '1',
      title: 'Story 6',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      createdAt: 1622851200,
      updatedAt: 1622851200,
    },
    {
      id: '7',
      categoryId: '1',
      title: 'Story 7',
      body: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      createdAt: 1622851200,
      updatedAt: 1622851200,
    },
    {
      id: '8',
      categoryId: '1',
      title: 'Story 8',
      body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      createdAt: 1622851200,
      updatedAt: 1622851200,
    },
    {
      id: '9',
      categoryId: '1',
      title: 'Story 9',
      body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      createdAt: 1622851200,
      updatedAt: 1622851200,
    },
    {
      id: '10',
      categoryId: '1',
      title: 'Story 10',
      body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      createdAt: 1622851200,
      updatedAt: 1622851200,
    },
  ],
};

const delayedFn =
  <T, A extends any[]>(fn: (...args: A) => T, ms: number) =>
  (...args: A) => {
    return new Promise<T>((resolve) =>
      setTimeout(() => resolve(fn(...args)), ms),
    );
  };

export const getUser = delayedFn(() => testData.users[0], 0);

export const getCatgories = delayedFn(
  (id: string) => testData.categories.find((o) => o.id === id) || null,
  300,
);

export const getStories = delayedFn(
  (categoryId: string) =>
    testData.stories.filter((j) => j.categoryId === categoryId),
  300,
);

export const getAllStories = delayedFn(() => testData.stories, 300);
export const getMoreStories = delayedFn(() => testData.stories.slice(-2), 300); // get last item and -2 for the last two items

export const getStory = delayedFn(
  (id: string) => testData.stories.find((j) => j.id === id) || null,
  300,
);

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

export const useCatgories = (id: string) => useTestData(getCatgories(id));

export const useStories = (categoryId: string) =>
  useTestData(getStories(categoryId));

export const useStory = (id: string) => useTestData(getStory(id));
