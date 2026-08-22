'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

let lenis: Lenis | null = null;

/** Shared instance so other components (back to top, section nav) can drive the scroll. */
export function getLenis() {
  return lenis;
}

/** Scrolls to a page anchor, clearing the fixed header. */
export function scrollToAnchor(target: Element) {
  if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -88 });
  else target.scrollIntoView({ behavior: 'smooth' });
}

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis = instance;

    let frame = requestAnimationFrame(function raf(time: number) {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // Same-page anchors are handled by Lenis so they match the site's scroll feel.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const link = (event.target as Element | null)?.closest?.('a[href*="#"]');
      if (!(link instanceof HTMLAnchorElement)) return;

      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      history.replaceState(null, '', url.hash);
      scrollToAnchor(target);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [pathname]);

  return null;
}
