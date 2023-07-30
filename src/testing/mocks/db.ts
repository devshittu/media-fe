import { factory, nullable, primaryKey } from '@mswjs/data';
import { uid } from '@/utils/';
const models = {
  user: {
    id: primaryKey(uid),
    created_at: Date.now,
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
    created_at: Date.now,
    updated_at: Date.now,
    parent_stories: Array,
    children_stories: Array,
  },
  category: {
    id: primaryKey(uid),
    title: String,
    description: String,
    slug: String,
  },
  hashtag: {
    id: primaryKey(uid),
    label: String,
    count: Number,
    stories: Array,
  },
  settings: {
    id: primaryKey(uid),
    user_id: String,
    theme: String,
    account_details: {
      display_name: String,
      email: String,
    },
    notifications: {
      email: {
        account: Number, // email about the user's account
        marketing: Number, // email about the marketing, products and promotions
        updates: Number, // newly on-boarded features/announcements
      },
    },
    favorite_categories: nullable(Array),
    last_updated: Date.now,
    created_at: Date.now,
    updated_at: Date.now,
  },
};
export const db = factory(models);
