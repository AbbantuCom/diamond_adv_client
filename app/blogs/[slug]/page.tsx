import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BlogCard } from '@/components/blog-card';
import { ConsentGate } from '@/components/consent-gate';
import {
  blogDownloadUrl,
  blogPreviewUrl,
  getBlog,
  getBlogs,
  getRelatedBlogs,
  isLocalPdf,
} from '@/lib/blogs';
import { getContact } from '@/lib/content-api';
import { getSite } from '@/lib/site';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getBlogs()).map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.description[0],
    openGraph: {
      title: blog.title,
      description: blog.description[0],
      type: 'article',
      authors: blog.authors,
      images: [{ url: blog.image.src }],
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const [related, site] = await Promise.all([getRelatedBlogs(blog.slug), getSite()]);
  const contact = await getContact();

  const downloadUrl = blogDownloadUrl(blog.pdf);
  const previewUrl = blogPreviewUrl(blog.pdf);
  // A local PDF saves in place; a Drive file has to open in its own tab.
  const localPdf = isLocalPdf(blog.pdf);
  // A brief with no file at all still renders its summary — it just has nothing
  // to link to, so the download controls are left out rather than pointing nowhere.
  const downloadProps = downloadUrl
    ? localPdf
      ? { href: downloadUrl, download: blog.pdf.fileName }
      : { href: downloadUrl, target: '_blank', rel: 'noopener noreferrer' }
    : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.description[0],
    author: blog.authors.map((name) => ({ '@type': 'Person', name })),
    publisher: { '@type': 'Organization', name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="inner-hero blog-hero">
        <div className="container" data-reveal="hero">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/blogs">Blogs</Link>
            <span>/</span>
            <span className="breadcrumb-current">{blog.title}</span>
          </nav>
          <p className="eyebrow">{blog.series}</p>
          <h1>{blog.title}</h1>
          <p className="blog-authors">By {blog.authors.join(' and ')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container detail-layout detail-layout--editorial">
          <aside>
            <div className="blog-aside">
              <span className="section-nav-label">The full brief</span>
              <p className="blog-file">{blog.pdf.fileName}</p>
              {downloadProps && (
                <a className="btn btn--navy" {...downloadProps}>
                  Download PDF <span>↓</span>
                </a>
              )}
              <div className="rule"></div>
              <p className="blog-aside-note">
                Have a question about what this means for your business?
              </p>
              <Link className="text-link" href="/contact">
                Book appointment <span>→</span>
              </Link>
            </div>
          </aside>

          <div>
            <section className="detail-section" data-reveal>
              <p className="eyebrow">In this brief</p>
              {blog.description.map((paragraph, index) =>
                index === 0 ? (
                  <p key={paragraph.slice(0, 48)} className="lead">
                    {paragraph}
                  </p>
                ) : (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ),
              )}

              {blog.highlights.length > 0 ? (
                <>
                  {blog.highlightsTitle && <h2 className="blog-subhead">{blog.highlightsTitle}</h2>}
                  <ul className="blog-highlights">
                    {blog.highlights.map((item) => (
                      <li key={item.slice(0, 48)}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              {blog.closing.map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)}
            </section>

            {previewUrl && downloadUrl && downloadProps && (
              <section className="detail-section blog-reader-section" id="read" data-reveal>
                <div className="section-head">
                  <div>
                    <p className="eyebrow">Read the brief</p>
                    <h2>The full document.</h2>
                  </div>
                  <a className="text-link" {...downloadProps}>
                    Download PDF <span>↓</span>
                  </a>
                </div>
                <ConsentGate
                  label="the PDF reader"
                  provider="Google Drive"
                  fallback={{ href: downloadUrl, label: 'Download the PDF instead' }}
                  skip={localPdf}
                >
                  <div className="blog-reader">
                    <iframe
                      title={`${blog.title} (PDF)`}
                      src={previewUrl}
                      loading="lazy"
                      allow="autoplay"
                    />
                  </div>
                </ConsentGate>
                <p className="form-note">
                  Scroll inside the reader to page through the brief. If it does not load,{' '}
                  <a className="blog-inline-link" {...downloadProps}>
                    open the PDF directly
                  </a>
                  .
                </p>
              </section>
            )}
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Related briefs</p>
              <h2>More from the series.</h2>
            </div>
            <Link className="text-link" href="/blogs">
              All blogs <span>→</span>
            </Link>
          </div>
          <div className="blog-grid" data-reveal="stagger">
            {related.map((item) => (
              <BlogCard key={item.slug} blog={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy cta">
        <div className="container" data-reveal>
          <p className="eyebrow">Talk to our team</p>
          <h2>Guided by global vision and grounded in strong legal foundations.</h2>
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
