'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { portrait } from '@/lib/images';
import type { TeamMember as Person } from '@/lib/content-types';

const filters = [
  { value: 'all', label: 'All' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'associate', label: 'Associates' },
] as const;

type TeamDirectoryProps = {
  team: Person[];
};

/** Filterable card grid of the full team. */
export function TeamDirectory({ team }: TeamDirectoryProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  // The re-entry animation should only run once the visitor starts filtering.
  const [filtering, setFiltering] = useState(false);

  return (
    <>
      <div className="filters team-filters" aria-label="Filter team" data-reveal>
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`filter-button${activeFilter === filter.value ? ' active' : ''}`}
            aria-pressed={activeFilter === filter.value}
            onClick={() => {
              setFiltering(true);
              setActiveFilter(filter.value);
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="team-grid team-grid--animated" data-reveal="stagger">
        {team.map((person) => {
          const visible = activeFilter === 'all' || person.category === activeFilter;
          return (
            <Link
              key={person.slug}
              className={[
                'person-card',
                visible ? (filtering ? 'filter-enter' : '') : 'hidden',
              ]
                .filter(Boolean)
                .join(' ')}
              data-tilt
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
          );
        })}
      </div>
    </>
  );
}
