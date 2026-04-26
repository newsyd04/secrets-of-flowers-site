"use client";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import dashofpink from "../assets/dashofpink.jpg";
import christmasdaffodils from "../assets/christmasdaffodils.jpg";
import wintermeetsspring from "../assets/wintermeetsspring.jpg";
import littlethings from "../assets/littlethings.jpg";
import nature from "../assets/nature.jpg";

import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import FadeIn from "../components/FadeIn";
import SEO from "../components/SEO";

const COLLECTIONS = [
  { name: "The Joy", thumb: dashofpink, blurb: "Pure happiness, vibrant energy." },
  { name: "Hope", thumb: christmasdaffodils, blurb: "Cheerful daisies and lupins to lift the mood." },
  { name: "Sage", thumb: wintermeetsspring, blurb: "Wisdom and the calming essence of nature." },
  { name: "Heart and Soul", thumb: littlethings, blurb: "Deep emotions and the spirit of life." },
  { name: "The Irish Boreen", thumb: nature, blurb: "Rustic beauty and timeless landscapes." },
];

const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

export default function PhotographyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="Photography Collections"
        description="Browse curated botanical photography collections — The Joy, Hope, Sage, Heart and Soul, and The Irish Boreen."
      />

      <PageHeader
        eyebrow="Collections"
        title="Photography Collections"
        description="Discover my curated photography collections, each capturing a unique essence of nature."
      />

      <Section tone="cream">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((c, idx) => (
            <FadeIn key={c.name} delay={(idx % 3) * 0.08}>
              <Link
              key={c.name}
              to={`/photography/${toSlug(c.name)}`}
              className="group block relative rounded-2xl overflow-hidden border border-sage-100 bg-white shadow-sm hover:shadow-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2"
              aria-label={`Open ${c.name} collection`}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={c.thumb}
                  alt={c.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h2 className="text-2xl font-semibold text-white drop-shadow-md">
                  {c.name}
                </h2>
                <p className="text-sm text-white/90 mt-1 drop-shadow">{c.blurb}</p>
              </div>
              </Link>
            </FadeIn>
          ))}

          {/* Commission CTA tile — fills the 6th slot in a 3-col grid */}
          <FadeIn delay={(COLLECTIONS.length % 3) * 0.08}>
          <Link
            to="/contact"
            className="group relative block rounded-2xl overflow-hidden border-2 border-dashed border-sage-300 bg-sage-50 hover:bg-sage-100 hover:border-sage-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2"
          >
            <div className="aspect-[4/5] flex flex-col items-center justify-center text-center p-8">
              <div className="inline-flex w-14 h-14 items-center justify-center rounded-full bg-white text-sage-700 mb-5">
                <i className="fa-solid fa-envelope-open-text text-xl" />
              </div>
              <h2 className="text-xl font-semibold text-ink-900">
                Don't see what you're looking for?
              </h2>
              <p className="mt-2 text-sm text-ink-700/80 max-w-xs">
                Commission a custom piece — get in touch and let's create
                something tailored to your space.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sage-700 font-semibold text-sm group-hover:gap-3 transition-all">
                Start a conversation <i className="fa-solid fa-arrow-right text-xs" />
              </span>
            </div>
          </Link>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
}
