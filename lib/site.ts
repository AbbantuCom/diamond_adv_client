import { getSite } from './content-api';
import type { NavLink, SiteSettings } from './content-types';

export type { NavLink, SiteSettings };

/** Firm identity — name, contact details, logos — from the admin API. */
export { getSite };

/** The header's main navigation, in the order set in Site Settings. */
export async function getPrimaryNav(): Promise<NavLink[]> {
  return (await getSite()).primaryNav;
}

/** The host used in the appointment form's "sent from" line. */
export function siteHost(site: SiteSettings): string {
  try {
    return new URL(site.url).host;
  } catch {
    // A malformed URL in the CMS should not take a page down over a footer line.
    return site.url.replace(/^https?:\/\//, '').replace(/\/+$/, '');
  }
}
