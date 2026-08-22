import type { Metadata } from 'next';
import Link from 'next/link';

import { PracticeAtlas } from '@/components/practice-atlas';
import { getPractices } from '@/lib/practices';

export const metadata: Metadata = {
  title: 'Our Areas of Practice',
  description: 'Explore Diamond Advocates’ nine areas of legal practice.',
};

export default async function PracticeAreasPage() {
  const practices = await getPractices();

  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Our Practice</span>
          </nav>
          <p className="eyebrow">Capability for what comes next</p>
          <h1>Our Areas of Practice</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" data-reveal>
            <div>
              <p className="eyebrow">Our approach</p>
              <h2>Grounded advice. Lasting client solutions.</h2>
            </div>
            <div>
              <p className="lead">
                We deliver more than legal opinions. Every skill, relationship and market insight is
                focused on helping our clients move forward with clarity, confidence and lasting
                advantage.
              </p>
              <Link className="text-link" href="/contact">
                Start a conversation <span>→</span>
              </Link>
            </div>
          </div>
          <div className="rule"></div>
          <div className="award-panel" data-reveal>
            <div className="award-mark" aria-hidden="true">
              ✦
            </div>
            <h3>
              Recognised by the Uganda Law Society with a 2025 Digital Excellence Award for
              market-leading legal technology practice.
            </h3>
          </div>
        </div>
      </section>

      <section className="section section--ivory practice-atlas" id="practices">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">The practice atlas</p>
              <h2>{practices.length} disciplines. One connected perspective.</h2>
            </div>
            <p className="lead">Search or explore the field that matches your challenge.</p>
          </div>
          <PracticeAtlas practices={practices} />
        </div>
      </section>

      <section className="section section--navy cta">
        <div className="container">
          <p className="eyebrow">Legal support</p>
          <h2>Discuss your matter with our team.</h2>
          <Link className="btn btn--gold" href="/contact">
            Book appointment <span>↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
