'use client';

import { useState, type FormEvent } from 'react';

import type { ContactContent, SiteSettings } from '@/lib/content-types';

type FieldName = 'name' | 'email' | 'phone' | 'topic' | 'details';

const fields: {
  name: FieldName;
  label: string;
  error: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  select?: boolean;
  full?: boolean;
}[] = [
  { name: 'name', label: 'Name', error: 'Please enter your name.', autoComplete: 'name' },
  {
    name: 'email',
    label: 'Email Address',
    error: 'Please enter a valid email address.',
    type: 'email',
    autoComplete: 'email',
  },
  {
    name: 'phone',
    label: 'Phone Number',
    error: 'Please enter your phone number.',
    type: 'tel',
    autoComplete: 'tel',
  },
  {
    name: 'topic',
    label: 'Area of Interest',
    error: 'Please choose an area of interest.',
    select: true,
  },
  {
    name: 'details',
    label: 'Details',
    error: 'Please tell us how we can assist.',
    multiline: true,
    full: true,
  },
];

type Enquiry = Record<FieldName, string>;

type Status = 'idle' | 'sending' | 'sent' | 'failed';

function host(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/+$/, '');
  }
}

/** Builds the `mailto:` link used when the enquiry cannot be delivered to the firm. */
export function buildMailtoHref(enquiry: Enquiry, site: SiteSettings, email: string) {
  const subject = `Appointment request from ${enquiry.name}`;
  const body = [
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone}`,
    `Area of interest: ${enquiry.topic}`,
    '',
    'Details:',
    // Mail clients are happiest with CRLF throughout the body.
    enquiry.details.replace(/\r?\n/g, '\r\n'),
    '',
    `Sent from the appointment form at ${host(site.url)}`,
  ].join('\r\n');

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

type AppointmentFormProps = {
  site: SiteSettings;
  contact: ContactContent;
};

/**
 * Appointment form.
 *
 * Validates in the browser, then posts the enquiry to the firm's admin API, where
 * it appears in the Messages inbox. If that request fails — the API is down, or
 * the visitor is offline — the form falls back to the previous behaviour and hands
 * the enquiry to the visitor's own email application, so a submission is never
 * silently lost.
 */
export function AppointmentForm({ site, contact }: AppointmentFormProps) {
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_CONTENT_API_URL;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nextInvalid: Record<string, boolean> = {};
    const values = {} as Enquiry;

    fields.forEach((field) => {
      const control = form.elements.namedItem(field.name) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
        | null;
      if (!control) return;
      values[field.name] = control.value.trim();
      nextInvalid[field.name] = !(control.checkValidity() && control.value.trim() !== '');
    });

    setInvalid(nextInvalid);
    const firstInvalid = fields.find((field) => nextInvalid[field.name]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid.name) as HTMLElement | null)?.focus();
      setStatus('idle');
      setMailtoHref(null);
      return;
    }

    const href = buildMailtoHref(values, site, contact.email);

    // No API configured: this is a bare checkout, so keep the email-client path.
    if (!apiUrl) {
      setMailtoHref(href);
      setStatus('failed');
      window.location.href = href;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`${apiUrl.replace(/\/+$/, '')}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: `${values.topic}: appointment request`,
          message: [`Phone: ${values.phone}`, `Area of interest: ${values.topic}`, '', values.details].join('\n'),
        }),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      form.reset();
      setStatus('sent');
      setMailtoHref(null);
    } catch {
      // The enquiry still reaches the firm, just by the visitor's own mail client.
      setMailtoHref(href);
      setStatus('failed');
      window.location.href = href;
    }
  };

  const clearError = (name: FieldName) =>
    setInvalid((current) => (current[name] ? { ...current, [name]: false } : current));

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        {fields.map((field) => (
          <div
            key={field.name}
            className={`field${field.full ? ' full' : ''}${invalid[field.name] ? ' invalid' : ''}`}
          >
            <label htmlFor={field.name}>
              {field.label} <span aria-hidden="true">*</span>
            </label>
            {field.multiline ? (
              <textarea
                id={field.name}
                name={field.name}
                required
                aria-invalid={invalid[field.name] ? 'true' : undefined}
                aria-describedby={invalid[field.name] ? `${field.name}-error` : undefined}
                onInput={() => clearError(field.name)}
              />
            ) : field.select ? (
              <select
                id={field.name}
                name={field.name}
                required
                defaultValue=""
                aria-invalid={invalid[field.name] ? 'true' : undefined}
                aria-describedby={invalid[field.name] ? `${field.name}-error` : undefined}
                onChange={() => clearError(field.name)}
              >
                <option value="" disabled>
                  Select an area
                </option>
                {contact.topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                required
                aria-invalid={invalid[field.name] ? 'true' : undefined}
                aria-describedby={invalid[field.name] ? `${field.name}-error` : undefined}
                onInput={() => clearError(field.name)}
              />
            )}
            <span className="error" id={`${field.name}-error`}>
              {field.error}
            </span>
          </div>
        ))}
        <div className="field full">
          <p className="form-note">
            {apiUrl
              ? `Your request is sent securely to ${site.name} and answered by email or telephone.`
              : `Submitting opens your email application with this request addressed to ${contact.email}.`}
          </p>
          <button className="btn btn--navy" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Submit request'} <span>↗</span>
          </button>

          <div className={`form-success${status === 'sent' ? ' show' : ''}`} role="status">
            Thank you. Your request has reached {site.name} and a member of our team will be in touch.
          </div>

          <div className={`form-success${status === 'failed' ? ' show' : ''}`} role="status">
            We could not send your request automatically, so your email application should now be
            open with it addressed to {contact.email}. Press send there to reach us. If nothing
            opened,{' '}
            <a href={mailtoHref ?? `mailto:${contact.email}`}>open the message manually</a>.
          </div>
        </div>
      </div>
    </form>
  );
}
