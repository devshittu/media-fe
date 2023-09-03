// import { bookmarks } from '@/testing/test-data/bookmarks';
import { rest } from 'msw';

import { API_URL, PAGINATE_STORIES_LIMIT } from '@/config/constants';

import { db } from '../db';
// import { requireAuth } from '../utils';

const getBookmarksHandler = rest.get(
  `${API_URL}/bookmarks`,
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

    const bookmarks = db.bookmark.findMany({
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
        bookmarks,
        page,
        total_pages: Math.ceil(db.bookmark.count() / per_page),
        total: db.bookmark.count(),
      }),
      ctx.set('Access-Control-Allow-Origin', '*'),
    );
  },
);
const addBookmarkHandler = rest.post(
  `${API_URL}/bookmarks`,
  async (req, res, ctx) => {
    // Sample analytics data
    // The data
    const reqData = (await req.json()) as FormData;
    console.log('addBookmarkHandler: data in json', reqData);

    // return res(
    //   // Send a valid HTTP status code
    //   ctx.status(403),
    //   // And a response body, if necessary
    //   ctx.json({
    //     errorMessage: `User '${reqData}' not found`,
    //   }),
    // )
    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({ success: true }),
      ctx.set('Access-Control-Allow-Origin', '*'),
    );
  },
);
const deleteBookmark = rest.delete(
  `${API_URL}/bookmarks`,
  async (req, res, ctx) => {
    const reqData = (await req.json()) as FormData;
    console.log('deleteBookmark: data in json', reqData);
    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({ success: true }),
      ctx.set('Access-Control-Allow-Origin', '*'),
    );
  },
);
const bookmarkAnalytics = rest.get(
  `${API_URL}/bookmarks/analytics`,
  async (req, res, ctx) => {
    // Sample analytics data
    return res(ctx.json({ totalBookmarks: db.bookmark.count() }));
  },
);
const exportBookmark = rest.get(
  `${API_URL}/bookmarks/export`,
  async (req, res, ctx) => {
    // Sample analytics data
    return res(ctx.json({ bookmarks: db.bookmark.getAll() }));
  },
);
const deleteBookmarkBulk = rest.post(
  `${API_URL}/bookmarks/bulk-delete`,
  async (req, res, ctx) => {
    console.log(`${API_URL}/bookmarks/bulk-delete::req// `, req);
    // const { ids } = req.json();
    // let bookmarks = db.bookmark.getAll();
    // bookmarks = bookmarks.filter((b) => !ids.includes(b.id));
    return res(
      ctx.json({ success: true }),
      ctx.set('Access-Control-Allow-Origin', '*'),
    );
  },
);

// const getBookmarkHandler = rest.get(
//   `${API_URL}/stories/:storyId`,
//   async (req, res, ctx) => {
//     const storyId = req.params.storyId as string;

//     const story = db.bookmark.findFirst({
//       where: {
//         id: {
//           equals: storyId,
//         },
//       },
//     });

//     if (!story) {
//       return res(
//         ctx.delay(300),
//         ctx.status(404),
//         ctx.json({ message: 'Not found!' }),
//       ctx.set('Access-Control-Allow-Origin', '*'),
//       );
//     }

//     return res(ctx.delay(300), ctx.status(200),
//       ctx.set('Access-Control-Allow-Origin', '*'), ctx.json(story));
//   },
// );

export const bookmarksHandlers = [
  getBookmarksHandler,
  deleteBookmarkBulk,
  exportBookmark,
  bookmarkAnalytics,
  addBookmarkHandler,
  deleteBookmark,
];
