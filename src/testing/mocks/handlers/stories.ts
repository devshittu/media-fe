import { rest } from 'msw';

import { API_URL, PAGINATE_STORIES_LIMIT } from '@/config/constants';

import { db } from '../db';
// import { requireAuth } from '../utils';

const getStoriesHandler = rest.get(
  `${API_URL}/stories`,
  async (req, res, ctx) => {
    const categoryId = req.url.searchParams.get('categoryId') as string;
    const hashtag = req.url.searchParams.get('hashtag') as string;

    // Parse page and per_page values with fallback to default values
    const pageParam = req.url.searchParams.get('page') || '';
    const page = !isNaN(parseInt(pageParam, 10)) ? parseInt(pageParam, 10) : 1;

    const perPageParam = req.url.searchParams.get('per_page') || '';
    const per_page = !isNaN(parseInt(perPageParam, 10))
      ? parseInt(perPageParam, 10)
      : PAGINATE_STORIES_LIMIT;

    const stories = db.story.findMany({
      take: per_page,
      skip: Math.max(per_page * (page - 1), 0),
      // where: {
      //   categoryId: {
      //     equals: categoryId,
      //   },
      // },
    });

    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        stories,
        page,
        total_pages: Math.ceil(db.story.count() / per_page),
        total: db.story.count(),
      }),
    );
  },
);

const getStoriesByHashtag = (hashtag: string, store: any[]): any[] => {
  const hashtagRegex = new RegExp(`#${hashtag}\\b`, 'i'); // Case-insensitive regex for the hashtag

  // Filter the stories array based on whether the 'body' contains the given hashtag
  const storiesWithHashtag = store.filter((story) => hashtagRegex.test(story.body));

  return storiesWithHashtag;
};

const getStoriesByHashtagHandler = rest.get(
  `${API_URL}/stories/hashtag`,
  async (req, res, ctx) => {

    // Parse page and per_page values with fallback to default values
    const pageParam = req.url.searchParams.get('page') || '';
    const page = !isNaN(parseInt(pageParam, 10)) ? parseInt(pageParam, 10) : 1;

    const perPageParam = req.url.searchParams.get('per_page') || '';
    const per_page = !isNaN(parseInt(perPageParam, 10))
      ? parseInt(perPageParam, 10)
      : PAGINATE_STORIES_LIMIT;

    const hashtag = req.url.searchParams.get('hashtag') as string;
    const allStories = db.story.getAll();
    const stories = getStoriesByHashtag(hashtag, allStories)

    if (stories.length === 0) {
      return res(
        ctx.delay(300),
        ctx.status(404),
        ctx.json({ message: 'Not found!' }),
      );
    }

    //.slice(start, end)
    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        stories,
        page,
        total_pages: Math.ceil(stories.length / per_page) || 0,
        total: stories.length,
      }),
    );
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
  getStoriesByHashtagHandler,
  getStoriesHandler,
  getStoryHandler,
  // createStoryHandler,
];
