/**
 * The shape of every content section served by the Diamond Advocates admin API.
 *
 * A verbatim copy of the content half of `types/index.ts` in the
 * `diamond_advocates_admin_api` repo — the two are one contract, and a change on
 * one side is a change on the other. The user/auth types are deliberately not
 * copied: nothing here renders them.
 */

// ─── Shared content primitives ───────────────────────────────────────────────

/**
 * An image together with the intrinsic size next/image needs on the public site.
 *
 * The width/height travel with the URL because the client renders every content
 * image through next/image, which refuses to lay out without them. Uploads through
 * the media library fill these in automatically; pasted URLs need them typed.
 */
export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface NavLink {
  label: string;
  href: string;
}

// ─── Site settings ───────────────────────────────────────────────────────────

/**
 * Firm-wide identity: the values that appear in the header, the footer, contact
 * blocks, page metadata and the LegalService structured data on the home page.
 */
export interface SiteSettings {
  name: string;
  tagline: string;
  description: string;
  url: string;
  phone: string;
  phoneHref: string;
  email: string;
  addressStreet: string;
  addressLocality: string;
  addressCountry: string;
  addressFull: string;
  logo: string;
  partnerLogo: string;
  primaryNav: NavLink[];
}

// ─── Hero ────────────────────────────────────────────────────────────────────

/**
 * One frame of the home hero's rotating background. `word` is the practice name
 * shown in the kicker while that slide is active.
 */
export interface HeroSlide {
  id: string;
  src: string;
  word: string;
  width: number;
  height: number;
  order: number;
}

export interface HeroCta {
  id: string;
  text: string;
  href: string;
  /** `gold` renders the filled accent button; `outline` the bordered one. */
  style: 'gold' | 'outline';
  order: number;
}

export interface HeroContent {
  /** Rendered as `{titlePrefix} <em>{titleHighlight}</em> {titleSuffix}`. */
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  tagline: string;
  slides: HeroSlide[];
  ctas: HeroCta[];
  scrollCue: string;
}

// ─── About / home page copy ──────────────────────────────────────────────────

/**
 * Every editable heading and paragraph on the home page below the hero. The
 * practice, team and insight *lists* on that page come from their own sections —
 * this is the framing copy around them.
 */
export interface AboutContent {
  eyebrow: string;
  statement: string;
  statementHighlight: string;
  lead: string;
  paragraph: string;
  ctaText: string;
  ctaHref: string;

  recognitionEyebrow: string;
  recognitionTitle: string;

  practicesEyebrow: string;
  practicesTitle: string;
  /** Slugs of the practices listed on the home page, in display order. */
  practiceSlugs: string[];
  morePracticesTitle: string;
  morePracticesNumber: string;
  morePracticesSummary: string;

  /** The two "frontier practice" panels — slug plus the code shown on the card. */
  frontierPractices: FrontierPractice[];

  teamEyebrow: string;
  teamTitle: string;

  insightsEyebrow: string;
  insightsTitle: string;

  ctaEyebrow: string;
  ctaTitle: string;
  ctaLead: string;
}

export interface FrontierPractice {
  id: string;
  slug: string;
  code: string;
  eyebrow: string;
  order: number;
}

// ─── Practices ───────────────────────────────────────────────────────────────

export type PracticeFilter = 'digital' | 'business' | 'property' | 'projects';

/** The lawyer credited at the head of a practice, linked to their team profile. */
export interface PracticeLead {
  name: string;
  role: string;
  slug: string;
  image: string;
}

export interface PracticeItem {
  id: string;
  /** URL segment: /practice/{slug}. Changing it breaks existing links. */
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  /** Label used in the header dropdown, where `shortTitle` reads too tersely. */
  navLabel: string;
  category: string;
  filter: PracticeFilter;
  image: ImageAsset;
  intro: string;
  /** Short copy used in the home page practice list. */
  summary: string;
  /** Heading shown on the practice atlas card. */
  cardTitle: string;
  /** Short copy shown on the practice atlas card. */
  cardSummary: string;
  approach: string;
  services: string[];
  /** Empty `name` means no lead is credited for this practice. */
  lead: PracticeLead;
  /** Featured practices get the larger card in the atlas grid. */
  featured: boolean;
  order: number;
}

// ─── Team ────────────────────────────────────────────────────────────────────

export type TeamCategory = 'leadership' | 'associate';

export interface TeamMember {
  id: string;
  /** URL segment: /team/{slug}. */
  slug: string;
  name: string;
  role: string;
  image: string;
  category: TeamCategory;
  /** One string per paragraph of the profile. */
  bio: string[];
  /** Shown in the four-person row on the home page. */
  featured: boolean;
  order: number;
}

// ─── Insights ────────────────────────────────────────────────────────────────

export type InsightCategory = 'diamond-brief' | 'newsletters' | 'press';

export interface InsightArticle {
  headline: string;
  metaLine: string;
  /** ISO date (YYYY-MM-DD), used for the article's structured data. */
  datePublished: string;
  standfirst: string;
  intro: string[];
  takeawaysTitle: string;
  takeaways: string[];
  closing: string[];
  note: string;
}

export interface InsightItem {
  id: string;
  /** URL segment: /insights/{slug}. Only reachable when `hasArticle` is true. */
  slug: string;
  category: InsightCategory;
  /** Meta line shown above the card title. */
  meta: string;
  title: string;
  /** Body copy for placeholder cards that do not link to an article. */
  excerpt: string;
  /** False renders a non-linking placeholder card and no article page. */
  hasArticle: boolean;
  article: InsightArticle;
  order: number;
}

// ─── Blogs (Diamond Brief PDFs) ──────────────────────────────────────────────

/**
 * Where a brief's PDF lives. `url` wins when set: it reads in the browser's own
 * PDF viewer and downloads directly, with no third party involved. `driveId` is
 * the fallback for briefs that only exist on Google Drive, which must be shared
 * as "anyone with the link" or visitors hit a sign-in screen.
 */
export interface BlogPdf {
  /** File name as supplied by the firm, shown next to the download button. */
  fileName: string;
  url: string;
  driveId: string;
}

export interface BlogItem {
  id: string;
  /** URL segment: /blogs/{slug}. */
  slug: string;
  title: string;
  /** Series line shown above the title, e.g. "Diamond Brief Series · Vol.1 Issue 3". */
  series: string;
  authors: string[];
  /** Lead paragraphs of the summary. */
  description: string[];
  /** Optional bulleted section inside the summary — empty `items` hides it. */
  highlightsTitle: string;
  highlights: string[];
  /** Optional closing paragraphs after the bullets. */
  closing: string[];
  pdf: BlogPdf;
  image: ImageAsset;
  order: number;
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface ContactSocials {
  linkedin: string;
  twitter: string;
  youtube: string;
  facebook: string;
}

export interface ContactContent {
  heroEyebrow: string;
  heroTitle: string;
  eyebrow: string;
  title: string;
  lead: string;
  email: string;
  phone: string;
  phoneHref: string;
  address: string;
  officeHours: string;
  mapEmbedUrl: string;
  socials: ContactSocials;
  /** Options offered in the enquiry form's "area of interest" field. */
  topics: string[];
}

export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  contacted: boolean;
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface FooterContent {
  description: string;
  copyrightName: string;
  exploreTitle: string;
  exploreLinks: NavLink[];
  practicesTitle: string;
  practiceLinks: NavLink[];
  contactTitle: string;
  legalLinks: NavLink[];
  legalNote: string;
  /**
   * Whether the trailing note is shown. Optional because content saved before
   * the switch existed has no such key — and absent reads as off, which is the
   * safe direction: a note stays hidden until someone deliberately turns it on.
   */
  legalNoteEnabled?: boolean;
}

// ─── Envelope ────────────────────────────────────────────────────────────────

export interface SiteContent {
  section: string;
  data:
    | SiteSettings
    | HeroContent
    | AboutContent
    | PracticeItem[]
    | TeamMember[]
    | InsightItem[]
    | BlogItem[]
    | ContactContent
    | FooterContent;
  updatedAt: string;
  updatedBy: string;
}

// ─── Listing filters ─────────────────────────────────────────────────────────

/**
 * The filter buttons above the insights listing.
 *
 * Declared here rather than in `lib/insights.ts` because the listing is a client
 * component: anything it imports must stay clear of the server-only fetch layer,
 * and `lib/insights.ts` reaches `next/headers` through `lib/content-api.ts`.
 */
export const insightFilters = [
  { value: 'all', label: 'All' },
  { value: 'diamond-brief', label: 'Diamond Brief Series' },
  { value: 'newsletters', label: 'Newsletters' },
  { value: 'press', label: 'In the Press' },
] as const;
