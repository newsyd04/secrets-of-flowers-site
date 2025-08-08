"use client";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function CollectionPage() {
  const { collectionName } = useParams();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Convert "the-joy" -> "the joy" for API; "The Joy" for display
  const rawName = collectionName.replace(/-/g, " ");
  const lowerCaseName = rawName.toLowerCase();
  const displayName = lowerCaseName
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const collectionDescriptions = {
    "the joy":
      "A collection celebrating pure happiness and vibrant energy.",
    hope:
      'The Secrets of Flowers Hope Collection serves as a beautiful reminder of our inner strength and the belief that brighter days are ahead. The cheerful whites and yellows of daisies, wild roses, and old-fashioned lupins always lift my mood, sparking a smile that says, "I’ve got this!" I truly hope they bring the same uplifting energy to you!',
    sage:
      "Artworks that embody wisdom and the calming essence of nature.",
    "heart and soul":
      "Pieces that capture deep emotions and the spirit of life.",
    "the irish boreen":
      "A tribute to rustic beauty and timeless landscapes.",
  };

  const description = collectionDescriptions[lowerCaseName] || "";

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setErr("");
    axios
      .get(
        `https://webdev-backends.onrender.com/flowers/images/collection/${rawName}`
      )
      .then((res) => {
        if (!mounted) return;
        setArtworks(res.data || []);
      })
      .catch((e) => {
        console.error("Error fetching collection:", e);
        if (!mounted) return;
        setErr("Couldn’t load this collection. Please try again in a moment.");
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

  return (
    <div className="min-h-screen bg-[#f5f8f5]">
      {/* Header */}
      <header className="bg-gradient-to-b from-[#abbd9a] to-[#9fb293]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-36 pb-24 text-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold tracking-tight">
            {displayName}
          </h1>
          <hr className="w-24 mt-5 mx-auto border-t-4 border-white/50 rounded" />
          {description && (
            <p className="mt-5 text-white/90 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </header>

      {/* Content container */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Error */}
        {err && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
            {err}
          </div>
        )}

        {/* Loading skeleton grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100"
              >
                <div className="h-64 bg-gray-200 animate-pulse" />
                <div className="p-4">
                  <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-200 rounded mt-3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : artworks.length === 0 ? (
          // Empty state
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-lg text-gray-700">
              No artworks found in this collection (yet!).
            </p>
            <Link
              to="/photography"
              className="inline-block mt-6 px-6 py-3 rounded-full bg-[#8b9a71] hover:bg-[#858d6f] text-white font-semibold shadow"
            >
              Browse All Prints
            </Link>
          </div>
        ) : (
          // Grid
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artworks.map((art) => (
              <Link
                key={art._id}
                to={`/artwork/${art._id}`}
                className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#8b9a71] focus:ring-offset-2"
              >
                <div className="overflow-hidden">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    loading="lazy"
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-base md:text-lg font-semibold text-gray-900 text-center line-clamp-2">
                    {art.title}
                  </h2>
                  <div className="mt-2 text-center text-gray-700">
                    {fmt(art.price)}
                  </div>
                </div>

                {/* subtle top border accent on hover */}
                <span className="absolute inset-x-0 top-0 h-1 bg-[#8b9a71] opacity-0 group-hover:opacity-100 transition" />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
