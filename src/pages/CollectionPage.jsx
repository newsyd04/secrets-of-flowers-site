"use client";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CollectionPage() {
  const { collectionName } = useParams();
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

  // Convert the URL parameter (e.g., "hope" or "the-joy") to a raw name.
  const rawName = collectionName.replace(/-/g, " "); // e.g., "the joy"
  const lowerCaseName = rawName.toLowerCase();
  // For display, capitalize each word.
  const displayName = lowerCaseName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Store descriptions with lowercase keys.
  const collectionDescriptions = {
    "the joy": "A collection celebrating pure happiness and vibrant energy.",
    "hope": "The Secrets of Flowers Hope Collection serves as a beautiful reminder of our inner strength and the belief that brighter days are ahead. The cheerful whites and yellows of daisies, wild roses, and old-fashioned lupins always lift my mood, sparking a smile that says, \"I’ve got this!\" I truly hope they bring the same uplifting energy to you!",
    "sage": "Artworks that embody wisdom and the calming essence of nature.",
    "heart and soul": "Pieces that capture deep emotions and the spirit of life.",
    "the irish boreen": "A tribute to rustic beauty and timeless landscapes.",
  };

  const description = collectionDescriptions[lowerCaseName] || "";

  useEffect(() => {
    axios
      .get(`https://webdev-backends.onrender.com/flowers/images/collection/${rawName}`)
      .then((res) => setArtworks(res.data))
      .catch((err) => console.error("Error fetching collection:", err));
  }, [rawName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen py-48 font-quicksand bg-[#abbd9a]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-5xl text-white font-bold">{displayName}</h1>
        <hr className="w-32 mt-6 mx-auto mb-8 border-t-4 border-gray-400 opacity-75" />
        <p className="mt-4 text-lg text-white max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {/* Artworks Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artworks.map((art) => (
            <div
              key={art._id}
              className="relative cursor-pointer bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
              onClick={() => navigate(`/artwork/${art._id}`)}
            >
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-auto object-contain rounded-lg"
              />
              <h2 className="text-xl font-bold mt-2 text-center">{art.title}</h2>
              <p className="text-center text-gray-700">€{art.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
