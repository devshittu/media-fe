import { APP_URL } from '@/config/constants';
import { getStories } from '@/features/stories';

// lib/sitemap.ts
export async function generateDynamicSitemap() {
  // Fetch your article data. This could be from a database, API, etc.
  //   const articles = await fetchAllArticles(); // Replace with actual data fetching logic
  const articles = await getStories({ params: { page_size: 100 } }); // Replace with actual data fetching logic
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${articles.results
        .map(
          ({
            id,
            slug,
            event_reported_at,
            storyline_id,
            created_at,
            title,
          }) => {
            return `
            <url>
              <title>${title}</title>
              <loc>${APP_URL}/stories/${slug}</loc>
              <sline>${APP_URL}/storylines/${storyline_id}</sline>
              <lastmod>${new Date(created_at).toISOString()}</lastmod>
              <priority>0.7</priority>
            </url>
          `;
          },
        )
        .join('')}
    </urlset>
  `;
  return sitemap;
}
