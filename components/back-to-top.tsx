'use client';

import { useEffect, useState } from 'react';

import { getLenis } from './smooth-scroll';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`back-to-top${visible ? ' visible' : ''}`}
      aria-label="Back to top"
      onClick={() => {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      ↑
    </button>
  );
}
