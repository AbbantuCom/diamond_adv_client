import { draftMode } from 'next/headers';

import {
  fallbackAbout,
  fallbackBlogs,
  fallbackContact,
  fallbackFooter,
  fallbackHero,
  fallbackInsights,
  fallbackPractices,
  fallbackSite,
  fallbackTeam,
} from './fallback';
import type {
  AboutContent,
  BlogItem,
  ContactContent,
  FooterContent,
  HeroContent,
  InsightItem,
  PracticeItem,
  SiteSettings,
  TeamMember,
} from './content-types';

/**
 * Reads published content from the Diamond Advocates admin API.
 *
 * Three rules hold for every read:
 *
 *   1. **It never throws.** A section that cannot be fetched falls back to the
 *      copy in `lib/fallback.ts`, so an API outage, a missing environment
 *      variable or a never-published section shows the firm's real content rather
 *      than an empty page. Failures are warned to the server console.
 *   2. **It is cached under the section's name.** Publishing a section in the
 *      admin panel POSTs to `/api/revalidate` here, which drops exactly that tag.
 *      The hourly revalidate is the backstop for a revalidate call that never
 *      arrived.
 *   3. **Draft mode reads drafts.** Inside a preview session the draft copy is
 *      fetched uncached, authenticated with the shared PREVIEW_SECRET. That
 *      secret is server-only and never reaches the browser.
 */

const REVALIDATE_SECONDS = 3600;

/** Public base URL of the admin API, without a trailing slash. */
function apiBase(): string | null {
  const url = process.env.NEXT_PUBLIC_CONTENT_API_URL;
  return url ? url.replace(/\/+$/, '') : null;
}

/**
 * Whether this request is inside a preview session.
 *
 * `draftMode()` throws when called outside a request scope, which is exactly what
 * happens while a static page is being prerendered at build time — that is not a
 * preview, so treat it as one.
 */
async function isPreview(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}

async function getSection<T>(section: string, fallback: T): Promise<T> {
  const base = apiBase();
  if (!base) return fallback;

  const preview = await isPreview();
  const previewSecret = process.env.PREVIEW_SECRET;

  try {
    const url = preview
      ? `${base}/api/content/${section}?state=draft`
      : `${base}/api/content/${section}`;

    const res = await fetch(url, {
      headers: preview && previewSecret ? { 'x-preview-secret': previewSecret } : {},
      // Drafts change with every save, so they are never cached. Published content
      // is cached under its section name until a publish revalidates that tag.
      ...(preview
        ? { cache: 'no-store' as const }
        : { next: { tags: [section], revalidate: REVALIDATE_SECONDS } }),
    });

    if (!res.ok) {
      console.warn(`Content API returned ${res.status} for "${section}" — using fallback content.`);
      return fallback;
    }

    const json = await res.json();
    // `data` is null for a section that exists but has never been published.
    return (json?.data as T | null) ?? fallback;
  } catch (err) {
    console.warn(`Content API request for "${section}" failed — using fallback content.`, err);
    return fallback;
  }
}

// ─── Section readers ─────────────────────────────────────────────────────────

export const getSite     = () => getSection<SiteSettings>('site', fallbackSite);
export const getHero     = () => getSection<HeroContent>('hero', fallbackHero);
export const getAbout    = () => getSection<AboutContent>('about', fallbackAbout);
export const getContact  = () => getSection<ContactContent>('contact', fallbackContact);
export const getFooter   = () => getSection<FooterContent>('footer', fallbackFooter);

/** Ordered by the `order` the admin panel's drag arrows write. */
function ordered<T extends { order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

export async function getPractices(): Promise<PracticeItem[]> {
  return ordered(await getSection<PracticeItem[]>('practices', fallbackPractices));
}

export async function getTeam(): Promise<TeamMember[]> {
  return ordered(await getSection<TeamMember[]>('team', fallbackTeam));
}

export async function getInsights(): Promise<InsightItem[]> {
  return ordered(await getSection<InsightItem[]>('insights', fallbackInsights));
}

export async function getBlogs(): Promise<BlogItem[]> {
  return ordered(await getSection<BlogItem[]>('blogs', fallbackBlogs));
}
