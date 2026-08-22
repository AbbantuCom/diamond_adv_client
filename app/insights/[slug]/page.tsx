import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ReadingProgress } from '@/components/reading-progress';
import { getInsight, getPublishedInsights } from '@/lib/insights';
import { getSite } from '@/lib/site';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPublishedInsights()).map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight?.hasArticle) return {};
  return {
    title: insight.title,
    description: insight.article.standfirst,
    openGraph: {
      title: insight.title,
      description: insight.article.standfirst,
      type: 'article',
      publishedTime: insight.article.datePublished,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const [insight, site] = await Promise.all([getInsight(slug), getSite()]);
  if (!insight?.hasArticle) notFound();
  const article = insight.article;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    datePublished: article.datePublished,
    publisher: { '@type': 'Organization', name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ReadingProgress />

      <header className="article-header section--ivory">
        <div className="article-shell">
          <nav className="breadcrumb" style={{ justifyContent: 'center', color: 'var(--slate-500)' }}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/insights">Insights</Link>
            <span>/</span>
            <span>Article</span>
          </nav>
          <span className="article-meta">{article.metaLine}</span>
          <h1>{insight.title}</h1>
          <p className="lead" style={{ marginInline: 'auto' }}>
            {article.standfirst}
          </p>
        </div>
      </header>

      <article className="article-body article-shell">
        {article.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
        {article.takeaways.length > 0 && (
          <>
            <h2>{article.takeawaysTitle}</h2>
            <ul>
              {article.takeaways.map((takeaway) => (
                <li key={takeaway.slice(0, 48)}>{takeaway}</li>
              ))}
            </ul>
          </>
        )}
        {article.closing.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
        {article.note && <div className="content-placeholder">{article.note}</div>}
      </article>

      <section className="section section--navy cta">
        <div className="container">
          <p className="eyebrow">Legal insight into action</p>
          <h2>Discuss your matter with our team.</h2>
          <Link className="btn btn--gold" href="/contact">
            Book appointment <span>↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
