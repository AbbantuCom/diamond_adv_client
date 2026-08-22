import type { Metadata } from 'next';

import { BackToTop } from '@/components/back-to-top';
import { CookieBanner } from '@/components/cookie-banner';
import { PreviewBar } from '@/components/preview-bar';
import { ScrollEffects } from '@/components/scroll-effects';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SmoothScroll } from '@/components/smooth-scroll';
import { getContact, getFooter, getSite } from '@/lib/content-api';
import { getPracticeNavLinks } from '@/lib/practices';

import '@/styles/styles.css';
import '@/styles/responsive.css';

/**
 * Title, description and canonical base all come from Site Settings in the admin
 * panel, so this has to be a function rather than a static object.
 */
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} | Award Winning Tech Law Firm`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    openGraph: {
      title: site.name,
      description: site.tagline,
      type: 'website',
      siteName: site.name,
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetched together rather than in sequence: these are four independent reads and
  // every page pays for them, so serialising would add three round trips to each.
  const [site, footer, contact, practiceLinks] = await Promise.all([
    getSite(),
    getFooter(),
    getContact(),
    getPracticeNavLinks(),
  ]);

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader
          logo={site.logo}
          siteName={site.name}
          navLinks={site.primaryNav}
          practiceLinks={practiceLinks}
        />
        <main id="main">{children}</main>
        <SiteFooter site={site} footer={footer} contact={contact} />
        <BackToTop />
        <CookieBanner />
        <SmoothScroll />
        <ScrollEffects />
        <PreviewBar />
      </body>
    </html>
  );
}
