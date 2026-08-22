# Diamond Advocates

The Diamond Advocates website as a Next.js 16 App Router application in TypeScript, ready to deploy
on Vercel. It is a conversion of the original static HTML site (kept in [legacy/](legacy/) for
reference) with the design, layout, copy and motion preserved.

**Its content comes from the Diamond Advocates admin API** — the separate
`diamond_advocates_admin_api` repo, where the firm edits the site. See
[Where the content comes from](#where-the-content-comes-from).

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — see below
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npm run typecheck
```

The site runs with **no environment variables at all**: without them it renders
the content in [lib/fallback.ts](lib/fallback.ts). Point it at a running admin
API to make it live:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_CONTENT_API_URL` | Base URL of the admin API, e.g. `http://localhost:3001`. Unset → fallback content. |
| `REVALIDATE_SECRET` | Must match the admin repo. Authenticates the publish webhook at `/api/revalidate`. |
| `PREVIEW_SECRET` | Must match the admin repo. Verifies preview links and authenticates draft reads. |

Run the admin API on port 3001 (`npm run dev -- -p 3001` in that repo) so the two
sit side by side locally.

## Deploying to Vercel

Vercel auto-detects Next.js: import the repository and deploy. Set the three
variables above in **Project → Settings → Environment Variables**, and set the
production domain in the admin panel under **Site Settings → Public Site URL**,
so canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt` point at the
live host.

In the admin repo, set `CLIENT_URL` to this deployment and add its origin to
`CLIENT_ORIGIN`, or publishing will not clear this site's cache and the browser
will block the contact form.

## Where the content comes from

Every page reads its content through [lib/content-api.ts](lib/content-api.ts),
which fetches the published copy of a section from the admin API. Three rules
hold for every read:

1. **It never throws.** A section that cannot be fetched — API down, variable
   unset, section never published — falls back to [lib/fallback.ts](lib/fallback.ts),
   so the firm's real content renders either way. Failures are warned to the
   server console, never to the visitor.
2. **It is cached under the section's name.** Publishing in the admin panel POSTs
   to [/api/revalidate](app/api/revalidate/route.ts), which drops exactly that
   tag, so the change is live on the next request. An hourly revalidate is the
   backstop for a webhook that never arrived.
3. **Draft mode reads drafts.** [/api/preview](app/api/preview/route.ts) verifies
   the admin's signed, 15-minute link before enabling Next's draft mode; draft
   content is then fetched uncached and a navy and gold bar marks the session. Other
   visitors keep seeing the published site throughout.

| File | Role |
| --- | --- |
| [lib/content-types.ts](lib/content-types.ts) | The shape of every section. A verbatim copy of the content half of the admin repo's `types/index.ts` — the two are one contract. |
| [lib/fallback.ts](lib/fallback.ts) | Build-time fallback content. A verbatim copy of the admin repo's `lib/seed-data.ts`, which is what seeds its database. |
| [lib/content-api.ts](lib/content-api.ts) | The fetch layer and the per-section readers. |
| `lib/site.ts`, `lib/practices.ts`, `lib/team.ts`, `lib/insights.ts`, `lib/blogs.ts` | Thin async accessors and helpers over those readers. |

**Changing a content shape means changing it in both repos.** `content-types.ts`
and `fallback.ts` here mirror `types/index.ts` and `lib/seed-data.ts` there; if
they drift, the site silently falls back instead of rendering what the CMS holds.

## Structure

| Path | Contents |
| --- | --- |
| `app/` | Routes, metadata and page composition |
| `components/` | Header, footer and the interactive pieces (`'use client'`) |
| `lib/` | The content layer: API readers, shared types and fallback content |
| `styles/` | `styles.css` and `responsive.css`, carried over from the original build |
| `public/images/` | Brand, hero, practice and portrait images |
| `legacy/` | The original static site, kept for reference |
| `content/` | Source copy documents supplied by the client |
| `scripts/` | One-off asset tooling, not part of the build |

The browser and home-screen icons (`app/favicon.ico`, `app/icon.png`,
`app/apple-icon.png`) are the DA monogram in white on brand navy. They are committed, and
`python3 scripts/make-icons.py` regenerates all three from `public/images/logo-diamond-advocates.png`
if the logo ever changes.

### Routes

| Route | Original page |
| --- | --- |
| `/` | `index.html` |
| `/practice-areas` | `practice-areas.html` |
| `/practice/[slug]` | `practice-detail.html?practice=…` |
| `/team` | `team.html` |
| `/team/[slug]` | `team-profile.html?person=…` |
| `/insights` | `insights.html` |
| `/insights/[slug]` | `article.html` |
| `/blogs` | new: the Diamond Brief Series |
| `/blogs/[slug]` | new: one brief, with PDF reader |
| `/contact` | `contact.html` |
| `/cookie-policy` | new: cookie policy and consent controls |
| `/privacy-policy` | new: privacy policy |

Every page is statically prerendered at build time. The old `.html` URLs (including their query
strings) are 301-redirected to the new routes in [next.config.ts](next.config.ts), so existing
inbound links keep working.

## How the conversion maps over

- **Content is data.** Practices, lawyer profiles and insights moved out of inline page scripts into
  typed content the server fetches from the admin API, so each page renders on the server instead of
  assembling itself in the browser. Adding a practice or a lawyer is now something the firm does in
  the admin panel, with no code change.
- **Styling is unchanged.** Both original stylesheets are imported by the root layout and are still
  the single source of truth for the design. The only edit is `height: auto` on the base `img` rule,
  which keeps the intrinsic aspect ratio now that `next/image` emits `width`/`height` attributes.
- **Motion is preserved.** Reveal-on-scroll, parallax, pointer tilt and Lenis smooth scrolling run
  from `components/scroll-effects.tsx` and `components/smooth-scroll.tsx`, driven by the same
  `data-reveal` / `data-parallax` / `data-tilt` attributes the markup already used. All of it honours
  `prefers-reduced-motion`.
- **Interactive UI is React.** The practice dropdown, mobile menu, practice/team/insight filters,
  section navigation, reading progress and back-to-top are client components; everything else is a
  server component.
- **Images go through `next/image`,** so they are resized and served as AVIF/WebP instead of the
  original multi-megabyte PNGs. File names were normalised (`images/Practices/energy  law.png` →
  `public/images/practices/energy-law.png`).

## Blogs

`/blogs` lists every Diamond Brief; `/blogs/[slug]` gives one brief its summary, a scrollable PDF
reader, a download, related briefs and a booking link. Briefs are managed in the admin panel under
**Blogs**, newest first.

Each brief points at its PDF through one of two sources, and `blogPreviewUrl` / `blogDownloadUrl`
pick the right URLs for whichever is set:

- **An uploaded PDF** — attached in the admin panel and stored in Cloudflare R2. **Preferred.** It
  reads in the browser's own PDF viewer, downloads in place, loads faster and involves no third
  party, so no consent gate is needed.
- **A Google Drive file id** — used when there is no uploaded copy. The file must be shared as
  **"Anyone with the link"**, or visitors get a Google sign-in screen instead of the brief. All six
  current briefs use this.

To move a brief off Google Drive, upload its PDF in the admin panel; the reader, the download button
and the fallback link all follow automatically. A brief with neither source still renders its
summary — the reader and download controls are simply left out rather than pointing nowhere.

Cover images currently reuse the practice-area photography, chosen per topic. Replace the cover on
any brief in the admin panel when real artwork is available.

## Cookies and consent

The site sets no analytics or advertising cookies of its own. The only third parties involved are
the Google Maps embed on the contact page and the Google Drive PDF reader on each brief, and both
are wrapped in [`ConsentGate`](components/consent-gate.tsx): until the visitor accepts, the iframe is
never rendered, so **no request reaches Google at all**. The placeholder offers to load that one
embed, or to open the map or PDF directly in a new tab.

- The banner ([components/cookie-banner.tsx](components/cookie-banner.tsx)) appears until a choice is
  made, and the choice is stored under `da-cookie-consent` in local storage, never sent anywhere.
- [/cookie-policy](app/cookie-policy/page.tsx) explains what is set and repeats the accept/reject
  controls, including clearing the choice so the banner returns.
- [lib/consent.ts](lib/consent.ts) is the shared store. `useHydrated()` keeps consent-dependent UI
  out of server-rendered markup, so a returning visitor never sees the banner flash.

If you add another third party later (analytics, a chat widget, embedded video), wrap it in
`ConsentGate` too and add a line to the policy page, or the reject button stops telling the truth.

## Privacy policy

[/privacy-policy](app/privacy-policy/page.tsx) describes what the site actually does: no analytics
or tracking, an appointment form that sends enquiries to the firm's own admin API, the consent
choice in local storage, and technical request data held by the host. It is written against Uganda's
Data Protection and Privacy Act, 2019.

**It is a draft for the firm to review and approve before launch.** Two dashed
`.content-placeholder` blocks mark the facts only the firm can supply — response times, who handles
data protection requests, whether the firm is registered with the Personal Data Protection Office,
and real retention periods. Update `lastUpdated` in the page whenever the text changes.

Keep the policy true as the site grows: adding a form endpoint, analytics or any new third party
changes what this page has to say.

## The appointment form

The form in [components/appointment-form.tsx](components/appointment-form.tsx) validates in the
browser, then **posts the enquiry to the admin API's `/api/contact`**, where it appears in the
firm's **Messages** inbox with an unread badge. Its "area of interest" options are the topic list
edited in the admin panel under **Contact**.

If that request fails — the API is down, the visitor is offline, or
`NEXT_PUBLIC_CONTENT_API_URL` is unset — the form falls back to the site's original behaviour and
opens the visitor's own email application with the enquiry pre-composed and addressed to the firm,
so a submission is never silently lost:

```
To:      info@diamondadvocates.com
Subject: Appointment request from <name>
Body:    Name / Email / Phone / Area of interest, the details, then the sending domain
```

> **This is a change in behaviour, and the privacy notice was updated to match.**
> Enquiries now reach the firm's own systems and are stored there, so
> [/privacy-policy](app/privacy-policy/page.tsx) says what is collected, where it goes and why. If
> that flow changes again, that page has to change with it.

The form has **no spam protection**. Nothing rate-limits `POST /api/contact` and there is no
CAPTCHA, so a public deployment can have junk written straight into the Messages inbox. Worth adding
before or soon after launch.

## Known gaps carried over from the original

These were placeholders in the static site. Most are now **editable in the admin panel** rather than
in code, but they still need real content from the firm:

| Gap | Where to fix it |
| --- | --- |
| Insights beyond the E-Discovery brief | Admin → **Insights** |
| The downloadable Diamond Brief document | Admin → **Blogs**, upload the PDF |
| Business hours | Admin → **Contact** (seeded with a placeholder — confirm it) |
| The office map embed | Admin → **Contact**, paste a Google Maps embed URL |
| Social media links | Admin → **Contact** (all four are blank, so no icons render) |
| The Legal Disclaimer page | Still a code change: add the route, then link it in Admin → **Footer** |
