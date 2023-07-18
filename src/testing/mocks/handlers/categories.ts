import { rest } from 'msw';

import { API_URL } from '@/config/constants';

import { db } from '../db';

const getCategoryHandler = rest.get(
  `${API_URL}/categories/:categoryId`,
  (req, res, ctx) => {
    const categoryId = req.params.categoryId as string;

    const category = db.category.findFirst({
      where: {
        id: {
          equals: categoryId,
        },
      },
    });

    if (!category) {
      return res(ctx.status(404), ctx.json({ message: 'Not found!' }));
    }

    return res(ctx.delay(300), ctx.status(200), ctx.json(category));
  },
);

export const categoriesHandlers = [getCategoryHandler];
