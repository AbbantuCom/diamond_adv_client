import type { Metadata } from 'next';
import Link from 'next/link';

import { AppointmentForm } from '@/components/appointment-form';
import { ConsentGate } from '@/components/consent-gate';
import { getContact, getSite } from '@/lib/content-api';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: 'Contact & Appointment',
    description: `Contact ${site.name} or book an appointment.`,
  };
}

export default async function ContactPage() {
  const [site, contact] = await Promise.all([getSite(), getContact()]);

  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </nav>
          <p className="eyebrow">{contact.heroEyebrow}</p>
          <h1>{contact.heroTitle}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container form-layout">
          <div data-reveal>
            <p className="eyebrow">{contact.eyebrow}</p>
            <h2>{contact.title}</h2>
            <p className="lead">{contact.lead}</p>
            <ul className="contact-list">
              <li>
                <small>Telephone</small>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </li>
              <li>
                <small>Email</small>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <small>Office</small>
                {contact.address}
              </li>
              <li>
                <small>Business hours</small>
                {contact.officeHours}
              </li>
            </ul>
          </div>
          <div data-reveal>
            <AppointmentForm site={site} contact={contact} />
          </div>
        </div>
        <div className="container">
          <ConsentGate
            label="the office map"
            provider="Google Maps"
            fallback={{
              href: 'https://www.google.com/maps/place/Lourdel+Towers,+Lourdel+Rd,+Kampala',
              label: 'Open in Google Maps',
            }}
          >
            <div className="map-embed">
              <iframe
                title={`${site.name} office at Lourdel Towers on Google Maps`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.751607501047!2d32.5768209!3d0.33133429999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb73562d7a5b%3A0x36e3ce70d42d48fd!2sLourdel%20Towers%2C%20Lourdel%20Rd%2C%20Kampala!5e0!3m2!1sen!2sug!4v1786897151224!5m2!1sen!2sug"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </ConsentGate>
        </div>
      </section>
    </>
  );
}
