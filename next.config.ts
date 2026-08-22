import type { NextConfig } from 'next';

/**
 * Custom domain serving CMS media, if one is set up (e.g. media.diamondadvocates.com).
 * Optional — uploads served straight from the R2 bucket's own public URL are
 * covered by the **.r2.dev pattern below.
 */
const mediaHostname = process.env.MEDIA_PUBLIC_URL
  ? new URL(process.env.MEDIA_PUBLIC_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Images uploaded through the admin panel live in Cloudflare R2, so next/image
    // has to be told their host — without this every CMS-uploaded image 400s at
    // runtime while the bundled ones in public/ keep working, which is an easy
    // failure to ship without noticing.
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev' },
      ...(mediaHostname ? [{ protocol: 'https' as const, hostname: mediaHostname }] : []),
    ],
  },
  async redirects() {
    // Preserve inbound links to the original static pages.
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/practice-areas.html', destination: '/practice-areas', permanent: true },
      { source: '/team.html', destination: '/team', permanent: true },
      { source: '/insights.html', destination: '/insights', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/article.html', destination: '/insights/e-discovery-in-litigation', permanent: true },
      {
        source: '/practice-detail.html',
        has: [{ type: 'query', key: 'practice', value: '(?<practice>.*)' }],
        destination: '/practice/:practice',
        permanent: true,
      },
      { source: '/practice-detail.html', destination: '/practice-areas', permanent: true },
      {
        source: '/team-profile.html',
        has: [{ type: 'query', key: 'person', value: '(?<person>.*)' }],
        destination: '/team/:person',
        permanent: true,
      },
      { source: '/team-profile.html', destination: '/team', permanent: true },
    ];
  },
};

export default nextConfig;
