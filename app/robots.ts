import type { MetadataRoute } from 'next';

import { getSite } from '@/lib/site';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSite();

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', site.url).toString(),
  };
}
