"use client";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import Button from "../components/Button";
import FadeIn from "../components/FadeIn";
import SEO from "../components/SEO";

const COLLECTION_DESCRIPTIONS = {
  "the joy": "A collection celebrating pure happiness and vibrant energy.",
  hope:
    'The Secrets of Flowers Hope Collection serves as a beautiful reminder of our inner strength and the belief that brighter days are ahead. The cheerful whites and yellows of daisies, wild roses, and old-fashioned lupins always lift my mood, sparking a smile that says, "I\'ve got this!" I truly hope they bring the same uplifting energy to you!',
  sage: "Artworks that embody wisdom and the calming essence of nature.",
  "heart and soul": "Pieces that capture deep emotions and the spirit of life.",
  "the irish boreen": "A tribute to rustic beauty and timeless landscapes.",
};

export default function CollectionPage() {
  const { collectionName } = useParams();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const rawName = collectionName.replace(/-/g, " ");
  const lowerCaseName = rawName.toLowerCase();
  const displayName = lowerCaseName
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const description = COLLECTION_DESCRIPTIONS[lowerCaseName] || "";

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setErr("");
    axios
      .get(`https://webdev-backends.onrender.com/flowers/images/collection/${rawName}`)
      .then((res) => {
        if (!mounted) return;
        setArtworks(res.data || []);
      })
      .catch((e) => {
        console.error("Error fetching collection:", e);
        if (!mounted) return;
        setErr("Couldn't load this collection. Please try again in a moment.");
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [rawName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fmt = (n) =>
    typeof n === "number" ? `€${n}` : n ? `€${Number(n)}` : "€—";

  const lightboxSlides = artworks.map((a) => ({
    src: a.imageUrl,
    alt: a.title,
    title: a.title,
  }));

  const openLightbox = (e, idx) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxIndex(idx);
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={`${displayName} Collection`}
        description={
          description ||
          `Explore the ${displayName} collection — fine-art botanical photography prints by Mairead.`
        }
      />

      <PageHeader
        eyebrow="Collection"
        title={displayName}
        description={description || undefined}
      />

      <Section tone="cream">
        {err && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
            {err}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-white border border-sage-100"
              >
                <div className="aspect-[4/5] bg-cream-200 animate-pulse" />
                <div className="p-4">
                  <div className="h-4 w-2/3 bg-cream-200 rounded animate-pulse" />
                  <div className="h-3 w-12 bg-cream-200 rounded mt-3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : artworks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-sage-100">
            <p className="text-lg text-ink-700">
              No artworks found in this collection yet.
            </p>
            <div className="mt-6">
              <Button to="/photography" variant="primary" size="md">
                Browse all collections
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artworks.map((art, idx) => (
              <FadeIn key={art._id} delay={(idx % 4) * 0.06}>
                <Link
                  to={`/artwork/${art._id}`}
                  className="group block relative rounded-2xl overflow-hidden bg-white border border-sage-100 shadow-sm hover:shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Expand-to-lightbox button (top-right, hover or focus) */}
                  <button
                    type="button"
                    onClick={(e) => openLightbox(e, idx)}
                    aria-label={`Preview ${art.title} larger`}
                    className="absolute top-3 right-3 inline-flex w-9 h-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-sage-800 shadow opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100 hover:bg-white transition"
                  >
                    <i className="fa-solid fa-up-right-and-down-left-from-center text-xs" />
                  </button>

                  <div className="p-4 text-center">
                    <h2 className="text-sm md:text-base font-semibold text-ink-900 line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">
                      {art.title}
                    </h2>
                    <div className="mt-2 text-sm text-ink-700/70">{fmt(art.price)}</div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </Section>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={lightboxSlides}
        styles={{ container: { backgroundColor: "rgba(31, 34, 28, 0.92)" } }}
      />
    </div>
  );
}
