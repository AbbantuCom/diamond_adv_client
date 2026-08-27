'use client';

import { setConsent, useConsent, useHydrated } from '@/lib/consent';

const labels = {
  accepted: 'Accepted. Embedded content loads automatically.',
  rejected: 'Rejected. Embedded content stays off until you ask for it.',
} as const;

/** Lets a visitor see and change the choice they made in the banner. */
export function CookiePreferences() {
  const consent = useConsent();
  const hydrated = useHydrated();

  return (
    <div className="cookie-preferences" id="preferences">
      <p className="eyebrow">Your choice</p>
      <p className="cookie-status">
        {!hydrated
          ? 'Checking your saved choice…'
          : consent
            ? labels[consent]
            : 'You have not chosen yet. Embedded content stays off until you do.'}
      </p>
      <div className="button-row">
        <button
          className="btn btn--navy"
          aria-pressed={consent === 'accepted'}
          onClick={() => setConsent('accepted')}
        >
          Accept cookies
        </button>
        <button
          className="btn btn--navy"
          aria-pressed={consent === 'rejected'}
          onClick={() => setConsent('rejected')}
        >
          Reject cookies
        </button>
      </div>
      {hydrated && consent ? (
        <button className="consent-gate-always" onClick={() => setConsent(null)}>
          Clear my choice
        </button>
      ) : null}
    </div>
  );
}
