// pages/api/sitemap.xml.ts
import { generateDynamicSitemap } from '@/lib/sitemap';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function sitemapHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const sitemap = await generateDynamicSitemap();
    res.setHeader('Content-Type', 'application/xml');
    console.log('sitemap://', sitemap, res);
    res.status(200).send(sitemap);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error generating sitemap');
  }
}
