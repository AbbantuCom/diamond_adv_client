import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

/** Leaves preview mode and returns to the published site. */
export async function GET(request: NextRequest) {
  (await draftMode()).disable();

  // Only ever bounce back to a path on this site, never to a supplied origin.
  const to = request.nextUrl.searchParams.get('to');
  redirect(to && to.startsWith('/') ? to : '/');
}
