import { rest } from 'msw';

import { API_URL, PAGINATE_STORIES_LIMIT } from '@/config/constants';

import { db } from '../db';
// import { requireAuth } from '../utils';

const getUsersHandler = rest.get(`${API_URL}/users`, async (req, res, ctx) => {
  const category_id = req.url.searchParams.get('category_id') as string;
  const hashtag = req.url.searchParams.get('hashtag') as string;

  // Parse page and per_page values with fallback to default values
  const pageParam = req.url.searchParams.get('page') || '';
  const page = !isNaN(parseInt(pageParam, 10)) ? parseInt(pageParam, 10) : 1;

  const perPageParam = req.url.searchParams.get('per_page') || '';
  const per_page = !isNaN(parseInt(perPageParam, 10))
    ? parseInt(perPageParam, 10)
    : PAGINATE_STORIES_LIMIT;

  const users = db.user.findMany({
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
      users,
      page,
      total_pages: Math.ceil(db.user.count() / per_page),
      total: db.story.count(),
    }),
    ctx.set('Access-Control-Allow-Origin', '*'),
  );
});

export const usersHandlers = [getUsersHandler];
