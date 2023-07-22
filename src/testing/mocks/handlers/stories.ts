import { rest } from 'msw';

import { API_URL } from '@/config/constants';

import { db } from '../db';
// import { requireAuth } from '../utils';

const getStoriesHandler = rest.get(
  `${API_URL}/stories`,
  async (req, res, ctx) => {
    const categoryId = req.url.searchParams.get('categoryId') as string;

    // const stories = db.story.findMany({
    //   where: {
    //     categoryId: {
    //       equals: categoryId,
    //     },
    //   },
    // });
    const stories = db.story.getAll();

    return res(ctx.delay(300), ctx.status(200), ctx.json(stories));
  },
);

const getStoryHandler = rest.get(
  `${API_URL}/stories/:storyId`,
  async (req, res, ctx) => {
    const storyId = req.params.storyId as string;

    const story = db.story.findFirst({
      where: {
        id: {
          equals: storyId,
        },
      },
    });

    if (!story) {
      return res(
        ctx.delay(300),
        ctx.status(404),
        ctx.json({ message: 'Not found!' }),
      );
    }

    return res(ctx.delay(300), ctx.status(200), ctx.json(story));
  },
);

// const createStoryHandler = rest.post(
//   `${API_URL}/stories`,
//   async (req, res, ctx) => {
//     const user = requireAuth({ req });

//     const storyData = await req.json();

//     const story = db.story.create({
//       ...storyData,
//       categoryId: user?.categoryId,
//     });

//     return res(ctx.delay(300), ctx.status(200), ctx.json(story));
//   },
// );

export const storiesHandlers = [
  getStoriesHandler,
  getStoryHandler,
  // createStoryHandler,
];
