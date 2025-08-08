"use client";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Import images as modules
import dashofpink from "../assets/dashofpink.jpg";
import christmasdaffodils from "../assets/christmasdaffodils.jpg";
import wintermeetsspring from "../assets/wintermeetsspring.jpg";
import littlethings from "../assets/littlethings.jpg";
import nature from "../assets/nature.jpg";

// Mapping of collection names to static thumbnail image URLs
const staticThumbnails = {
  "The Joy": dashofpink,
  "Hope": christmasdaffodils,
  "Sage": wintermeetsspring,
  "Heart and Soul": littlethings,
  "The Irish Boreen": nature,
};

export default function PhotographyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const collections = [
    "The Joy",
    "Hope",
    "Sage",
    "Heart and Soul",
    "The Irish Boreen",
  ];

  const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="min-h-screen bg-[#f5f8f5]">
      {/* Header */}
      <header className="bg-gradient-to-b from-[#abbd9a] to-[#9fb293]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-36 pb-24 text-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold tracking-tight">
            Photography Collections
          </h1>
          <hr className="w-24 mt-5 mx-auto border-t-4 border-white/50 rounded" />
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed mt-5">
            Discover my curated photography collections, each capturing a unique
            essence of nature.
          </p>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-8">
        {/* Top row: 3 */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {collections.slice(0, 3).map((collection) => (
            <Link
              key={collection}
              to={`/photography/${toSlug(collection)}`}
              className="group relative rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b9a71] focus-visible:ring-offset-2"
              aria-label={`Open ${collection} collection`}
            >
              <div className="overflow-hidden">
                <img
                  src={staticThumbnails[collection]}
                  alt={collection}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow">
                  {collection}
                </h2>
                <p className="text-sm text-white/90 mt-1">
                  Explore the {collection} collection
                </p>
              </div>
              <span className="absolute inset-x-0 top-0 h-1 bg-[#8b9a71] opacity-0 group-hover:opacity-100 transition" />
            </Link>
          ))}
        </div>

        {/* Bottom row: 2 */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {collections.slice(3).map((collection) => (
            <Link
              key={collection}
              to={`/photography/${toSlug(collection)}`}
              className="group relative rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b9a71] focus-visible:ring-offset-2"
              aria-label={`Open ${collection} collection`}
            >
              <div className="overflow-hidden">
                <img
                  src={staticThumbnails[collection]}
                  alt={collection}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow">
                  {collection}
                </h2>
                <p className="text-sm text-white/90 mt-1">
                  Explore the {collection} collection
                </p>
              </div>
              <span className="absolute inset-x-0 top-0 h-1 bg-[#8b9a71] opacity-0 group-hover:opacity-100 transition" />
            </Link>
          ))}
        </div>
      </main>

    </div>
  );
}
