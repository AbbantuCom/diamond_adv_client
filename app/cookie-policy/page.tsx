import type { Metadata } from 'next';
import Link from 'next/link';

import { CookiePreferences } from '@/components/cookie-preferences';
import { getSite } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'How Diamond Advocates uses cookies, what embedded content sets them, and how to accept or reject them.',
};

export default async function CookiePolicyPage() {
  const site = await getSite();

  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Cookie Policy</span>
          </nav>
          <p className="eyebrow">Transparency</p>
          <h1>Cookie Policy</h1>
        </div>
      </section>

      <section className="section">
        <div className="container detail-layout detail-layout--editorial">
          <aside>
            <div className="blog-aside">
              <span className="section-nav-label">Change your mind</span>
              <p className="blog-aside-note">
                You can accept or reject at any time, and the change takes effect immediately.
              </p>
              <a className="text-link" href="#preferences">
                Cookie settings <span>→</span>
              </a>
            </div>
          </aside>

          <div>
            <section className="detail-section" data-reveal>
              <p className="eyebrow">In short</p>
              <p className="lead">
                This website sets no advertising or analytics cookies. The only cookies that can
                reach your device come from content we embed from other companies, and none of that
                loads until you allow it.
              </p>
            </section>

            <section className="detail-section" data-reveal>
              <h2>What we store ourselves</h2>
              <p>
                When you accept or reject below, we save that single choice in your browser’s local
                storage so we do not have to ask again. It stays on your device, it is not a
                tracking cookie, and it is never sent to us or to anyone else. Clearing your browser
                data removes it.
              </p>
            </section>

            <section className="detail-section" data-reveal>
              <h2>What embedded content sets</h2>
              <p>
                Two parts of this site show content hosted by Google, and Google may set its own
                cookies when that content loads:
              </p>
              <ul className="blog-highlights">
                <li>
                  <strong>The office map</strong> on the{' '}
                  <Link className="blog-inline-link" href="/contact">
                    contact page
                  </Link>
                  , shown through Google Maps.
                </li>
                <li>
                  <strong>The PDF reader</strong> on each{' '}
                  <Link className="blog-inline-link" href="/blogs">
                    brief
                  </Link>
                  , shown through Google Drive.
                </li>
              </ul>
              <p>
                If you reject, neither is requested at all: you see a placeholder with a button, and
                nothing reaches Google unless you press it. Those cookies are set by Google under its
                own privacy terms, not by us.
              </p>
            </section>

            <section className="detail-section" data-reveal>
              <h2>What we do not do</h2>
              <p>
                We do not run analytics, advertising, social media pixels or any other tracking on
                this site. The appointment form sets no cookies: submitting it sends your enquiry
                straight to us, and if that fails it opens a message in your own email application
                addressed to {site.email}, which you send yourself. What we do with the enquiry
                itself is set out in our{' '}
                <Link className="blog-inline-link" href="/privacy-policy">
                  privacy policy
                </Link>
                .
              </p>
            </section>

            <section className="detail-section" data-reveal>
              <h2>Accept or reject</h2>
              <CookiePreferences />
            </section>

            <section className="detail-section" data-reveal style={{ borderBottom: 0 }}>
              <h2>Questions</h2>
              <p>
                Write to <a href={`mailto:${site.email}`}>{site.email}</a> or call{' '}
                <a href={site.phoneHref}>{site.phone}</a> and we will answer any question about this
                policy. Our{' '}
                <Link className="blog-inline-link" href="/privacy-policy">
                  privacy policy
                </Link>{' '}
                covers how we handle personal data more broadly.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
