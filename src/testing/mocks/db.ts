import { factory, primaryKey } from '@mswjs/data';
import { uid } from '@/utils/';
const models = {
  user: {
    id: primaryKey(uid),
    createdAt: Date.now,
    email: String,
    password: String,
    organizationId: String,
  },
  story: {
    id: primaryKey(uid),
    title: String,
    slug: String,
    body: String,
    categoryId: String,
    createdAt: Date.now,
    updatedAt: Date.now,
    parent_stories: Array,
    children_stories: Array,
  },
  category: {
    id: primaryKey(uid),
    title: String,
    description: String,
    slug: String,
  },
};
export const db = factory(models);
