import { rest } from 'msw';
import { API_URL } from '@/config/constants';
import { storiesHandlers } from './stories';
import { categoriesHandlers } from './categories';
import { hashtagsHandlers } from './hashtags';
export const handlers = [
  ...storiesHandlers,
  ...categoriesHandlers,
  ...hashtagsHandlers,
  rest.get(`${API_URL}/healthcheck`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ healthy: true }));
  }),
];
