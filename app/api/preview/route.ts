import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Preview entry point, opened by the admin panel's Preview screen.
 *
 * The link carries a token the admin minted with the shared PREVIEW_SECRET, which
 * binds one path to an expiry. Verifying it here does two things: it stops anyone
 * without the secret from switching this site into draft mode, and — because the
 * path is inside the signature rather than a free-standing query parameter — it
 * closes the open-redirect hole an unsigned `?path=` would leave.
 *
 * On success draft mode is enabled for this browser and it is redirected to the
 * signed path, where `lib/content-api.ts` serves unpublished drafts.
 */

interface TokenPayload {
  path: string;
  exp: number;
}

function equalStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Returns the signed path, or null if the token is absent, forged or expired. */
function verifyToken(token: string | null, secret: string): string | null {
  if (!token) return null;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  const expected = createHmac('sha256', secret).update(payload).digest('base64url');
  if (!equalStrings(expected, signature)) return null;

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as TokenPayload;
    if (typeof decoded.path !== 'string' || typeof decoded.exp !== 'number') return null;
    if (Date.now() > decoded.exp) return null;
    // Only ever redirect within this site, however well-signed the token is.
    if (!decoded.path.startsWith('/')) return null;
    return decoded.path;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Preview is not configured on this site.' }, { status: 501 });
  }

  const path = verifyToken(request.nextUrl.searchParams.get('token'), secret);
  if (!path) {
    return NextResponse.json({ error: 'Invalid or expired preview link.' }, { status: 401 });
  }

  (await draftMode()).enable();
  redirect(path);
}
