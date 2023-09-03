import { rest } from 'msw';

import { API_URL, PAGINATE_STORIES_LIMIT } from '@/config/constants';

import { db } from '../db';
// import { requireAuth } from '../utils';

const getUsersHandler = rest.get(`${API_URL}/users`, async (req, res, ctx) => {
  // Parse page and per_page values with fallback to default values
  const pageParam = req.url.searchParams.get('page') || '';
  const page = !isNaN(parseInt(pageParam, 10)) ? parseInt(pageParam, 10) : 1;

  const perPageParam = req.url.searchParams.get('per_page') || '';
  const per_page = !isNaN(parseInt(perPageParam, 10))
    ? parseInt(perPageParam, 10)
    : PAGINATE_STORIES_LIMIT;

  // const users = db.user.findMany({
  //   take: per_page,
  //   skip: Math.max(per_page * (page - 1), 0),
  //   // where: {
  //   //   category_id: {
  //   //     equals: category_id,
  //   //   },
  //   // },
  // });
  const users = Array.from({ length: 10 }, (_, i) => {
    const gender = Math.random() < 0.5 ? 'male' : 'female';
    const displayPhotoUrl = `https://xsgames.co/randomusers/avatar.php?g=${gender}`;
    return {
      id: (i + 1).toString(),
      username: `user_${i + 1}`,
      email: `user${i + 1}@example.com`,
      name: `User ${i + 1}`,
      created_at: '2023-08-22T12:00:00Z',
      updated_at: '2023-08-22T12:00:00Z',
      last_login: '2023-08-22T12:00:00Z',
      roles: i % 2 === 0 ? ['admin'] : ['user'],
      avatar_url: displayPhotoUrl,
      news_channel: null,
    };
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

const followUserHandler = rest.post(
  `${API_URL}/users/follow`,
  async (req, res, ctx) => {
    // Sample analytics data
    // The data
    const reqData = (await req.json()) as FormData;

    // return res(
    //   // Send a valid HTTP status code
    //   ctx.status(403),
    //   // And a response body, if necessary
    //   // ctx.json({
    //   //   errorMessage: `User '${reqData}' not found`,
    //   // }),
    //   ctx.json({ status: false }),
    // );
    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({ status: true }), //Todo: Make sure it returns something
      ctx.set('Access-Control-Allow-Origin', '*'),
    );
  },
);
export const usersHandlers = [getUsersHandler, followUserHandler];
