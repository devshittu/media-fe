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

    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.set('Access-Control-Allow-Origin', '*'),
      ctx.json(settings),
    );
  },
);

const updateUserSettings = rest.put(
  `${API_URL}/settings`,
  async (req, res, ctx) => {
    // Sample analytics data
    // The data
    const reqData = (await req.json()) as FormData;
    console.log('updateUserSettings: data in json', reqData);

    // return res(
    //   // Send a valid HTTP status code
    //   ctx.status(403),
    //   // And a response body, if necessary
    //   ctx.json({
    //     status: 'failure',
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
export const settingsHandlers = [getSettingsHandler, updateUserSettings];
