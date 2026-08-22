'use client';

import { useEffect, useState } from 'react';

type SectionNavProps = {
  label?: string;
  sections: { id: string; label: string }[];
};

/** Sticky in-page navigation that highlights the section currently in view. */
export function SectionNav({ label = 'On this page', sections }: SectionNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="section-nav" aria-label={label}>
      <span className="section-nav-label">{label}</span>
      {sections.map((section) => (
        <a
          key={section.id}
          className={activeId === section.id ? 'active' : undefined}
          aria-current={activeId === section.id ? 'true' : undefined}
          href={`#${section.id}`}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
