import { rest } from 'msw';

import { API_URL, PAGINATE_STORIES_LIMIT } from '@/config/constants';

import { db } from '../db';
import { findRelatedStories } from '@/testing/test-data';
import { Story } from '@/features/stories';
// import { requireAuth } from '../utils';

const getStoriesHandler = rest.get(
  `${API_URL}/stories`,
  async (req, res, ctx) => {
    const category_id = req.url.searchParams.get('category_id') as string;
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
      //   category_id: {
      //     equals: category_id,
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
      ctx.set('Access-Control-Allow-Origin', '*'),
    );
  },
);

const getStorylineHandler = rest.get(
  `${API_URL}/stories/:storySlug`,
  async (req, res, ctx) => {
    const slug = req.url.searchParams.get('slug') as string;

    const storySlug = req.params.storySlug as string;
    // Parse page and per_page values with fallback to default values
    const pageParam = req.url.searchParams.get('page') || '';
    const page = !isNaN(parseInt(pageParam, 10)) ? parseInt(pageParam, 10) : 1;

    const perPageParam = req.url.searchParams.get('per_page') || '';
    const per_page = !isNaN(parseInt(perPageParam, 10))
      ? parseInt(perPageParam, 10)
      : PAGINATE_STORIES_LIMIT;

    const story = db.story.findFirst({
      where: {
        slug: {
          equals: storySlug,
        },
      },
    });

    if (!story) {
      return res(
        ctx.delay(300),
        ctx.status(404),
        ctx.json({ message: 'Not found!' }),
        ctx.set('Access-Control-Allow-Origin', '*'),
      );
    }

    const stories = db.story.findMany({}) as unknown as Story[];

    let relatedStories: any[] = [];
    const theStory = stories.find((j) => j.slug === storySlug) || null;
    const parentStories = findRelatedStories(
      stories,
      storySlug,
      'parent_stories',
    );
    // console.log('parentStories', parentStories);
    const childrenStories = findRelatedStories(
      stories,
      storySlug,
      'children_stories',
    );
    relatedStories = [
      ...parentStories,
      theStory,
      ...childrenStories,
    ] as Story[];

    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        stories: relatedStories,
        page,
        total_pages: Math.ceil(relatedStories.length / per_page),
        total: relatedStories.length,
      }),
      ctx.set('Access-Control-Allow-Origin', '*'),
    );
  },
);

const getStoriesByHashtag = (hashtag: string, store: any[]): any[] => {
  const hashtagRegex = new RegExp(`#${hashtag}\\b`, 'i'); // Case-insensitive regex for the hashtag

  // Filter the stories array based on whether the 'body' contains the given hashtag
  const storiesWithHashtag = store.filter((story) =>
    hashtagRegex.test(story.body),
  );

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
    const stories = getStoriesByHashtag(hashtag, allStories);

    if (stories.length === 0) {
      return res(
        ctx.delay(300),
        ctx.status(404),
        ctx.json({ message: 'Not found!' }),
        ctx.set('Access-Control-Allow-Origin', '*'),
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
      ctx.set('Access-Control-Allow-Origin', '*'),
    );
  },
);

const getStoriesByCategoryHandler = rest.get(
  `${API_URL}/stories/category`,
  async (req, res, ctx) => {
    console.log('MSW Request:', req);
    const categoryId = req.url.searchParams.get('categoryId') as string;

    // const hashtag = req.url.searchParams.get('hashtag') as string;

    // Parse page and per_page values with fallback to default values
    const pageParam = req.url.searchParams.get('page') || '';
    const page = !isNaN(parseInt(pageParam, 10)) ? parseInt(pageParam, 10) : 1;

    const perPageParam = req.url.searchParams.get('per_page') || '';
    const per_page = !isNaN(parseInt(perPageParam, 10))
      ? parseInt(perPageParam, 10)
      : PAGINATE_STORIES_LIMIT;

    const theCategory = db.category.findFirst({
      where: {
        id: {
          equals: categoryId,
        },
      },
    });
    if (!theCategory) {
      return res(
        ctx.delay(300),
        ctx.status(404),
        ctx.json({ message: 'Not found!' }),
        ctx.set('Access-Control-Allow-Origin', '*'),
      );
    }
    const stories = db.story.findMany({
      take: per_page,
      skip: Math.max(per_page * (page - 1), 0),
      where: {
        category_id: {
          equals: categoryId,
        },
      },
    });

    console.log('MSW Stories:', stories);

    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        stories,
        page,
        total_pages: Math.ceil(db.story.count() / per_page),
        total: db.story.count(),
      }),
      ctx.set('Access-Control-Allow-Origin', '*'),
    );
  },
);

export const storiesHandlers = [
  getStoriesByHashtagHandler,
  getStoriesHandler,
  getStorylineHandler,
  getStoriesByCategoryHandler,
  // getStoryHandler,
  // createStoryHandler,
];

// const getStoryHandler = rest.get(
//   `${API_URL}/stories/:storyId`,
//   async (req, res, ctx) => {
//     const storyId = req.params.storyId as string;

//     const story = db.story.findFirst({
//       where: {
//         id: {
//           equals: storyId,
//         },
//       },
//     });

// if (!story) {
//   return res(
//     ctx.delay(300),
//     ctx.status(404),
//     ctx.json({ message: 'Not found!' }),
//     ctx.set('Access-Control-Allow-Origin', '*'),
//   );
// }

//     return res(
//       ctx.delay(300),
//       ctx.status(200),
//       ctx.json(story),
//       ctx.set('Access-Control-Allow-Origin', '*'),
//     );
//   },
// );

// const createStoryHandler = rest.post(
//   `${API_URL}/stories`,
//   async (req, res, ctx) => {
//     const user = requireAuth({ req });

//     const storyData = await req.json();

//     const story = db.story.create({
//       ...storyData,
//       category_id: user?.category_id,
//     });

//     return res(ctx.delay(300), ctx.status(200), ctx.json(story));
//   },
// );
