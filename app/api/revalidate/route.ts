import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';

/**
 * Cache invalidation webhook, called by the admin API right after a section is
 * published there.
 *
 * The admin sends `{ secret, tag }`; `tag` is the section name, which is the same
 * tag `lib/content-api.ts` caches that section's fetch under. Dropping it makes
 * the next request re-fetch, so a publish is live within one request rather than
 * at the next hourly revalidation.
 */

/** Constant-time comparison, so a wrong secret cannot be found byte by byte. */
function secretMatches(candidate: unknown): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || typeof candidate !== 'string') return false;

  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(candidate, 'utf8');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { secret, tag } = (body ?? {}) as { secret?: unknown; tag?: unknown };

  if (!secretMatches(secret)) {
    return NextResponse.json({ error: 'Invalid secret.' }, { status: 401 });
  }
  if (typeof tag !== 'string' || !tag) {
    return NextResponse.json({ error: 'A "tag" is required.' }, { status: 400 });
  }

  // `max` expires the entry immediately rather than at the end of its own
  // lifetime, which is the point of a publish webhook — the next request for
  // this section must re-fetch.
  revalidateTag(tag, 'max');
  return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}
