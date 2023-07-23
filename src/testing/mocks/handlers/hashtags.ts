import { rest } from 'msw';

import { API_URL } from '@/config/constants';

import { db } from '../db';
import { HashtagItem } from '@/testing/types';
import { removeHashFromHashtag } from '@/utils';
// import { requireAuth } from '../utils';

const getHashtagsHandler = rest.get(
  `${API_URL}/hashtags`,
  async (req, res, ctx) => {
    const stories = db.story.getAll();

    const page = 1;
    const pageSize = 15;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const hashtagMap: { [hashtag: string]: HashtagItem } = {}; // Use hashtagMap to track each hashtag item

    // Regular expression to find hashtags (#) and words after them
    const hashtagRegex = /#\w+/g;

    stories.forEach((story: any) => {
      const hashtags = story.body.match(hashtagRegex) || []; // Extract hashtags from the story body
      hashtags.forEach((h: string) => {
        const hashtag = removeHashFromHashtag(h);
        // If the hashtag is not in the hashtagMap, add it with an initial count and empty stories array
        if (!hashtagMap[hashtag]) {
          hashtagMap[hashtag] = {
            id: hashtag, // Assuming you want the hashtag itself as the ID
            label: hashtag,
            count: 1,
            stories: [story.id], // Add the current story ID to the stories array
          };
        } else {
          // If the hashtag already exists in the map, increment the count and add the current story ID to the stories array
          hashtagMap[hashtag].count++;
          hashtagMap[hashtag].stories.push(story.id);
        }
      });
    });

    // Convert the hashtag map values to an array
    const hashtagItems: HashtagItem[] = Object.values(hashtagMap);

    // Sort the hashtags based on the count (descending order)
    hashtagItems.sort((a, b) => b.count - a.count);

    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json(hashtagItems.slice(start, end)),
    );
  },
);

const getHashtagHandler = rest.get(
  `${API_URL}/stories/:storyId`,
  async (req, res, ctx) => {
    const storyId = req.params.storyId as string;

    const story = db.story.findFirst({
      where: {
        id: {
          equals: storyId,
        },
      },
    });

    if (!story) {
      return res(
        ctx.delay(300),
        ctx.status(404),
        ctx.json({ message: 'Not found!' }),
      );
    }

    return res(ctx.delay(300), ctx.status(200), ctx.json(story));
  },
);

export const hashtagsHandlers = [getHashtagsHandler, getHashtagHandler];
