'use client';

import Link from 'next/link';

import { setConsent, useConsent, useHydrated } from '@/lib/consent';

export function CookieBanner() {
  const consent = useConsent();
  const hydrated = useHydrated();

  if (!hydrated || consent) return null;
// 
  return (
    <aside className="cookie-banner" role="region" aria-label="Cookie notice">
      <div>
        <p className="eyebrow">Cookies</p>
        <p>
          We use cookies only when you load embedded content, such as the office map or a brief’s
          PDF reader. Reject and those stay switched off until you ask for them.{' '}
          <Link href="/cookie-policy">Read our cookie policy</Link>.
        </p>
      </div>
      <div className="cookie-banner-actions">
        <button className="btn btn--gold" onClick={() => setConsent('accepted')}>
          Accept
        </button>
        <button className="btn btn--outline" onClick={() => setConsent('rejected')}>
          Reject
        </button>
      </div>
    </aside>
  );
}
