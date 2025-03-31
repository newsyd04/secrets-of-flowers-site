"use client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const collections = ["The Joy", "Hope", "Sage", "Heart and Soul", "The Irish Boreen"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Split collections into rows of 3 items each.
  const rows = [];
  for (let i = 0; i < collections.length; i += 3) {
    rows.push(collections.slice(i, i + 3));
  }

  return (
    <div className="min-h-screen py-48 font-quicksand bg-[#abbd9a]">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-5xl text-white font-bold">Photography Collections</h1>
        <hr className="w-32 mt-6 mx-auto mb-8 border-t-4 border-gray-400 opacity-75" />
        <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed mt-4">
          Discover my curated photography collections, each capturing a unique essence of nature.
        </p>
      </div>

      {/* Collections Rows */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-8">
        {rows.map((row, rowIndex) =>
          row.length === 3 ? (
            // Full row: use grid with 3 columns
            <div key={rowIndex} className="grid grid-cols-3 gap-8">
              {row.map((collection, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl overflow-hidden shadow-xl cursor-pointer transform transition duration-500 hover:scale-105"
                  onClick={() =>
                    navigate(`/photography/${collection.toLowerCase().replace(/\s+/g, "-")}`)
                  }
                >
                  <img
                    src={staticThumbnails[collection]}
                    alt={collection}
                    className="h-64 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-75"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <h2 className="text-3xl font-bold text-white">{collection}</h2>
                    <p className="text-sm text-white mt-1">
                      Explore the {collection} collection
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Incomplete row: use flex to center items horizontally
            <div key={rowIndex} className="flex justify-center gap-8">
              {row.map((collection, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl overflow-hidden shadow-xl cursor-pointer transform transition duration-500 hover:scale-105"
                  style={{ width: "calc((100% - 16px) / 3)" }}  // ensure same width as a grid item
                  onClick={() =>
                    navigate(`/photography/${collection.toLowerCase().replace(/\s+/g, "-")}`)
                  }
                >
                  <img
                    src={staticThumbnails[collection]}
                    alt={collection}
                    className="h-64 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-75"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <h2 className="text-3xl font-bold text-white">{collection}</h2>
                    <p className="text-sm text-white mt-1">
                      Explore the {collection} collection
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
