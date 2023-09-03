import { rest } from 'msw';

import { API_URL, PAGINATE_STORIES_LIMIT } from '@/config/constants';

import { db } from '../db';
import { HashtagItem } from '@/testing/types';
import { removeHashFromHashtag } from '@/utils';
// import { requireAuth } from '../utils';

const getHashtagsHandler = rest.get(
  `${API_URL}/hashtags`,
  async (req, res, ctx) => {
    const category_id = req.url.searchParams.get('category_id') as string;
    const hashtag = req.url.searchParams.get('hashtag') as string;

    // Parse page and per_page values with fallback to default values
    const pageParam = req.url.searchParams.get('page') || '';
    const page = !isNaN(parseInt(pageParam, 10)) ? parseInt(pageParam, 10) : 1;

    const perPageParam = req.url.searchParams.get('per_page') || '';
    let per_page = !isNaN(parseInt(perPageParam, 10))
      ? parseInt(perPageParam, 10)
      : PAGINATE_STORIES_LIMIT;

    per_page = 15;
    const stories = db.story.getAll();

    const start = (page - 1) * per_page;
    const end = start + per_page;

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
      ctx.json({
        hashtags: hashtagItems.slice(start, end),
        page,
        total_pages: Math.ceil(db.story.count() / per_page),
        total: db.story.count(),
      }),
      ctx.set('Access-Control-Allow-Origin', '*'),
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
        ctx.set('Access-Control-Allow-Origin', '*'),
      );
    }

    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.set('Access-Control-Allow-Origin', '*'),
      ctx.json(story),
    );
  },
);

export const hashtagsHandlers = [getHashtagsHandler, getHashtagHandler];
