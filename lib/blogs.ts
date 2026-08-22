import { getBlogs } from './content-api';
import type { BlogItem, BlogPdf } from './content-types';

/** Kept as the name the components already use for one brief. */
export type Blog = BlogItem;
export type { BlogPdf };

export { getBlogs };

/** Whether a brief has a PDF at all — without one there is nothing to read. */
export function hasPdf(pdf: BlogPdf): boolean {
  return Boolean(pdf.url || pdf.driveId);
}

/**
 * Scrollable reader: the browser's own PDF viewer for an uploaded file, Google's
 * viewer for one that only exists on Drive. Returns null when neither is set, so
 * callers render the summary without a dead reader frame.
 */
export function blogPreviewUrl(pdf: BlogPdf): string | null {
  if (pdf.url) return `${pdf.url}#view=FitH`;
  if (pdf.driveId) return `https://drive.google.com/file/d/${pdf.driveId}/preview`;
  return null;
}

/** Direct download of the original PDF, or null when there is no file. */
export function blogDownloadUrl(pdf: BlogPdf): string | null {
  if (pdf.url) return pdf.url;
  if (pdf.driveId) return `https://drive.google.com/uc?export=download&id=${pdf.driveId}`;
  return null;
}

/** Uploaded files download in place; Drive files have to open in a new tab. */
export function isLocalPdf(pdf: BlogPdf): boolean {
  return Boolean(pdf.url);
}

export async function getBlog(slug: string): Promise<Blog | undefined> {
  return (await getBlogs()).find((blog) => blog.slug === slug);
}

/** The briefs that follow `slug` in publication order, wrapping at the end. */
export async function getRelatedBlogs(slug: string, count = 3): Promise<Blog[]> {
  const blogs = await getBlogs();
  const index = blogs.findIndex((blog) => blog.slug === slug);
  if (index < 0) return blogs.slice(0, count);
  return Array.from({ length: Math.min(count, blogs.length - 1) }, (_, offset) => {
    return blogs[(index + offset + 1) % blogs.length];
  });
}
