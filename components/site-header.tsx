'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';

import type { NavLink } from '@/lib/content-types';

/** The nav entry that opens the practice dropdown instead of navigating. */
const PRACTICE_MENU_HREF = '/practice-areas';

export type PracticeNavLink = { slug: string; label: string; href: string };

type SiteHeaderProps = {
  /** Inner pages keep the solid header treatment from the first pixel. Defaults by route. */
  variant?: 'transparent' | 'inner';
  logo: string;
  siteName: string;
  navLinks: NavLink[];
  practiceLinks: PracticeNavLink[];
};

export function SiteHeader({ variant, logo, siteName, navLinks, practiceLinks }: SiteHeaderProps) {
  const pathname = usePathname();
  const resolvedVariant = variant ?? (pathname === '/' ? 'transparent' : 'inner');
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const practiceMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // React delegates its own click handlers to the document, so closing on outside
  // clicks is decided by containment rather than by stopping propagation.
  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const node = event.target as Node | null;
      if (node && practiceMenuRef.current?.contains(node)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, []);

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setDropdownOpen(false);
      setMenuOpen(false);
      menuToggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const closeOverlays = () => {
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const isActive = (href: string) => {
    // Hash links point within a page rather than at one, so none of them is ever
    // "the current page" — including "/#about", which would otherwise never match.
    if (href.includes('#')) return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navLinkProps = (href: string) => ({
    className: `nav-link${isActive(href) ? ' active' : ''}`,
    ...(isActive(href) ? { 'aria-current': 'page' as const } : {}),
  });

  const headerClass = [
    'site-header',
    resolvedVariant === 'inner' ? 'inner-header' : '',
    scrolled ? 'scrolled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className="container nav-shell">
          <Link className="brand" href="/" aria-label={`${siteName} home`}>
            <Image src={logo} alt={siteName} width={1900} height={717} priority />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navLinks.map((link) =>
              link.href === PRACTICE_MENU_HREF ? (
                <div className="nav-item" key={link.href} ref={practiceMenuRef}>
                  <button
                    className="nav-trigger"
                    aria-expanded={dropdownOpen}
                    aria-controls="practice-menu"
                    onClick={() => setDropdownOpen((open) => !open)}
                  >
                    {link.label} <span aria-hidden="true">⌄</span>
                  </button>
                  <div className={`dropdown${dropdownOpen ? ' open' : ''}`} id="practice-menu">
                    <div className="dropdown-grid">
                      {practiceLinks.map((practice) => (
                        <Link key={practice.slug} href={practice.href} onClick={closeOverlays}>
                          {practice.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.href} {...navLinkProps(link.href)} href={link.href}>
                  {link.label}
                </Link>
              ),
            )}
          </nav>
          <Link className="btn btn--gold header-cta" href="/contact">
            Book appointment <span>↗</span>
          </Link>
          <button
            ref={menuToggleRef}
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
          </button>
        </div>
      </header>
      <nav
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        id="mobile-menu"
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => (
          <Fragment key={link.href}>
            <Link href={link.href} onClick={closeOverlays}>
              {link.label}
            </Link>
            {link.href === PRACTICE_MENU_HREF && (
              <div className="mobile-sub">
                {practiceLinks.map((practice) => (
                  <Link key={practice.slug} href={practice.href} onClick={closeOverlays}>
                    {practice.label}
                  </Link>
                ))}
              </div>
            )}
          </Fragment>
        ))}
      </nav>
    </>
  );
}
