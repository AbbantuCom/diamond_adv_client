import type { MetadataRoute } from 'next';

import { getBlogs } from '@/lib/blogs';
import { getPublishedInsights } from '@/lib/insights';
import { getPractices } from '@/lib/practices';
import { getSite } from '@/lib/site';
import { getTeam } from '@/lib/team';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, practices, team, publishedInsights, blogs] = await Promise.all([
    getSite(),
    getPractices(),
    getTeam(),
    getPublishedInsights(),
    getBlogs(),
  ]);

  const routes = [
    '/',
    '/practice-areas',
    '/team',
    '/insights',
    '/blogs',
    '/contact',
    '/cookie-policy',
    '/privacy-policy',
    ...practices.map((practice) => `/practice/${practice.slug}`),
    ...team.map((person) => `/team/${person.slug}`),
    ...publishedInsights.map((insight) => `/insights/${insight.slug}`),
    ...blogs.map((blog) => `/blogs/${blog.slug}`),
  ];

  return routes.map((route) => ({
    url: new URL(route, site.url).toString(),
    lastModified: new Date(),
  }));
}
