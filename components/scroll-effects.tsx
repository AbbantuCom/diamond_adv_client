'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Drives the site's scroll-linked motion: reveal-on-enter, hero/section parallax
 * and pointer tilt. It works off data attributes so page markup stays server rendered.
 */
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    document.querySelectorAll<HTMLElement>('[data-reveal="stagger"]').forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        (child as HTMLElement).style.transitionDelay = `${Math.min(index * 80, 480)}ms`;
      });
    });

    if (!('IntersectionObserver' in window) || reducedMotion) {
      revealItems.forEach((element) => element.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -35px' },
    );
    revealItems.forEach((element) => observer.observe(element));

    const parallaxItems = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    let ticking = false;
    const updateParallax = () => {
      parallaxItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > innerHeight) return;
        const progress = (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight;
        item.style.setProperty('--parallax-y', `${progress * -34}px`);
      });
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      requestAnimationFrame(updateParallax);
      ticking = true;
    };
    addEventListener('scroll', onScroll, { passive: true });
    updateParallax();

    const tiltCleanups = Array.from(document.querySelectorAll<HTMLElement>('[data-tilt]')).map(
      (card) => {
        const isPortraitCard = card.classList.contains('person-card');
        const onPointerMove = (event: PointerEvent) => {
          if (event.pointerType === 'touch') return;
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          if (isPortraitCard) {
            card.style.transform = `perspective(1000px) rotateX(${y * -4}deg) rotateY(${x * 6}deg) translateY(-5px)`;
            card.style.setProperty('--photo-x', `${x * -10}px`);
            card.style.setProperty('--photo-y', `${y * -8}px`);
          } else {
            card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 7}deg) translateY(-3px)`;
          }
        };
        const onPointerLeave = () => {
          card.style.transform = '';
          card.style.removeProperty('--photo-x');
          card.style.removeProperty('--photo-y');
        };
        card.addEventListener('pointermove', onPointerMove);
        card.addEventListener('pointerleave', onPointerLeave);
        return () => {
          card.removeEventListener('pointermove', onPointerMove);
          card.removeEventListener('pointerleave', onPointerLeave);
        };
      },
    );

    return () => {
      observer.disconnect();
      removeEventListener('scroll', onScroll);
      tiltCleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return null;
}
