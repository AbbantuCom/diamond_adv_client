import type {
  AboutContent,
  BlogItem,
  ContactContent,
  FooterContent,
  HeroContent,
  InsightItem,
  PracticeItem,
  PracticeLead,
  SiteSettings,
  TeamMember,
} from './content-types';

/**
 * The content this site falls back to.
 *
 * Used whenever the admin API cannot answer — it is unreachable, not configured
 * (no NEXT_PUBLIC_CONTENT_API_URL, as in a bare checkout), or has never published
 * the section being asked for. The page renders the firm's real content either
 * way, so a CMS outage is invisible to visitors rather than a blank section.
 *
 * This is a verbatim copy of `lib/seed-data.ts` in the admin repo, which is what
 * seeds the database. Change one, change the other.
 */

// ─── Site settings ───────────────────────────────────────────────────────────

export const fallbackSite: SiteSettings = {
  name: 'Diamond Advocates',
  tagline: 'Guided by global vision and grounded in strong legal foundations.',
  description:
    'Diamond Advocates is a sought after Ugandan law firm offering comprehensive legal services across a broad spectrum of practice areas.',
  url: 'https://diamondadvocates.com',
  phone: '0414 671 838',
  phoneHref: 'tel:+256414671838',
  email: 'info@diamondadvocates.com',
  addressStreet: 'Plot 1 Lourdel Road, 5th Floor Lourdel Towers, Nakasero',
  addressLocality: 'Kampala City',
  addressCountry: 'UG',
  addressFull: 'Plot 1 Lourdel Road, 5th Floor Lourdel Towers, Nakasero, Kampala City',
  logo: '/images/logo-diamond-advocates.png',
  partnerLogo: '/images/wone-global-partner.png',
  // The header's links, in order. The entry pointing at /practice-areas renders
  // as the practice dropdown rather than a plain link.
  primaryNav: [
    { label: 'Home', href: '/' },
    { label: 'Our Practice', href: '/practice-areas' },
    { label: 'Our Team', href: '/team' },
    { label: 'Insights', href: '/insights' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/contact' },
  ],
};

// ─── Hero ────────────────────────────────────────────────────────────────────

export const fallbackHero: HeroContent = {
  titlePrefix: 'Award Winning',
  titleHighlight: 'Tech Law',
  titleSuffix: 'Firm',
  tagline: 'Guided by global vision. Grounded in strong legal foundations.',
  scrollCue: 'Scroll',
  slides: [
    { id: 'slide-tech',        src: '/images/hero/tech.jpg',        word: 'Tech',        width: 1920, height: 2560, order: 1 },
    { id: 'slide-ai',          src: '/images/hero/ai.jpg',          word: 'AI',          width: 1920, height: 2880, order: 2 },
    { id: 'slide-tax',         src: '/images/hero/tax.jpg',         word: 'Tax',         width: 1920, height: 2880, order: 3 },
    { id: 'slide-real-estate', src: '/images/hero/real-estate.jpg', word: 'Real Estate', width: 1920, height: 2880, order: 4 },
    { id: 'slide-insurance',   src: '/images/hero/insurance.jpg',   word: 'Insurance',   width: 1920, height: 2876, order: 5 },
  ],
  ctas: [
    { id: 'cta-practice', text: 'Explore our practice', href: '/practice-areas', style: 'gold',    order: 1 },
    { id: 'cta-book',     text: 'Book appointment',     href: '/contact',        style: 'outline', order: 2 },
    { id: 'cta-team',     text: 'Meet our team',        href: '/team',           style: 'outline', order: 3 },
  ],
};

// ─── Home page copy ──────────────────────────────────────────────────────────

export const fallbackAbout: AboutContent = {
  eyebrow: 'Our blueprint',
  statement: 'The solutions of tomorrow,',
  statementHighlight: 'today.',
  lead:
    'Diamond Advocates is a sought after Ugandan law firm offering comprehensive legal services across a broad spectrum of practice areas.',
  paragraph:
    'We are a partner of WONE GLOBAL, a unified, international firm having an elite network of over 100 senior partners across more than 30 countries dealing in Law, Banking & Finance, Tax, Audit, Accounting, and Business Advisory.',
  ctaText: 'Discover our practice',
  ctaHref: '/practice-areas',

  recognitionEyebrow: 'Recognition',
  recognitionTitle:
    'We won a Digital Excellence Award in 2025 by the Uganda Law Society for being a market leader in legal tech practice!',

  practicesEyebrow: 'Our areas of practice',
  practicesTitle: 'Legal clarity across a changing world.',
  practiceSlugs: ['tech', 'ai', 'tax', 'real-estate'],
  morePracticesNumber: '05-09',
  morePracticesTitle: 'More practices',
  morePracticesSummary: 'Disputes, IP Law, Employment Law, Insurance and Energy Law.',

  frontierPractices: [
    { id: 'frontier-1', slug: 'tech', code: '01 / INNOVATE',     eyebrow: 'Frontier practice 01', order: 1 },
    { id: 'frontier-2', slug: 'ai',   code: '02 / INTELLIGENCE', eyebrow: 'Frontier practice 02', order: 2 },
  ],

  teamEyebrow: 'Our people',
  teamTitle: 'One team. Tailored, results-driven legal support.',

  insightsEyebrow: 'Insights',
  insightsTitle: 'Thinking for what comes next.',

  ctaEyebrow: 'Talk to our team',
  ctaTitle: 'Guided by global vision and grounded in strong legal foundations.',
  ctaLead: 'Tell us how we can support you.',
};

// ─── Practices ───────────────────────────────────────────────────────────────

const technologyLead: PracticeLead = {
  name: 'Galandi Tony Kiire',
  role: 'Head, Technology Law Practice',
  slug: 'galandi',
  image: '/images/team/galandi.png',
};

const noLead: PracticeLead = { name: '', role: '', slug: '', image: '' };

export const fallbackPractices: PracticeItem[] = [
  {
    id: 'practice-tech',
    slug: 'tech',
    number: '01',
    title: 'Technology Law',
    shortTitle: 'Tech Law',
    navLabel: 'Tech Law',
    category: 'Digital frontier',
    filter: 'digital',
    featured: true,
    image: {
      src: '/images/practices/tech-law.png',
      width: 2014,
      height: 1063,
      alt: 'Technology keyboard illuminated in red and blue',
    },
    intro:
      'Experienced legal advisers for the technologies, businesses and policy questions shaping what comes next.',
    summary:
      'We blend deep technological knowledge with market-leading legal insight to support every aspect of starting, growing and evolving businesses',
    cardTitle: 'Technology Law',
    cardSummary:
      'Helping progressive businesses navigate the laws, policy and regulation shaping technology.',
    approach:
      'Our award-winning Technology Law Practice team deploys experienced advisers spanning key digital fields to help businesses and organisations navigate the laws and regulations governing the most progressive technologies. We engage with industry groups and policymakers on key issues and maintain strong relationships with regulators and governments globally, helping businesses anticipate and influence evolving public policy and navigate the demanding issues where law and politics meet.',
    services: [
      'Product development and operations',
      'Commercial partnerships',
      'International expansion',
      'Regulatory compliance',
      'Investigations and enforcement',
      'Technology investments and M&A',
      'Capital raising and finance structures',
      'Arbitration and class actions',
    ],
    lead: technologyLead,
    order: 1,
  },
  {
    id: 'practice-ai',
    slug: 'ai',
    number: '02',
    title: 'AI Law',
    shortTitle: 'AI Law',
    navLabel: 'AI Law',
    category: 'Emerging intelligence',
    filter: 'digital',
    featured: true,
    image: {
      src: '/images/practices/ai-law.png',
      width: 1920,
      height: 1080,
      alt: 'Artificial intelligence processor on a circuit board',
    },
    intro:
      'Guiding organisations through the legal, regulatory and ethical questions created by artificial intelligence.',
    summary:
      'We help entities navigate the fast-evolving legal and regulatory frameworks governing Artificial Intelligence.',
    cardTitle: 'AI Law',
    cardSummary:
      'Legal, regulatory and ethical guidance where artificial intelligence meets society.',
    approach:
      'Our AI Law Practice brings together experienced advisers at the intersection of law, data and emerging technologies to help organisations navigate the fast-evolving legal and regulatory frameworks governing Artificial Intelligence. We are deeply engaged with global policymakers, regulators and industry leaders, ensuring clients anticipate regulatory shifts, influence the public policy agenda and stay ahead of the legal and ethical challenges where AI, law and society converge.',
    services: [
      'AI governance and regulatory compliance',
      'Data protection and privacy',
      'AI development, licensing and transactions',
      'Intellectual property and ownership',
      'Risk, bias and liability management',
      'M&A, investments and financing',
      'AI disputes, arbitration and litigation',
      'Policy and government engagement',
      'Sector-specific industry guidance',
      'Ethics, fairness and human rights',
    ],
    lead: technologyLead,
    order: 2,
  },
  {
    id: 'practice-tax',
    slug: 'tax',
    number: '03',
    title: 'Tax Law',
    shortTitle: 'Tax Law',
    navLabel: 'Tax Law',
    category: 'Business and finance',
    filter: 'business',
    featured: false,
    image: {
      src: '/images/practices/tax-law.png',
      width: 1024,
      height: 576,
      alt: 'Tax forms, calculator and laptop',
    },
    intro:
      'National and international tax guidance delivered with precision, foresight and commercial awareness.',
    summary:
      'We guide our clients through the complexities of national and international tax regimes with precision and foresight.',
    cardTitle: 'Tax Law',
    cardSummary: 'National and international tax guidance with precision and foresight.',
    approach:
      'Our Tax Law practice guides corporations, SMEs, investors and individuals through complex national and international tax regimes. We advise across corporate tax planning, VAT, customs and excise, transfer pricing and cross-border structuring. Our lawyers represent clients before tax authorities in audits, investigations and disputes, combining robust advocacy with practical solutions designed to resolve matters efficiently.',
    services: [
      'Corporate tax planning and advisory',
      'VAT, customs and excise',
      'Transfer pricing compliance and documentation',
      'Cross-border and international tax structuring',
      'Tax compliance reviews',
      'Audits, investigations and tax disputes',
      'Tax efficiency and risk management',
      'M&A and restructuring tax advice',
    ],
    lead: noLead,
    order: 3,
  },
  {
    id: 'practice-real-estate',
    slug: 'real-estate',
    number: '04',
    title: 'Real Estate Law',
    shortTitle: 'Real Estate',
    navLabel: 'Real Estate',
    category: 'Property and development',
    filter: 'property',
    featured: false,
    image: {
      src: '/images/practices/real-estate-law.png',
      width: 1024,
      height: 540,
      alt: 'Aerial view of developed property and surrounding landscape',
    },
    intro:
      'End-to-end legal support for property acquisition, development, investment and management.',
    summary:
      'Our Real Estate Law practice offers end-to-end legal services for all matters relating to property, land, and real estate development.',
    cardTitle: 'Real Estate',
    cardSummary: 'End-to-end support for property acquisition, development and investment.',
    approach:
      'Our Real Estate Law practice guides developers, investors and individuals on land development, construction agreements, property financing, mortgage documentation and compliance with zoning, planning and environmental regulations. By combining technical legal expertise with practical commercial insight, we help clients navigate complex transactions, mitigate risk and maximise the value of their real estate investments.',
    services: [
      'Property acquisitions and sales',
      'Leases and land transfers',
      'Due diligence and statutory compliance',
      'Property and mortgage financing',
      'Development and construction agreements',
      'Zoning, planning and environmental matters',
      'Property joint ventures',
      'Landlord, boundary and easement disputes',
    ],
    lead: noLead,
    order: 4,
  },
  {
    id: 'practice-disputes',
    slug: 'disputes',
    number: '05',
    title: 'Dispute Resolution',
    shortTitle: 'Disputes',
    navLabel: 'Disputes',
    category: 'Advocacy and resolution',
    filter: 'business',
    featured: false,
    image: {
      src: '/images/practices/disputes-law.png',
      width: 2014,
      height: 1063,
      alt: 'Advocate wearing formal court attire',
    },
    intro: 'Strategic, pragmatic representation in litigation and alternative dispute resolution.',
    summary: 'Strategic litigation and alternative dispute resolution across complex matters.',
    cardTitle: 'Disputes',
    cardSummary: 'Strategic litigation and alternative dispute resolution across complex matters.',
    approach:
      'We represent individuals, corporate entities and institutions in complex litigation across all levels of the courts and specialised tribunals. Beyond traditional litigation, our team has extensive experience in commercial arbitration, mediation and conciliation. Every strategy is tailored to the circumstances of the dispute to protect our clients’ interests and pursue efficient, cost-effective and favourable outcomes.',
    services: [
      'Commercial litigation',
      'Property and real estate disputes',
      'Corporate and shareholder disputes',
      'Contract and labour disputes',
      'Corporate tax disputes',
      'Technology and IP disputes',
      'Succession matters',
      'Debt recovery and enforcement',
      'Regulatory and administrative disputes',
      'Energy, infrastructure and construction disputes',
    ],
    lead: noLead,
    order: 5,
  },
  {
    id: 'practice-ip',
    slug: 'ip',
    number: '06',
    title: 'Intellectual Property Law',
    shortTitle: 'IP Law',
    navLabel: 'IP Law',
    category: 'Ideas and innovation',
    filter: 'digital',
    featured: false,
    image: {
      src: '/images/practices/ip-law.jpg',
      width: 1024,
      height: 559,
      alt: 'Patents, trademarks, copyrights and trade secrets illustration',
    },
    intro:
      'Protecting innovation, structuring intellectual property and turning ideas into commercial value.',
    summary: 'Protecting and commercialising the ideas that give businesses an advantage.',
    cardTitle: 'IP Law',
    cardSummary: 'Protecting and commercialising the ideas that give businesses an advantage.',
    approach:
      'Our team helps clients turn innovation into opportunity by safeguarding revenue, structuring intellectual property and driving commercial value. With technical insight and business acumen, we guide organisations through protecting and leveraging their ideas across industries and jurisdictions. Whether navigating high-stakes disputes or transformative transactions, clients trust us to build strategies that secure lasting advantage.',
    services: [
      'IP strategy and portfolio advisory',
      'Trademark and patent protection',
      'Copyright and creative rights',
      'Trade secret protection',
      'Licensing and commercialisation',
      'Technology transfer arrangements',
      'Cross-border portfolio support',
      'Enforcement and IP disputes',
    ],
    lead: noLead,
    order: 6,
  },
  {
    id: 'practice-employment',
    slug: 'employment',
    number: '07',
    title: 'Employment Law',
    shortTitle: 'Employment Law',
    navLabel: 'Employment Law',
    category: 'People and workplace',
    filter: 'business',
    featured: false,
    image: {
      src: '/images/practices/employment-law.png',
      width: 2048,
      height: 1152,
      alt: 'Employment contract and pen',
    },
    intro:
      'Practical, commercially viable and sustainable solutions for evolving workplace challenges.',
    summary: 'Practical workplace solutions built for fairness, productivity and compliance.',
    cardTitle: 'Employment Law',
    cardSummary: 'Practical workplace solutions built for fairness, productivity and compliance.',
    approach:
      'We take a proactive approach, helping employers anticipate and manage risk before it escalates while ensuring compliance with evolving labour laws and regulations. Our team combines technical legal expertise with an understanding of organisational dynamics, advising on policies, contracts and workplace practices that foster fairness, productivity and inclusion.',
    services: [
      'Employment contracts and HR policies',
      'Staff handbooks and workplace procedures',
      'Confidentiality and non-compete agreements',
      'Immigration and work permits',
      'Employee benefits, leave and pensions',
      'Health and safety compliance',
      'Dismissal, redundancy and discrimination claims',
      'Collective bargaining and trade unions',
      'Restructuring and severance',
      'Employment aspects of M&A',
    ],
    lead: noLead,
    order: 7,
  },
  {
    id: 'practice-insurance',
    slug: 'insurance',
    number: '08',
    title: 'Insurance Law',
    shortTitle: 'Insurance',
    navLabel: 'Insurance',
    category: 'Risk and regulation',
    filter: 'business',
    featured: false,
    image: {
      src: '/images/practices/insurance-law.png',
      width: 2048,
      height: 1152,
      alt: 'Insurance key on a computer keyboard',
    },
    intro: 'Strategic legal support across insurance, reinsurance, claims, products and regulation.',
    summary: 'Strategic support across insurance, reinsurance, claims and regulatory matters.',
    cardTitle: 'Insurance',
    cardSummary: 'Strategic support across insurance, reinsurance, claims and regulatory matters.',
    approach:
      'Our Insurance Law practice supports insurers, reinsurers, brokers and policyholders across the full spectrum of insurance and reinsurance matters. With deep industry knowledge, we combine technical legal analysis with practical commercial insight to help clients manage risk, resolve disputes efficiently and remain compliant as regulatory frameworks evolve.',
    services: [
      'Policy drafting and interpretation',
      'Regulatory compliance and licensing',
      'Claims management',
      'Coverage disputes and subrogation',
      'Insurance product structuring',
      'Risk-transfer arrangements',
      'Life, health and property claims',
      'Casualty and liability claims',
      'Litigation and arbitration',
      'Regulatory investigations and disputes',
    ],
    lead: noLead,
    order: 8,
  },
  {
    id: 'practice-energy',
    slug: 'energy',
    number: '09',
    title: 'Energy & Infrastructure Law',
    shortTitle: 'Energy & Infrastructure',
    navLabel: 'Energy Law',
    category: 'Projects and investment',
    filter: 'projects',
    featured: false,
    image: {
      src: '/images/practices/energy-law.png',
      width: 1024,
      height: 576,
      alt: 'Large energy and infrastructure facility',
    },
    intro: 'Legal support across the full lifecycle of major energy and infrastructure projects.',
    summary: 'Supporting major projects from structuring and finance through operation.',
    cardTitle: 'Energy & Infrastructure',
    cardSummary: 'Supporting major projects from structuring and finance through operation.',
    approach:
      'Our Energy & Infrastructure practice advises governments, developers, investors, financiers and operators on the development, financing and regulation of major projects across Africa and beyond. We work across oil and gas, renewable energy, power generation, transport, construction, telecommunications and utilities, supporting complex cross-border projects and stakeholder negotiations.',
    services: [
      'Project structuring, development and finance',
      'Public-private partnerships',
      'Power purchase and concession agreements',
      'Construction contracts',
      'Licensing and regulatory compliance',
      'Environmental approvals',
      'Cross-border projects and joint ventures',
      'Project M&A',
      'Negotiation, arbitration and litigation',
      'Renewable energy and climate finance',
    ],
    lead: noLead,
    order: 9,
  },
];

// ─── Team ────────────────────────────────────────────────────────────────────

export const fallbackTeam: TeamMember[] = [
  {
    id: 'member-galandi',
    slug: 'galandi',
    name: 'Galandi Tony Kiire',
    role: 'Managing Partner',
    image: '/images/team/galandi.png',
    category: 'leadership',
    featured: true,
    bio: [
      'Tony Kiire is the Founding and Managing Partner of Diamond Advocates, where he leads the Technology, Innovation, and Intellectual Property Law practice. He is also the founder of Lawtech Associates and Consult, the company behind the Legal AI Research Assistant and the Mtetezi App, which connects clients with legal professionals. A recognized legal tech and AI advisor, Tony has collaborated with local and international institutions, including the Makerere AI Health Lab, and serves on a Government of Uganda Ministry of Health committee shaping national AI in health policy. Beyond technology, Tony is a versatile arbitrator and a member of the Chartered Institute of Arbitrators (CIArb-UK), with notable expertise in land transactions and a proven track record of successfully resolving complex disputes. His contributions to the legal technology space have earned him recognition, including the Uganda Law Society Presidential Appreciation Award for chairing the inaugural Tech Fest, Uganda’s first-ever legal tech event that brought together over 600 participants, and the Uganda Law Society Digital Excellence Award for leading a pioneering legal practice at the forefront of innovation and legal technology. He holds a Master’s in Institutional Leadership & Management (UMI), a Postgraduate Diploma in Legal Practice (Law Development Centre), and an LLB from Makerere University. Tony is an active member of the Uganda Law Society, East African Law Society, Chartered Institute of Arbitrators, Uganda Christian Lawyers Fraternity, and the Rotary Club Kampala North.',
    ],
    order: 1,
  },
  {
    id: 'member-baluku',
    slug: 'baluku',
    name: 'Baluku David I.',
    role: 'Principal Associate',
    image: '/images/team/baluku.png',
    category: 'associate',
    featured: true,
    bio: [
      'Baluku David is an Associate in the Litigation, Taxation, and Corporate Advisory Departments, with a strong passion for Intellectual Property Law, Revenue and Taxation Law, Company Law, Banking and Finance, Estate Planning, Artificial Intelligence, Oil and Gas, and Technology, Media, and Telecommunications Law. He combines solid academic training with practical experience to deliver innovative legal solutions, particularly where emerging technologies intersect with traditional legal frameworks. Idembe is committed to providing strategic guidance that is both legally sound and commercially viable. He holds a Post Graduate Diploma in Legal Practice from the Law Development Centre and a Bachelor of Laws (LLB) from Makerere University, and he is an active member of the Uganda Law Society and the Uganda Christian Lawyers Fraternity.',
    ],
    order: 2,
  },
  {
    id: 'member-masika',
    slug: 'masika',
    name: 'Masika Sandra',
    role: 'Principal Associate',
    image: '/images/team/masika.png',
    category: 'associate',
    featured: true,
    bio: [
      'Sandra is an Advocate of the High Court of Uganda and all subordinate courts, with a dynamic and evolving practice spanning multiple areas of law.',
      'She has extensive experience in Family Law, Human Rights Law, Criminal Law, Employment Law and Land Conveyancing, with a particular focus on family, human rights, employment, real estate transactions, policy analysis and property development.',
      'She combines meticulous legal analysis with practical solutions tailored to the client’s objectives, helping individuals, businesses, and developers navigate complex legal and regulatory frameworks. Currently serving as a Principal Associate at the firm, Sandra is recognized for her commitment to excellence, client advocacy, and strategic problem-solving. She holds a Post Graduate Diploma in Legal Practice from the Law Development Centre and a Bachelor of Laws (LLB) from Uganda Christian University. She is an active member of the Uganda Law Society and continues to engage in professional development initiatives to stay at the forefront of legal practice in Uganda.',
      'She is a member of the Uganda Law Society, East African Law Society, and Uganda Christian Lawyers Fraternity.',
    ],
    order: 3,
  },
  {
    id: 'member-muzingu',
    slug: 'muzingu',
    name: 'Muzingu Richard',
    role: 'Legal Associate',
    image: '/images/team/muzingu.png',
    category: 'associate',
    featured: true,
    bio: [
      'Muzingu Richard is an Advocate of the High Court of Uganda and all subordinate courts, with a dynamic legal practice spanning Land Law, Real Estate, Succession, and Corporate & Commercial Practice. He advises clients on complex transactions, regulatory compliance, and strategic legal planning, offering expertise in property acquisitions, leasing, development projects, due diligence, and dispute resolution. His succession practice focuses on estate planning, wills, and administration, helping clients preserve and transfer assets efficiently. In corporate & commercial practice, he advises businesses on formation, governance, regulatory compliance, mergers & acquisitions, and commercial contracts. He holds a Bachelor of Laws (LLB) Honours degree from Makerere University and a Post Graduate Diploma in Legal Practice from the Law Development Centre, where he graduated with a First Class and doubled as an awardee of the prestigious Director’s List Award of Top Performers for the academic year 2021/2022. As an active member of the Uganda Law Society, he remains committed to continuous professional growth and delivering forward-thinking legal solutions.',
    ],
    order: 4,
  },
  {
    id: 'member-priscilla',
    slug: 'priscilla',
    name: 'Priscilla Nayiga',
    role: 'Associate',
    image: '/images/team/priscilla.png',
    category: 'associate',
    featured: false,
    bio: [
      'Priscilla is an Associate with experience in fintech law, corporate finance, and regulatory advisory. Her practice focuses on advising fintech companies, financial institutions, and technology-enabled businesses on digital financial services regulation, fintech licensing, consumer protection, AML/CFT compliance, and digital identity and e-KYC requirements. She regularly supports clients in navigating complex regulatory frameworks and engaging effectively with sector regulators, providing practical, business-oriented solutions in fast-evolving digital markets. Priscilla also brings strong policy and research expertise, having contributed to public-sector digital transformation initiatives through legal and regulatory analysis on data protection, interoperability, and the governance of digital public infrastructure. She is particularly valued for her ability to translate complex regulatory developments into clear, commercially sound legal guidance that enables informed decision-making. She holds a Master of Laws (LL.M) and a Bachelor of Laws (LL.B) from Makerere University, and a Postgraduate Diploma in Legal Practice from the Law Development Centre.',
    ],
    order: 5,
  },
  {
    id: 'member-akello',
    slug: 'akello',
    name: 'Akello Mercy',
    role: 'Legal Assistant',
    image: '/images/team/akello.png',
    category: 'associate',
    featured: false,
    bio: [
      'Akello Mercy is a Legal Assistant with growing expertise in Tax Law, Real Estate Law and Company Law. She supports the firm and clients by providing research, drafting, compliance reviews, and transaction support across diverse legal matters. In tax practice, she assists with compliance assessments, preparation for audits, and dispute resolution processes, ensuring clients are well-prepared and guided through regulatory requirements. She also contributes to structuring transactions for tax efficiency under the supervision of senior counsel. In real estate, Akello has been actively involved in land due diligence, conveyancing, preparation of leases and mortgages, and documentation for property transactions. Her company law practice includes supporting corporate clients in business registration, corporate governance, regulatory compliance, and preparation of commercial agreements. Akello holds a Bachelor of Laws degree from Uganda Christian University and a Postgraduate Diploma in Legal Practice from the Law Development Centre.',
    ],
    order: 6,
  },
  {
    id: 'member-magada',
    slug: 'magada',
    name: 'Magada Julius',
    role: 'Legal Assistant',
    image: '/images/team/magada.png',
    category: 'associate',
    featured: false,
    bio: [
      'Magada Julius is a Legal Assistant specializing in Real Estate, Succession, and Company Law. In the area of real estate, he supports the firm in handling property transactions, including conveyancing, title searches, verification of land records, preparation and review of sale agreements, and registration of transfers. In succession law, Julius provides support in estate administration, drafting and reviewing wills, managing inheritance documentation, and guiding clients through procedural requirements for the distribution of estates. He assists in both contested and uncontested succession matters. In Company Law, he assists with corporate compliance, including preparation and review of company formation documents, maintenance of statutory registers, drafting of shareholders’ agreements, and support for mergers, acquisitions, and other corporate transactions. Julius holds a Bachelor of Laws (LL.B) from Kampala International University and a Postgraduate Diploma in Legal Practice from the Law Development Centre.',
    ],
    order: 7,
  },
  {
    id: 'member-ndijjo',
    slug: 'ndijjo',
    name: 'Ndijjo Samuel',
    role: 'Legal Associate',
    image: '/images/team/ndijjo.png',
    category: 'associate',
    featured: false,
    bio: [
      'Ndijjo Samuel is a Legal Associate at the firm with a strong focus on Real Estate Law and Corporate Finance. In real estate, Samuel is actively engaged in all aspects of property transactions, including due diligence, conveyancing, drafting and reviewing leases, mortgages, and other property agreements. He has experience supporting land acquisitions and developments. In corporate finance, Samuel assists in structuring financing arrangements, drafting and reviewing loan and security documentation, and ensuring regulatory compliance with financial institutions and governing bodies. He supports clients in navigating financing processes, including debt structuring, investment transactions, and corporate restructuring. Samuel is also actively engaged in Employment Law practice, Sports administration and management. Samuel holds a Bachelor of Laws degree from Uganda Christian University and a Postgraduate Diploma in Legal Practice from the Law Development Centre.',
    ],
    order: 8,
  },
];


// ─── Insights ────────────────────────────────────────────────────────────────

export const fallbackInsights: InsightItem[] = [
  {
    id: 'insight-e-discovery-in-litigation',
    slug: 'e-discovery-in-litigation',
    category: 'diamond-brief',
    meta: 'Diamond Brief Series, Vol.1 Issue 5 · 22 April 2026',
    title: 'E-Discovery in Litigation: An Overview of Electronic Evidence and Discovery',
    excerpt: '',
    hasArticle: true,
    article: {
      headline: 'E-DISCOVERY IN LITIGATION: An Overview of Electronic Evidence and Discovery',
      metaLine: 'Diamond Brief Series, Vol.1 Issue 5 · April 22, 2026',
      datePublished: '2026-04-22',
      standfirst: 'In our latest Diamond Brief, Vera Nakatumba explores E-Discovery in Litigation and what it means for litigants and legal practitioners in Uganda.',
      intro: [
        'As digital communications continue to replace paper records, the legal profession can no longer afford to treat electronic discovery as an afterthought.',
        'In our latest Diamond Brief, Vera Nakatumba explores E-Discovery in Litigation, a practical overview of how electronically stored information (ESI) is identified, preserved, collected, and produced in legal proceedings, and what this means for litigants and legal practitioners in Uganda.',
      ],
      takeawaysTitle: 'Key takeaways from the brief',
      takeaways: [
        'What qualifies as ESI, from emails and spreadsheets to deleted files and cloud storage',
        'The four conditions digital evidence must meet to be admissible in court',
        'Uganda’s legal framework: the Electronic Transactions Act, the Data Protection and Privacy Act, and the Evidence Act',
        'The 7-stage Electronic Discovery Reference Model (EDRM)',
        'How courts balance data protection principles with the evidentiary demands of litigation',
      ],
      closing: [
        'E-Discovery is no longer a concern exclusive to large, multinational disputes. As Ugandan courts and businesses become increasingly digital, understanding the rules around electronic evidence is essential for anyone involved in litigation.',
      ],
      note: 'The downloadable original Diamond Brief document and any remaining article content must be supplied from the original website.',
    },
    order: 1,
  },
  {
    id: 'insight-newsletter-archive',
    slug: 'newsletter-archive',
    category: 'newsletters',
    meta: 'Original content required',
    title: 'Newsletter archive',
    excerpt: 'Original Diamond Advocates article title, date and image required here.',
    hasArticle: false,
    article: {
      headline: '',
      metaLine: '',
      datePublished: '',
      standfirst: '',
      intro: [],
      takeawaysTitle: '',
      takeaways: [],
      closing: [],
      note: '',
    },
    order: 2,
  },
  {
    id: 'insight-in-the-press',
    slug: 'in-the-press',
    category: 'press',
    meta: 'Original content required',
    title: 'Diamond Advocates in the Press',
    excerpt: 'Original Diamond Advocates article title, date and image required here.',
    hasArticle: false,
    article: {
      headline: '',
      metaLine: '',
      datePublished: '',
      standfirst: '',
      intro: [],
      takeawaysTitle: '',
      takeaways: [],
      closing: [],
      note: '',
    },
    order: 3,
  },
];


// ─── Blogs (Diamond Brief PDFs) ──────────────────────────────────────────────

export const fallbackBlogs: BlogItem[] = [
  {
    id: 'blog-copyright-protection-for-fintech-innovators',
    slug: 'copyright-protection-for-fintech-innovators',
    title: 'Even David Can Defeat Goliath: What Kenya’s Landmark Copyright Judgment Means for Ugandan Fintech Innovators',
    series: 'Diamond Brief Series',
    authors: [
      'Priscilla Nayiga',
      'Vera Kabasiita Nakatumba',
    ],
    description: [
      'In this week’s Diamond Brief Series, Priscilla Nayiga and Vera Kabasiita Nakatumba discuss the dilemma of financial innovators in East Africa and the role of law in protecting small fintech innovators in Uganda, and the effectiveness of Uganda’s intellectual property law.',
      'They argue that while Uganda’s fintech ecosystem may have outpaced the development of dedicated legal frameworks, existing intellectual property doctrines apply with equal force to fintech products and their underlying expressions.',
      'The case of Muoki v. Safaricom should matter to Ugandan founders for a reason beyond its obvious encouragement. It demonstrates that copyright registration, meticulous documentation, and early legal counsel are not luxury expenses for well-funded startups. They are survival tools for any founder whose innovation might one day attract the attention of a larger player.',
    ],
    highlightsTitle: '',
    highlights: [],
    closing: [],
    pdf: {
      fileName: 'INTELLECTUAL-PROPERTY-PROTECTION-FOR-FINANCIAL-INNOVATORS.pdf',
      url: '',
      driveId: '1i3qSKFIqYDjKYYaKz2qU-qqB8t6erRdd',
    },
    image: {
      src: '/images/practices/ip-law.jpg',
      width: 1024,
      height: 559,
      alt: 'Patents, trademarks, copyrights and trade secrets illustration',
    },
    order: 1,
  },
  {
    id: 'blog-e-discovery-in-litigation',
    slug: 'e-discovery-in-litigation',
    title: 'E-Discovery in Litigation: An Overview of Electronic Evidence and Discovery',
    series: 'Diamond Brief Series · Vol.1 Issue 5',
    authors: [
      'Vera Nakatumba',
    ],
    description: [
      'As digital communications continue to replace paper records, the legal profession can no longer afford to treat electronic discovery as an afterthought.',
      'In our latest Diamond Brief, Vera Nakatumba explores E-Discovery in Litigation, a practical overview of how electronically stored information (ESI) is identified, preserved, collected, and produced in legal proceedings, and what this means for litigants and legal practitioners in Uganda.',
    ],
    highlightsTitle: 'Key takeaways from the brief',
    highlights: [
      'What qualifies as ESI, from emails and spreadsheets to deleted files and cloud storage',
      'The four conditions digital evidence must meet to be admissible in court',
      'Uganda’s legal framework: the Electronic Transactions Act, the Data Protection and Privacy Act, and the Evidence Act',
      'The 7-stage Electronic Discovery Reference Model (EDRM)',
      'How courts balance data protection principles with the evidentiary demands of litigation',
    ],
    closing: [
      'E-Discovery is no longer a concern exclusive to large, multinational disputes. As Ugandan courts and businesses become increasingly digital, understanding the rules around electronic evidence is essential for anyone involved in litigation.',
    ],
    pdf: {
      fileName: 'E-DISCOVERY-AND-LITIGATION.pdf',
      url: '',
      driveId: '1eYF-7Ja2eXsW2NmBAoUahaygIS9CAcvQ',
    },
    image: {
      src: '/images/practices/disputes-law.png',
      width: 2014,
      height: 1063,
      alt: 'Advocate wearing formal court attire',
    },
    order: 2,
  },
  {
    id: 'blog-borderless-identity-afcfta-digital-trade-protocol',
    slug: 'borderless-identity-afcfta-digital-trade-protocol',
    title: 'Borderless Identity: The Implementation Gaps in AfCFTA’s Digital Trade Protocol',
    series: 'Diamond Brief Series · Vol.1 Issue 4',
    authors: [
      'Galandi Tony Kiire',
      'Priscilla Nayiga',
    ],
    description: [
      'AfCFTA is building Africa’s single market. But a digital market cannot function without trusted digital identity.',
      'In Volume 1, Issue 4 of the Diamond Brief Series, Galandi Tony Kiire and Priscilla Nayiga explore Borderless Identity and the legal architecture emerging from the AfCFTA Digital Trade Protocol and its Annex on Digital Identities.',
      'The Protocol answers an important question: digital identity now formally belongs within Africa’s trade framework. The real challenge now is implementation.',
    ],
    highlightsTitle: 'This brief examines',
    highlights: [
      'How the Digital Trade Protocol embeds digital identity within Africa’s digital trade ecosystem',
      'The role of interoperability, mutual recognition, and cross-border authentication',
      'Why digital identity is becoming the trust infrastructure for cross-border payments, e-commerce, and digital services',
      'The implementation gaps that could reproduce regulatory fragmentation if left unaddressed',
    ],
    closing: [
      'AfCFTA’s digital market will not be built by tariffs alone. It will depend on whether Africa can develop trusted, interoperable identity systems that work across borders while respecting sovereignty and data protection.',
      'The law now points clearly toward integration. The question is whether implementation will follow.',
    ],
    pdf: {
      fileName: 'BORDERLESS-IDENTITY.pdf',
      url: '',
      driveId: '1ETxbAR7mN_rK2Xhq5qiS7gTpZp1Gszap',
    },
    image: {
      src: '/images/practices/ai-law.png',
      width: 1920,
      height: 1080,
      alt: 'Artificial intelligence processor on a circuit board',
    },
    order: 3,
  },
  {
    id: 'blog-bank-downgrades-and-minimum-capital-reforms',
    slug: 'bank-downgrades-and-minimum-capital-reforms',
    title: 'Bank Downgrades and Minimum Capital Reforms: How Higher Capital Thresholds Are Reshaping Uganda’s Banking Sector',
    series: 'Diamond Brief Series · Vol.1 Issue 3',
    authors: [
      'Idembe David Baluku',
    ],
    description: [
      'In this week’s Diamond Brief, Idembe David Baluku explains that Uganda’s revised minimum capital requirements are actively reshaping the structure of the banking market.',
      'The recent transition of Finance Trust Bank from Tier I to Tier II is part of a broader shift driven by higher capital thresholds, strengthened buffers, and evolving global regulatory standards.',
      'What does this mean? Capital is increasingly becoming the price of remaining in the top tier of Uganda’s banking market.',
    ],
    highlightsTitle: '',
    highlights: [],
    closing: [],
    pdf: {
      fileName: 'BANK-DOWNGRADES-IN-UGANDA-3.pdf',
      url: '',
      driveId: '17sW1P-4sbwUIfrA5oytKM42Siq7teqHb',
    },
    image: {
      src: '/images/practices/tax-law.png',
      width: 1024,
      height: 576,
      alt: 'Tax forms, calculator and laptop',
    },
    order: 4,
  },
  {
    id: 'blog-abuse-of-dominance-in-digital-markets',
    slug: 'abuse-of-dominance-in-digital-markets',
    title: 'The New Forms of Abuse of Dominance in Digital Markets: Why platform power is being re-examined',
    series: 'Diamond Brief Series',
    authors: [
      'Priscilla Nayiga',
      'Galandi Tony Kiire',
    ],
    description: [
      'This week, Priscilla Nayiga and Galandi Tony Kiire discuss the emerging forms of abuse of dominance in digital markets. As digital markets continue to evolve, the central compliance challenge is uncertainty. Conduct that appears lawful today may become high-risk tomorrow.',
      'The authors make an important observation: whereas Uganda’s competition enforcement in digital markets is still developing, it will not start from zero. Regulators will borrow heavily from international precedent.',
    ],
    highlightsTitle: '',
    highlights: [],
    closing: [],
    pdf: {
      fileName: 'EMERGING-FORMS-OF-ABUSE-OF-DOMINANCE-IN-DIGITAL-MARKETS.pdf',
      url: '',
      driveId: '1PMDjzQ4mQTx79MroIdbspspYk-jqMym9',
    },
    image: {
      src: '/images/practices/tech-law.png',
      width: 2014,
      height: 1063,
      alt: 'Technology keyboard illuminated in red and blue',
    },
    order: 5,
  },
  {
    id: 'blog-data-privacy-banking-and-innovation-in-uganda',
    slug: 'data-privacy-banking-and-innovation-in-uganda',
    title: 'Striking the Balance Between Data Privacy, Banking, and Innovation in Uganda',
    series: 'Diamond Brief Series · Vol.1 Issue 1',
    authors: [
      'Priscilla Nayiga',
      'Galandi Tony Kiire',
    ],
    description: [
      'Our first issue of the Diamond Brief Series features strong insights on the delicate balance between data privacy and financial innovation in the banking sector.',
      'Priscilla Nayiga and Galandi Tony Kiire call for coordinated regulation, modernized legal frameworks, and strengthened compliance practices across the financial sector. They conclude that with targeted reforms and collaborative regulatory oversight, Uganda can build a safer, more inclusive, and innovation-friendly digital financial environment.',
    ],
    highlightsTitle: '',
    highlights: [],
    closing: [],
    pdf: {
      fileName: 'STRIKING-THE-BALANCE-BETWEEN-DATA-PRIVACY-AND-BANKING.pdf',
      url: '',
      driveId: '1BYId4EqilJ4NIxMd-gcUG61PkJMRGIgt',
    },
    image: {
      src: '/images/practices/insurance-law.png',
      width: 2048,
      height: 1152,
      alt: 'Insurance key on a computer keyboard',
    },
    order: 6,
  },
];

// ─── Contact ─────────────────────────────────────────────────────────────────

export const fallbackContact: ContactContent = {
  heroEyebrow: 'Start a conversation',
  heroTitle: 'Book an Appointment',
  eyebrow: 'Contact information',
  title: 'How can we help?',
  lead: 'Email us for legal service or send appointment details using the form.',
  email: 'info@diamondadvocates.com',
  phone: '0414 671 838',
  phoneHref: 'tel:+256414671838',
  address: 'Plot 1 Lourdel Road, 5th Floor Lourdel Towers, Nakasero, Kampala City',
  officeHours: 'Monday – Friday, 8:00am – 5:00pm',
  mapEmbedUrl: '',
  socials: {
    linkedin: '',
    twitter: '',
    youtube: '',
    facebook: '',
  },
  topics: [
    'Technology Law',
    'AI Law',
    'Tax Law',
    'Real Estate Law',
    'Dispute Resolution',
    'Intellectual Property Law',
    'Employment Law',
    'Insurance Law',
    'Energy & Infrastructure Law',
    'Other',
  ],
};

// ─── Footer ──────────────────────────────────────────────────────────────────

export const fallbackFooter: FooterContent = {
  description:
    'Guided by global vision and grounded in strong legal foundations, we create the solutions of tomorrow, today.',
  copyrightName: 'Diamond Advocates',
  exploreTitle: 'Explore',
  exploreLinks: [
    { label: 'Our Practice', href: '/practice-areas' },
    { label: 'Our Team', href: '/team' },
    { label: 'Insights', href: '/insights' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Contact', href: '/contact' },
  ],
  practicesTitle: 'Practices',
  practiceLinks: [
    { label: 'Tech Law', href: '/practice/tech' },
    { label: 'AI Law', href: '/practice/ai' },
    { label: 'Tax Law', href: '/practice/tax' },
    { label: 'View all', href: '/practice-areas' },
  ],
  contactTitle: 'Contact',
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
  ],
  legalNote: 'Legal Disclaimer (page to be supplied)',
  legalNoteEnabled: false,
};
