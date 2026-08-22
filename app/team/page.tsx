import type { Metadata } from 'next';
import Link from 'next/link';

import { TeamDirectory } from '@/components/team-directory';
import { getTeam } from '@/lib/team';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the lawyers of Diamond Advocates.',
};

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <>
      <section className="inner-hero team-hero">
        <div className="team-hero-signal" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="team-hero-beam" aria-hidden="true"></div>
        <div className="container" data-reveal="hero">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Our Team</span>
          </nav>
          <p className="eyebrow">Our people</p>
          <h1>
            <span>One team.</span> <span>Clear purpose.</span>
          </h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid-2" data-reveal>
            <div>
              <h2>Our lawyers work as one team.</h2>
            </div>
            <p className="lead">
              Our lawyers work as one team to deliver tailored, results-driven legal support.
            </p>
          </div>
          <div className="rule"></div>
          <TeamDirectory team={team} />
        </div>
      </section>

      <section className="section section--navy cta">
        <div className="container" data-reveal>
          <p className="eyebrow">Our shared direction</p>
          <h2>Guided by global vision and grounded in strong legal foundations.</h2>
          <Link className="btn btn--gold" href="/contact">
            Talk to our team <span>↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
