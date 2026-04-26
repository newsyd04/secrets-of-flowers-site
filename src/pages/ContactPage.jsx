"use client";
import React, { useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import Button from "../components/Button";
import FadeIn from "../components/FadeIn";
import SEO from "../components/SEO";

const SOCIALS = [
  { href: "#", icon: "fa-brands fa-facebook", label: "Facebook" },
  { href: "#", icon: "fa-brands fa-instagram", label: "Instagram" },
  { href: "#", icon: "fa-brands fa-twitter", label: "Twitter" },
];

const CONTACT_INFO = [
  { icon: "fa-solid fa-location-dot", label: "Studio", value: "Tralee, Co. Kerry, Ireland" },
  { icon: "fa-solid fa-envelope", label: "Email", value: "mairead@secretsofflowers.com", href: "mailto:mairead@secretsofflowers.com" },
  { icon: "fa-solid fa-phone", label: "Phone", value: "+123-456-7890" },
];

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // form not wired to a backend yet — placeholder
    alert("Thanks for reaching out! I'll get back to you soon.");
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Get in Touch"
        description="Contact Mairead about photography sessions, collaborations, print sales, or commissioned pieces. Based in Tralee, Co. Kerry."
      />

      <PageHeader
        eyebrow="Contact"
        title="Get in Touch"
        description="Reach out for inquiries about photography sessions, collaborations, or print sales — I'd love to hear from you."
      />

      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Details */}
          <FadeIn as="aside" className="lg:col-span-2 bg-white rounded-2xl border border-sage-100 p-8">
            <h2 className="text-2xl font-semibold text-ink-900">Say hello</h2>
            <p className="mt-2 text-ink-700/80 leading-relaxed">
              Whether it's a question about a print, a commission, or a photography
              walk — drop a line.
            </p>

            <ul className="mt-7 space-y-5">
              {CONTACT_INFO.map((c) => (
                <li key={c.label} className="flex items-start gap-4">
                  <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-sage-100 text-sage-700 shrink-0">
                    <i className={c.icon} />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-sage-700 font-semibold">
                      {c.label}
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="text-ink-900 hover:text-sage-700 transition"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <div className="text-ink-900">{c.value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-sage-100">
              <div className="text-xs uppercase tracking-[0.18em] text-sage-700 font-semibold mb-3">
                Follow
              </div>
              <div className="flex gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-sage-100 hover:bg-sage-200 text-sage-700 transition"
                  >
                    <i className={`${s.icon} text-lg`} />
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.1} className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-sage-100 p-8"
          >
            <h2 className="text-2xl font-semibold text-ink-900">Send a message</h2>
            <p className="mt-2 text-ink-700/80">
              Fill in the form and I'll get back to you within a few days.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-ink-700">Your name</span>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="mt-2 w-full rounded-lg border border-sage-200 bg-cream-50 px-4 py-3 text-ink-900 placeholder:text-ink-700/40 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-ink-700">Email</span>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-lg border border-sage-200 bg-cream-50 px-4 py-3 text-ink-900 placeholder:text-ink-700/40 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500"
                />
              </label>
            </div>

            <label className="block mt-4">
              <span className="text-sm font-medium text-ink-700">Subject</span>
              <input
                type="text"
                placeholder="Print enquiry, commission, photography walk…"
                className="mt-2 w-full rounded-lg border border-sage-200 bg-cream-50 px-4 py-3 text-ink-900 placeholder:text-ink-700/40 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500"
              />
            </label>

            <label className="block mt-4">
              <span className="text-sm font-medium text-ink-700">Message</span>
              <textarea
                rows={5}
                required
                placeholder="Tell me a little about what you're looking for…"
                className="mt-2 w-full rounded-lg border border-sage-200 bg-cream-50 px-4 py-3 text-ink-900 placeholder:text-ink-700/40 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 resize-y"
              />
            </label>

            <div className="mt-6">
              <Button type="submit" variant="primary" size="md">
                Send Message <i className="fa-solid fa-paper-plane text-sm" />
              </Button>
            </div>
          </form>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
}
