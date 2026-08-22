'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { PracticeItem as Practice } from '@/lib/content-types';

const filters = [
  { value: 'all', label: 'All' },
  { value: 'digital', label: 'Digital' },
  { value: 'business', label: 'Business' },
  { value: 'property', label: 'Property' },
  { value: 'projects', label: 'Projects' },
] as const;

type PracticeAtlasProps = {
  practices: Practice[];
};

/** Searchable, filterable grid of every practice area. */
export function PracticeAtlas({ practices }: PracticeAtlasProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [query, setQuery] = useState('');
  // The re-entry animation should only run once the visitor starts filtering.
  const [filtering, setFiltering] = useState(false);

  const haystacks = useMemo(
    () =>
      new Map(
        practices.map((practice) => [
          practice.slug,
          [practice.number, practice.category, practice.cardTitle, practice.cardSummary, ...practice.services]
            .join(' ')
            .toLowerCase(),
        ]),
      ),
    [practices],
  );

  const isVisible = (practice: Practice) => {
    const matchesFilter = activeFilter === 'all' || practice.filter === activeFilter;
    const search = query.trim().toLowerCase();
    const matchesQuery = !search || (haystacks.get(practice.slug) ?? '').includes(search);
    return matchesFilter && matchesQuery;
  };

  return (
    <>
      <div className="practice-tools" data-reveal>
        <div className="search-field">
          <label className="eyebrow" htmlFor="practice-search">
            Search practices
          </label>
          <input
            id="practice-search"
            type="search"
            placeholder="Search by practice or service"
            value={query}
            onChange={(event) => {
              setFiltering(true);
              setQuery(event.target.value);
            }}
          />
        </div>
        <div className="filters" aria-label="Filter practices">
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
      </div>
      <div className="practice-grid practice-grid--visual" data-reveal="stagger">
        {practices.map((practice) => {
          const visible = isVisible(practice);
          return (
            <Link
              key={practice.slug}
              className={[
                'practice-card',
                practice.featured ? 'practice-card--feature' : '',
                visible ? (filtering ? 'filter-enter' : '') : 'hidden',
              ]
                .filter(Boolean)
                .join(' ')}
              href={`/practice/${practice.slug}`}
            >
              <Image
                src={practice.image.src}
                alt={practice.image.alt}
                width={practice.image.width}
                height={practice.image.height}
                sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
              <span className="practice-card-shade"></span>
              <span className="num">
                {practice.featured ? `${practice.number} / ${practice.category}` : practice.number}
              </span>
              <div>
                <h3>{practice.cardTitle}</h3>
                <p>{practice.cardSummary}</p>
                <span className="text-link">
                  Enter practice <span>→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
