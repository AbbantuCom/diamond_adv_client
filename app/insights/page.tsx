import type { Metadata } from 'next';
import Link from 'next/link';

import { InsightsListing } from '@/components/insights-listing';
import { getInsights } from '@/lib/insights';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Legal insights and Diamond Briefs from Diamond Advocates.',
};

export default async function InsightsPage() {
  const insights = await getInsights();

  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Insights</span>
          </nav>
          <p className="eyebrow">Ideas and analysis</p>
          <h1>Insights</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Latest thinking</p>
              <h2>Understanding a changing legal landscape.</h2>
            </div>
          </div>
          <InsightsListing insights={insights} />
        </div>
      </section>
    </>
  );
}
