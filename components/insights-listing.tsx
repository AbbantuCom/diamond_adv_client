'use client';

import Link from 'next/link';
import { useState } from 'react';

import { insightFilters, type InsightItem as Insight } from '@/lib/content-types';

type InsightsListingProps = {
  insights: Insight[];
};

/** Searchable, filterable list of insights and Diamond Briefs. */
export function InsightsListing({ insights }: InsightsListingProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [query, setQuery] = useState('');
  // The re-entry animation should only run once the visitor starts filtering.
  const [filtering, setFiltering] = useState(false);

  const isVisible = (insight: Insight) => {
    const matchesFilter = activeFilter === 'all' || insight.category === activeFilter;
    const search = query.trim().toLowerCase();
    const haystack = [insight.meta, insight.title, insight.excerpt ?? ''].join(' ').toLowerCase();
    return matchesFilter && (!search || haystack.includes(search));
  };

  return (
    <>
      <div className="search-field">
        <label className="eyebrow" htmlFor="insight-search">
          Search insights
        </label>
        <input
          id="insight-search"
          type="search"
          placeholder="Search by title or topic"
          value={query}
          onChange={(event) => {
            setFiltering(true);
            setQuery(event.target.value);
          }}
        />
      </div>
      <div className="filters">
        {insightFilters.map((filter) => (
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
      <div className="article-listing">
        {insights.map((insight) => {
          const visible = isVisible(insight);
          const className = [
            'insight-card',
            visible ? (filtering ? 'filter-enter' : '') : 'hidden',
          ]
            .filter(Boolean)
            .join(' ');
          const body = (
            <>
              <span className="article-meta">{insight.meta}</span>
              <div>
                <h3>{insight.title}</h3>
                {insight.article ? (
                  <span className="text-link">
                    Read article <span>→</span>
                  </span>
                ) : (
                  <p>{insight.excerpt}</p>
                )}
              </div>
            </>
          );

          return insight.article ? (
            <Link key={insight.slug} className={className} href={`/insights/${insight.slug}`}>
              {body}
            </Link>
          ) : (
            <article key={insight.slug} className={className}>
              {body}
            </article>
          );
        })}
      </div>
    </>
  );
}
