'use client';

import { useSyncExternalStore } from 'react';

export type Consent = 'accepted' | 'rejected';

const STORAGE_KEY = 'da-cookie-consent';
const CHANGE_EVENT = 'da-cookie-consent-change';

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  // Keep other tabs in step.
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

function getSnapshot(): Consent | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'accepted' || stored === 'rejected' ? stored : null;
  } catch {
    // Private browsing modes can throw on access; treat as "no choice yet".
    return null;
  }
}

/** Nothing is known about the visitor's choice until the client takes over. */
function getServerSnapshot(): Consent | null {
  return null;
}

/** `null` means the visitor has not chosen yet. */
export function useConsent(): Consent | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * False during server render and the first client render, true afterwards, so
 * consent-dependent UI never renders into markup that has not read storage yet.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function setConsent(value: Consent | null) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, value);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable: the choice simply will not persist.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
