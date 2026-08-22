import type { Metadata } from 'next';
import Link from 'next/link';

import { BlogCard } from '@/components/blog-card';
import { getBlogs } from '@/lib/blogs';

export const metadata: Metadata = {
  title: 'Blogs',
  description:
    'The Diamond Brief Series: legal analysis from Diamond Advocates on technology, finance, data and dispute resolution in Uganda.',
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Blogs</span>
          </nav>
          <p className="eyebrow">The Diamond Brief Series</p>
          <h1>Blogs</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Latest thinking</p>
              <h2>Legal analysis you can read and take with you.</h2>
            </div>
            <p className="lead">
              Select a brief to read its summary, page through the full document, and download the
              PDF.
            </p>
          </div>
          <div className="blog-grid" data-reveal="stagger">
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy cta">
        <div className="container" data-reveal>
          <p className="eyebrow">Talk to our team</p>
          <h2>Discuss what these developments mean for you.</h2>
          <Link className="btn btn--gold" href="/contact">
            Book appointment <span>↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
