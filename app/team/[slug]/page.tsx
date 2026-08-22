import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { portrait } from '@/lib/images';
import { getSite } from '@/lib/site';
import { getNextPerson, getPerson, getTeam } from '@/lib/team';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getTeam()).map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [person, site] = await Promise.all([getPerson(slug), getSite()]);
  if (!person) return {};
  return {
    title: person.name,
    description: `${person.name}, ${person.role} at ${site.name}.`,
    openGraph: { title: person.name, description: person.role },
  };
}

export default async function TeamProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const [person, site] = await Promise.all([getPerson(slug), getSite()]);
  if (!person) notFound();
  const next = await getNextPerson(person.slug);

  return (
    <>
      <section className="section" style={{ paddingTop: '160px' }}>
        <div className="container">
          <nav className="breadcrumb" style={{ color: 'var(--slate-500)' }}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/team">Our Team</Link>
            <span>/</span>
            <span>{person.name}</span>
          </nav>
          <div className="profile-layout">
            <div className="profile-portrait">
              <Image
                src={person.image}
                alt={person.name}
                width={portrait.width}
                height={portrait.height}
                priority
                sizes="(max-width: 820px) 100vw, 40vw"
              />
            </div>
            <div className="profile-copy">
              <p className="eyebrow">Our team</p>
              <h1>{person.name}</h1>
              <p className="profile-role">{person.role}</p>
              <h2>Biography</h2>
              <div className="profile-bio">
                {person.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
              <div className="rule"></div>
              <h3>Connect with the firm</h3>
              <p>For enquiries, contact the {site.name} office.</p>
              <div className="button-row">
                <Link className="btn btn--navy" href="/contact">
                  Book appointment
                </Link>
                <a className="text-link" href={`mailto:${site.email}`}>
                  Email the firm <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section--compact section--ivory">
        <div
          className="container"
          style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}
        >
          <Link className="text-link" href="/team">
            ← All team members
          </Link>
          {next && next.slug !== person.slug && (
            <Link className="text-link" href={`/team/${next.slug}`}>
              Next profile →
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
