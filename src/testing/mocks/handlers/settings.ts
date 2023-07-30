import { rest } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '../db';
// import { requireAuth } from '../utils';

const getSettingsHandler = rest.get(
  `${API_URL}/settings`,
  async (req, res, ctx) => {
    const userId = req.url.searchParams.get('user_id') as string;
    const settings = db.settings.findFirst({
      where: {
        user_id: {
          equals: userId,
        },
      },
    });
    console.log('settings', settings);

    return res(ctx.delay(300), ctx.status(200), ctx.json(settings));
  },
);

export const settingsHandlers = [getSettingsHandler];
