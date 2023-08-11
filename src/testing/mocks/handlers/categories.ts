import { rest } from 'msw';

import { API_URL, PAGINATE_STORIES_LIMIT } from '@/config/constants';

import { db } from '../db';

const getCategoriesHandler = rest.get(
  `${API_URL}/categories`,
  (req, res, ctx) => {
    const category_id = req.params.category_id as string;

    const page = 1;
    const pageSize = PAGINATE_STORIES_LIMIT;

    const start = (page - 1) * pageSize;
    const end = start ? start + pageSize : -1;

    const categories = db.category.getAll();

    if (!categories) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Not found!' }),
        ctx.set('Access-Control-Allow-Origin', '*'),
      );
    }

    //.slice(start, end)

    return res(ctx.delay(300), ctx.status(200), ctx.json(categories));
  },
);

const getCategoryHandler = rest.get(
  `${API_URL}/categories/:category_id`,
  (req, res, ctx) => {
    const category_id = req.params.category_id as string;

    const category = db.category.findFirst({
      where: {
        id: {
          equals: category_id,
        },
      },
    });

    if (!category) {
      return res(
        ctx.status(404),
        ctx.set('Access-Control-Allow-Origin', '*'),
        ctx.json({ message: 'Not found!' }),
      );
    }

    return res(
      ctx.delay(300),
      ctx.set('Access-Control-Allow-Origin', '*'),
      ctx.status(200),
      ctx.json(category),
    );
  },
);

export const categoriesHandlers = [getCategoryHandler, getCategoriesHandler];
