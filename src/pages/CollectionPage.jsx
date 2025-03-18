"use client";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CollectionPage() {
  const { collectionName } = useParams();
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://secrets-of-flowers-site.onrender.com/images/collection/${collectionName.replace(
          /-/g,
          " "
        )}`
      )
      .then((res) => setArtworks(res.data))
      .catch((err) => console.error("Error fetching collection:", err));
  }, [collectionName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen py-48 font-quicksand bg-[#abbd9a]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-5xl text-white font-bold">
          {collectionName.replace(/-/g, " ")}
        </h1>
        <hr className="w-32 mt-6 mx-auto mb-8 border-t-4 border-gray-400 opacity-75" />
        <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed mt-4">
          Browse exclusive pieces from the {collectionName.replace(/-/g, " ")}{" "}
          collection.
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
