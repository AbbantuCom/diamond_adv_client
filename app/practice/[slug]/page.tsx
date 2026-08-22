import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { SectionNav } from '@/components/section-nav';
import { portrait } from '@/lib/images';
import { getNextPractice, getPractice, getPractices, hasLead } from '@/lib/practices';

type PageProps = { params: Promise<{ slug: string }> };

const sections = [
  { id: 'approach', label: 'Our Approach' },
  { id: 'services', label: 'How We Help' },
  { id: 'team', label: 'Practice Team' },
];

export async function generateStaticParams() {
  return (await getPractices()).map((practice) => ({ slug: practice.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const practice = await getPractice(slug);
  if (!practice) return {};
  return {
    title: practice.title,
    description: practice.intro,
    openGraph: { title: practice.title, description: practice.intro },
  };
}

export default async function PracticeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const practice = await getPractice(slug);
  if (!practice) notFound();
  const next = await getNextPractice(practice.slug);

  return (
    <>
      <section className="practice-hero">
        <Image
          className="practice-hero-image"
          src={practice.image.src}
          alt={practice.image.alt}
          width={practice.image.width}
          height={practice.image.height}
          priority
          sizes="(max-width: 820px) 100vw, 75vw"
        />
        <span className="practice-hero-grid" aria-hidden="true"></span>
        <div className="container practice-hero-content" data-reveal="hero">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/practice-areas">Our Practice</Link>
            <span>/</span>
            <span>{practice.shortTitle}</span>
          </nav>
          <div className="practice-hero-meta">
            <span>{practice.number}</span>
            <span>{practice.category}</span>
          </div>
          <h1>{practice.title}</h1>
          <p>{practice.intro}</p>
          <a className="btn btn--gold" href="#approach">
            Explore the practice <span>↓</span>
          </a>
        </div>
      </section>

      <section className="section practice-narrative">
        <div className="container detail-layout detail-layout--editorial">
          <aside>
            <SectionNav sections={sections} />
          </aside>
          <div>
            <section className="detail-section practice-approach" id="approach" data-reveal>
              <p className="eyebrow">Our approach</p>
              <p className="practice-dropcopy">{practice.approach}</p>
              <div className="practice-pullquote">
                <span aria-hidden="true">“</span>
                <p>Legal clarity for ambitious decisions.</p>
              </div>
            </section>

            <section className="detail-section" id="services">
              <div className="section-head" data-reveal>
                <div>
                  <p className="eyebrow">Our practice</p>
                  <h2>How we support clients.</h2>
                </div>
                <span className="practice-service-count">
                  {String(practice.services.length).padStart(2, '0')} capabilities
                </span>
              </div>
              <ol className="service-grid" data-reveal="stagger">
                {practice.services.map((service, index) => (
                  <li key={service}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{service}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="detail-section practice-team-section" id="team" data-reveal>
              <p className="eyebrow">Practice team</p>
              {hasLead(practice) ? (
                <Link className="practice-lead" href={`/team/${practice.lead.slug}`}>
                  <Image
                    src={practice.lead.image}
                    alt={practice.lead.name}
                    width={portrait.width}
                    height={portrait.height}
                    sizes="(max-width: 600px) 100vw, 30vw"
                  />
                  <div>
                    <span>Practice lead</span>
                    <h2>{practice.lead.name}</h2>
                    <p>{practice.lead.role}</p>
                    <span className="text-link">
                      View profile <span>→</span>
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="practice-team-open">
                  <div>
                    <h2>A multidisciplinary team, assembled around your matter.</h2>
                    <p>
                      Our lawyers combine sector understanding with the right legal experience for
                      every engagement.
                    </p>
                  </div>
                  <Link className="btn btn--navy" href="/team">
                    Meet our team <span>↗</span>
                  </Link>
                </div>
              )}
            </section>
          </div>
        </div>
      </section>

      {next && next.slug !== practice.slug && (
      <section className="practice-next section--navy">
        <Link href={`/practice/${next.slug}`}>
          <div className="container">
            <span className="eyebrow">Continue exploring</span>
            <div>
              <p>Next practice</p>
              <h2>{next.title}</h2>
              <span className="practice-next-arrow">↗</span>
            </div>
          </div>
        </Link>
      </section>
      )}
    </>
  );
}
