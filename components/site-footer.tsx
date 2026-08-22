import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import type { ContactContent, FooterContent, SiteSettings } from '@/lib/content-types';

type SiteFooterProps = {
  site: SiteSettings;
  footer: FooterContent;
  contact: ContactContent;
};

export function SiteFooter({ site, footer, contact }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Image
              className="footer-brand"
              src={site.logo}
              alt={site.name}
              width={1900}
              height={717}
            />
            <p>{footer.description}</p>
            {site.partnerLogo && (
              <Image
                className="partner-logo"
                src={site.partnerLogo}
                alt={`${site.name}, partner of WONE Global`}
                width={1024}
                height={386}
              />
            )}
          </div>
          <div>
            <h2 className="footer-title">{footer.exploreTitle}</h2>
            <ul className="footer-links">
              {footer.exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer-title">{footer.practicesTitle}</h2>
            <ul className="footer-links">
              {footer.practiceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer-title">{footer.contactTitle}</h2>
            <ul className="footer-links">
              <li>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>{contact.address}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {footer.copyrightName}. All rights reserved.
          </span>
          <span>
            {footer.legalLinks.map((link, index) => (
              <Fragment key={link.href}>
                {index > 0 && ' · '}
                <Link href={link.href}>{link.label}</Link>
              </Fragment>
            ))}
            {footer.legalNote && (
              <>
                {footer.legalLinks.length > 0 && ' · '}
                {footer.legalNote}
              </>
            )}
          </span>
        </div>
      </div>
    </footer>
  );
}
