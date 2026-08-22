import Image from 'next/image';
import Link from 'next/link';

import { HomeHero } from '@/components/home-hero';
import { portrait } from '@/lib/images';
import { getAbout, getContact, getHero, getSite } from '@/lib/content-api';
import { getPractices } from '@/lib/practices';
import { getFeaturedTeam } from '@/lib/team';
import { getPublishedInsights } from '@/lib/insights';

export default async function HomePage() {
  const [site, hero, about, contact, practices, featuredTeam, publishedInsights] = await Promise.all([
    getSite(),
    getHero(),
    getAbout(),
    getContact(),
    getPractices(),
    getFeaturedTeam(),
    getPublishedInsights(),
  ]);

  const legalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: site.name,
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.addressStreet,
      addressLocality: site.addressLocality,
      addressCountry: site.addressCountry,
    },
  };

  const bySlug = new Map(practices.map((practice) => [practice.slug, practice]));

  // A slug that no longer names a practice is dropped rather than rendered blank,
  // so removing a practice in the CMS cannot leave a hole in this list.
  const homeRows = about.practiceSlugs
    .map((slug) => bySlug.get(slug))
    .filter((practice): practice is NonNullable<typeof practice> => Boolean(practice));

  const frontierPanels = [...about.frontierPractices]
    .sort((a, b) => a.order - b.order)
    .map((panel) => ({ panel, practice: bySlug.get(panel.slug) }))
    .filter((entry): entry is { panel: typeof entry.panel; practice: NonNullable<typeof entry.practice> } =>
      Boolean(entry.practice),
    );

  const featuredArticle = publishedInsights[0];
  const secondaryInsights = publishedInsights.slice(1, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />
      <HomeHero hero={hero} />

      <section className="section" id="about">
        <div className="container grid-2">
          <div data-reveal>
            <p className="eyebrow">{about.eyebrow}</p>
            <p className="intro-statement">
              {about.statement} <span className="gold">{about.statementHighlight}</span>
            </p>
          </div>
          <div data-reveal>
            <p className="lead">{about.lead}</p>
            <p>{about.paragraph}</p>
            <Link className="text-link" href={about.ctaHref}>
              {about.ctaText} <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section--compact section--navy recognition-section">
        <div className="container">
          <div className="award-panel" data-reveal>
            <div className="award-mark" aria-hidden="true">
              ✦
            </div>
            <div>
              <p className="eyebrow">{about.recognitionEyebrow}</p>
              <h2>{about.recognitionTitle}</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">{about.practicesEyebrow}</p>
              <h2>{about.practicesTitle}</h2>
            </div>
            <Link className="text-link" href="/practice-areas">
              View all practices <span>→</span>
            </Link>
          </div>
          <div className="practice-list" data-reveal="stagger">
            {homeRows.map((practice) => (
              <Link
                key={practice.slug}
                className="practice-row"
                data-reveal
                href={`/practice/${practice.slug}`}
              >
                <span className="practice-number">{practice.number}</span>
                <h3>{practice.shortTitle}</h3>
                <p>{practice.summary}</p>
                <span className="practice-arrow">→</span>
              </Link>
            ))}
            <Link className="practice-row" data-reveal href="/practice-areas">
              <span className="practice-number">{about.morePracticesNumber}</span>
              <h3>{about.morePracticesTitle}</h3>
              <p>{about.morePracticesSummary}</p>
              <span className="practice-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {frontierPanels.length > 0 && (
        <section className="section section--ivory">
          <div className="container grid-2">
            {frontierPanels.map(({ panel, practice }) => (
              <article key={panel.id} className="tech-panel" data-reveal data-tilt>
                <span className="tech-panel-code" aria-hidden="true">
                  {panel.code}
                </span>
                <p className="eyebrow">{panel.eyebrow}</p>
                <h2>{practice.shortTitle}</h2>
                <p>{practice.summary}</p>
                <Link className="text-link" href={`/practice/${practice.slug}`}>
                  Explore {practice.shortTitle} <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">{about.teamEyebrow}</p>
              <h2>{about.teamTitle}</h2>
            </div>
            <Link className="text-link" href="/team">
              View full team <span>→</span>
            </Link>
          </div>
          <div className="team-grid">
            {featuredTeam.map((person) => (
              <Link
                key={person.slug}
                className="person-card"
                data-reveal
                href={`/team/${person.slug}`}
              >
                <Image
                  className="person-photo"
                  src={person.image}
                  alt={person.name}
                  width={portrait.width}
                  height={portrait.height}
                  sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw"
                />
                <div className="person-info">
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">{about.insightsEyebrow}</p>
              <h2>{about.insightsTitle}</h2>
            </div>
            <Link className="text-link" href="/insights">
              All insights <span>→</span>
            </Link>
          </div>
          <div className="insights-grid">
            {featuredArticle ? (
              <Link
                className="insight-card featured"
                data-reveal
                href={`/insights/${featuredArticle.slug}`}
              >
                <span className="article-meta">{featuredArticle.meta}</span>
                <div>
                  <h3>{featuredArticle.title}</h3>
                  <span className="text-link">
                    Read article <span>→</span>
                  </span>
                </div>
              </Link>
            ) : null}
            <div className="insight-stack">
              {secondaryInsights.map((insight) => (
                <Link
                  key={insight.slug}
                  className="insight-card"
                  data-reveal
                  href={`/insights/${insight.slug}`}
                >
                  <span className="article-meta">{insight.meta}</span>
                  <div>
                    <h3>{insight.title}</h3>
                    <span className="text-link">
                      Read article <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--navy cta">
        <div className="container" data-reveal>
          <p className="eyebrow">{about.ctaEyebrow}</p>
          <h2>{about.ctaTitle}</h2>
          <p className="lead" style={{ marginInline: 'auto' }}>
            {about.ctaLead}
          </p>
          <div className="button-row" style={{ justifyContent: 'center' }}>
            <Link className="btn btn--gold" href="/contact">
              Book appointment <span>↗</span>
            </Link>
            <a className="btn btn--outline" href={contact.phoneHref}>
              {contact.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
