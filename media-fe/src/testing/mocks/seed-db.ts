import { testData } from '../test-data';

import { db } from './db';

export const seedDb = () => {
  const userCount = db.user.count();

  if (userCount > 0) return;

  testData.news_channels.forEach((nc) => db.news_channel.create(nc));

  testData.users.forEach((user) => db.user.create(user));

  testData.stories.forEach((story) => db.story.create(story));

  testData.bookmarks.forEach((bookmark) => db.bookmark.create(bookmark));

  testData.categories.forEach((category) => db.category.create(category));

  testData.settings.forEach((setting) => db.settings.create(setting));
};
