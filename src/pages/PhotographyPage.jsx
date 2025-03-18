"use client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PhotographyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  // Collections with Cover Images
  const collections = [
    { name: "The Joy Collection", key: "joy", image: "/images/joy.jpg" },
    { name: "The Hope Collection", key: "hope", image: "/images/hope.jpg" },
    { name: "The Sage Collection", key: "sage", image: "/images/sage.jpg" },
    { name: "Heart & Soul Collection", key: "heart-and-soul", image: "/images/heart.jpg" },
    { name: "The Irish Boreen Collection", key: "irish-boreen", image: "/images/boreen.jpg" }
  ];

  return (
    <div className="min-h-screen py-48 font-quicksand bg-[#abbd9a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-5xl text-white font-bold">Photography Collections</h1>
        <hr className="w-32 mt-6 mx-auto mb-8 border-t-4 border-gray-400 opacity-75" />
        <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed mt-4">
          Explore my collections of carefully curated nature photography.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div
              key={collection.key}
              className="relative cursor-pointer group overflow-hidden rounded-xl shadow-md"
              onClick={() => navigate(`/photography/${collection.key}`)}
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-2xl font-bold text-white">{collection.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
