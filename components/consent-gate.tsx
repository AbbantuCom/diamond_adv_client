'use client';

import { useState } from 'react';

import { setConsent, useConsent, useHydrated } from '@/lib/consent';

type ConsentGateProps = {
  /** What is being loaded, e.g. "the office map". */
  label: string;
  /** Who receives the request once it loads. */
  provider: string;
  /** Escape hatch that works without loading the embed at all. */
  fallback?: { href: string; label: string };
  /** Set when the content turns out to be first-party and needs no consent. */
  skip?: boolean;
  children: React.ReactNode;
};

/**
 * Holds a third-party embed back until the visitor has accepted cookies, or asks
 * for this one embed. Until then nothing is requested from the provider.
 */
export function ConsentGate({ label, provider, fallback, skip, children }: ConsentGateProps) {
  const consent = useConsent();
  const hydrated = useHydrated();
  const [allowedOnce, setAllowedOnce] = useState(false);

  if (skip) return <>{children}</>;
  if (hydrated && (consent === 'accepted' || allowedOnce)) return <>{children}</>;

  return (
    <div className="consent-gate">
      <div>
        <p className="eyebrow">Content held back</p>
        <p className="consent-gate-copy">
          Loading {label} sets cookies from {provider}. Nothing has been requested from them yet.
        </p>
        <div className="button-row">
          <button className="btn btn--gold" onClick={() => setAllowedOnce(true)}>
            Load {label}
          </button>
          {fallback ? (
            <a
              className="btn btn--outline"
              href={fallback.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {fallback.label}
            </a>
          ) : null}
        </div>
        <button className="consent-gate-always" onClick={() => setConsent('accepted')}>
          Always allow embedded content
        </button>
      </div>
    </div>
  );
}
