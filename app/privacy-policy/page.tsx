import type { Metadata } from 'next';
import Link from 'next/link';

import { SectionNav } from '@/components/section-nav';
import { getSite } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Diamond Advocates handles personal data on this website, and your rights under Uganda’s Data Protection and Privacy Act, 2019.',
};

const lastUpdated = '16 August 2026';

const sections = [
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'what-we-collect', label: 'What we collect' },
  { id: 'appointment-form', label: 'Appointment form' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'how-we-use-it', label: 'How we use it' },
  { id: 'your-rights', label: 'Your rights' },
  { id: 'retention', label: 'Retention' },
  { id: 'contact', label: 'Contact us' },
];

export default async function PrivacyPolicyPage() {
  const site = await getSite();

  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Privacy Policy</span>
          </nav>
          <p className="eyebrow">Transparency</p>
          <h1>Privacy Policy</h1>
        </div>
      </section>

      <section className="section">
        <div className="container detail-layout detail-layout--editorial">
          <aside>
            <SectionNav sections={sections} />
          </aside>

          <div>
            <section className="detail-section" data-reveal>
              <p className="eyebrow">Last updated {lastUpdated}</p>
              <p className="lead">
                This website collects almost nothing about you. It runs no analytics, no advertising
                and no tracking of any kind, and the appointment form sends nothing to us on its own.
                This policy explains the little that does happen, and the rights you have under
                Uganda’s Data Protection and Privacy Act, 2019.
              </p>
            </section>

            <section className="detail-section" id="who-we-are" data-reveal>
              <h2>Who we are</h2>
              <p>
                {site.name} is a law firm in Kampala, Uganda. For the purposes of the Data Protection
                and Privacy Act, 2019, we are the data controller for personal data collected through
                this website. You can reach us at {site.addressFull}, by email at{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a>, or by telephone on{' '}
                <a href={site.phoneHref}>{site.phone}</a>.
              </p>
              <p>
                This policy covers this website only. Personal data we handle in the course of acting
                for a client is governed by our engagement terms and by our professional duties of
                confidentiality, which are stricter than this policy.
              </p>
            </section>

            <section className="detail-section" id="what-we-collect" data-reveal>
              <h2>What we collect</h2>
              <p>
                We do not ask you to create an account, and there is no database of visitors behind
                this site. Two things happen automatically:
              </p>
              <ul className="blog-highlights">
                <li>
                  <strong>Technical request data.</strong> This site is hosted by Vercel, which
                  records standard server information such as your IP address, browser type and the
                  time of each request. This is what allows the pages to be delivered and protects
                  the site against abuse. We do not use it to identify you or build a profile.
                </li>
                <li>
                  <strong>Your cookie choice.</strong> If you accept or reject in the cookie notice,
                  that single answer is saved in your browser’s local storage. It stays on your
                  device and is never sent to us or to anyone else.
                </li>
              </ul>
              <p>
                Everything else is up to you: the site holds nothing until you choose to send us an
                email, call us, or load a piece of embedded content.
              </p>
            </section>

            <section className="detail-section" id="appointment-form" data-reveal>
              <h2>The appointment form</h2>
              <p>
                When you submit the appointment form on our{' '}
                <Link className="blog-inline-link" href="/contact">
                  contact page
                </Link>
                , the details you have typed — your name, email address, telephone number, the area
                of law you have selected and the description of your matter — are sent to us and
                stored on our own systems, where they can be read only by members of the firm.
              </p>
              <p>
                If that request cannot be sent for any reason, the form falls back to opening a
                message in your own email application addressed to {site.email}, which you then send
                yourself. In that case nothing leaves your device until you press send.
              </p>
              <p>
                Either way, we hold the enquiry as we would any other: we use it to respond to you,
                and to decide whether we are able to act for you. We keep it for as long as we need
                it for that purpose and to meet our professional record-keeping obligations. If we
                take you on as a client, our engagement terms take over from this policy.
              </p>
            </section>

            <section className="detail-section" id="cookies" data-reveal>
              <h2>Cookies and embedded content</h2>
              <p>
                We set no advertising or analytics cookies. The only third-party content on this site
                is the office map on the contact page and the PDF reader on each brief, both provided
                by Google, and neither loads until you allow it. Our{' '}
                <Link className="blog-inline-link" href="/cookie-policy">
                  cookie policy
                </Link>{' '}
                sets this out in full and lets you change your choice at any time.
              </p>
            </section>

            <section className="detail-section" id="how-we-use-it" data-reveal>
              <h2>How we use and share information</h2>
              <p>
                We use the information described above to deliver and secure this website, and to
                answer enquiries you send us. We do not sell personal data, we do not share it for
                advertising, and we do not transfer it to anyone except:
              </p>
              <ul className="blog-highlights">
                <li>
                  our hosting provider, which processes technical request data on our behalf so the
                  site can be served;
                </li>
                <li>
                  Google, if and when you choose to load the map or a PDF reader, under its own
                  privacy terms;
                </li>
                <li>
                  where we are required to disclose information by law, by a court, or by a
                  regulator.
                </li>
              </ul>
              <p>
                Because our hosting and the embedded content are operated by companies outside
                Uganda, technical data may be processed abroad. We rely on those providers’ own
                safeguards for such transfers.
              </p>
            </section>

            <section className="detail-section" id="your-rights" data-reveal>
              <h2>Your rights</h2>
              <p>
                Under the Data Protection and Privacy Act, 2019, you have the right to be told what
                personal data we hold about you, to ask us to correct it if it is wrong, to ask us to
                delete it, to object to how we are using it, and to withdraw consent you have given.
                You can also complain to the Personal Data Protection Office of Uganda.
              </p>
              <p>
                To exercise any of these rights, write to{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a>. We will not charge you for making
                a request, and we will respond as soon as we reasonably can.
              </p>
              <div className="content-placeholder">
                To confirm before publication: the response time the firm commits to, the name or
                title of the person handling data protection requests, and whether the firm is
                registered with the Personal Data Protection Office.
              </div>
            </section>

            <section className="detail-section" id="retention" data-reveal>
              <h2>How long we keep information</h2>
              <p>
                We keep enquiry emails for as long as we need them to deal with your enquiry and to
                meet our professional and regulatory obligations, after which they are deleted.
                Technical request data is held by our hosting provider for a limited period under its
                own retention schedule.
              </p>
              <div className="content-placeholder">
                To confirm before publication: the firm’s actual retention periods for enquiries that
                do not become matters, and for closed client files.
              </div>
            </section>

            <section className="detail-section" data-reveal>
              <h2>Security and changes</h2>
              <p>
                This site is served over an encrypted connection, and it holds no visitor database
                that could be breached. We take reasonable technical and organisational measures to
                protect the enquiries and files we do hold.
              </p>
              <p>
                If we change how this site handles personal data, we will update this page and the
                date at the top of it. Material changes will be brought to your attention on the site
                itself.
              </p>
            </section>

            <section className="detail-section" id="contact" data-reveal style={{ borderBottom: 0 }}>
              <h2>Contact us</h2>
              <p>
                Questions about this policy, or about how we handle your information, can go to{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a> or{' '}
                <a href={site.phoneHref}>{site.phone}</a>. You are also welcome to raise them at our
                office at {site.addressFull}.
              </p>
              <div className="button-row">
                <Link className="btn btn--navy" href="/contact">
                  Book appointment <span>↗</span>
                </Link>
                <Link className="text-link" href="/cookie-policy">
                  Cookie policy <span>→</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
