import { rest } from 'msw';
import { API_URL } from '@/config/constants';
import { usersHandlers } from './users';
import { storiesHandlers } from './stories';
import { categoriesHandlers } from './categories';
import { hashtagsHandlers } from './hashtags';
import { settingsHandlers } from './settings';
import { bookmarksHandlers } from './bookmarks';
import { authHandlers } from './auth';
export const handlers = [
  ...authHandlers,
  ...usersHandlers,
  ...storiesHandlers,
  ...categoriesHandlers,
  ...hashtagsHandlers,
  ...bookmarksHandlers,
  ...settingsHandlers,
  rest.get(`${API_URL}/healthcheck`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ healthy: true }));
  }),
];
