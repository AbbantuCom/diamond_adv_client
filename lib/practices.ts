import { getPractices } from './content-api';
import type { PracticeItem, PracticeLead } from './content-types';

/** Kept as the name the components already use for one practice. */
export type Practice = PracticeItem;
export type { PracticeLead };

export { getPractices };

export async function getPractice(slug: string): Promise<Practice | undefined> {
  return (await getPractices()).find((practice) => practice.slug === slug);
}

/** The practice that follows `slug` in the atlas order, wrapping at the end. */
export async function getNextPractice(slug: string): Promise<Practice | undefined> {
  const practices = await getPractices();
  if (practices.length === 0) return undefined;
  const index = practices.findIndex((practice) => practice.slug === slug);
  return practices[(index + 1) % practices.length];
}

/** Short labels used by the header dropdown and mobile menu, in practice order. */
export async function getPracticeNavLinks() {
  return (await getPractices()).map((practice) => ({
    slug: practice.slug,
    label: practice.navLabel || practice.shortTitle,
    href: `/practice/${practice.slug}`,
  }));
}

/** Whether a practice credits a lead — the name is what the page keys off. */
export function hasLead(practice: Practice): boolean {
  return Boolean(practice.lead?.name);
}
