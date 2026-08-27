import { draftMode } from 'next/headers';

/**
 * The marker shown while the site is rendering unpublished drafts.
 *
 * Preview mode is a per-browser cookie, so without this an editor can leave a
 * preview session open, forget, and mistake draft content for what visitors are
 * seeing. Styles are inline so the bar cannot be lost to a stylesheet change.
 */
export async function PreviewBar() {
  let enabled = false;
  try {
    enabled = (await draftMode()).isEnabled;
  } catch {
    // Outside a request scope (static prerender) there is no preview session.
    return null;
  }

  if (!enabled) return null;

  return (
    <div
      role="status"
      style={{
        position: 'fixed',
        insetInline: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '0.75rem 1rem',
        // The site's own navy and gold, matching the admin panel the editor
        // arrived from.
        background: '#061525',
        color: '#fcfbf8',
        borderTop: '2px solid #c8a45d',
        font: '500 0.85rem/1.2 system-ui, sans-serif',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.25)',
      }}
    >
      <span>Preview mode: showing unpublished draft content.</span>
      <a
        href="/api/preview/exit"
        style={{
          color: '#061525',
          background: '#c8a45d',
          border: '1px solid #c8a45d',
          fontWeight: 700,
          borderRadius: '999px',
          padding: '0.3rem 0.9rem',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Exit preview
      </a>
    </div>
  );
}
