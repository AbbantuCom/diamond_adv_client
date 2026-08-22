'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { HeroContent } from '@/lib/content-types';

const SLIDE_DURATION = 4500;

export function HomeHero({ hero }: { hero: HeroContent }) {
  const [active, setActive] = useState(0);
  const slideCount = hero.slides.length;

  useEffect(() => {
    if (slideCount < 2) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setActive((index) => (index + 1) % slideCount), SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [slideCount]);

  // An editor removing slides can leave `active` past the end until the next tick.
  const activeIndex = slideCount > 0 ? active % slideCount : 0;

  return (
    <section className="hero">
      <div className="hero-media" data-parallax aria-hidden="true">
        {hero.slides.map((slide, index) => (
          <div key={slide.id} className={`hero-slide${index === activeIndex ? ' is-active' : ''}`}>
            <Image
              src={slide.src}
              alt=""
              width={slide.width}
              height={slide.height}
              priority={index === 0}
              sizes="(max-width: 820px) 100vw, 60vw"
            />
          </div>
        ))}
        <span className="hero-media-scan"></span>
      </div>
      <div className="hero-orbit hero-orbit--one" aria-hidden="true"></div>
      <div className="hero-orbit hero-orbit--two" aria-hidden="true"></div>
      <div className="container hero-content" data-reveal="hero">
        <p className="hero-kicker">
          {hero.slides.map((slide, index) => (
            <span key={slide.id}>
              {index > 0 ? <span aria-hidden="true"> · </span> : null}
              <span className={`hero-kicker-word${index === activeIndex ? ' is-active' : ''}`}>
                {slide.word}
              </span>
            </span>
          ))}
        </p>
        <h1>
          {hero.titlePrefix} <em>{hero.titleHighlight}</em> {hero.titleSuffix}
        </h1>
        <p className="hero-practices">{hero.tagline}</p>
        <div className="button-row">
          {hero.ctas.map((cta) => (
            <Link
              key={cta.id}
              className={`btn ${cta.style === 'gold' ? 'btn--gold' : 'btn--outline'}`}
              href={cta.href}
            >
              {cta.text}
              {cta.style === 'gold' ? <span>↗</span> : null}
            </Link>
          ))}
        </div>
      </div>
      <span className="hero-line"></span>
      <span className="scroll-cue">{hero.scrollCue}</span>
    </section>
  );
}
