"use client";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CollectionPage() {
  const { collection } = useParams();
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://secrets-of-flowers-site.onrender.com/images/collection/${collection}`)
      .then((res) => setArtworks(res.data))
      .catch((err) => console.error("Error fetching collection:", err));
  }, [collection]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen py-48 font-quicksand bg-[#abbd9a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-5xl text-white font-bold capitalize">{collection.replace("-", " ")}</h1>
        <hr className="w-32 mt-6 mx-auto mb-8 border-t-4 border-gray-400 opacity-75" />
        <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed mt-4">
          Explore stunning artwork from the {collection.replace("-", " ")}.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {artworks.length === 0 ? (
          <p className="text-center text-gray-200 text-lg">No artworks found in this collection.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artworks.map((piece) => (
              <div
                key={piece._id}
                className="relative cursor-pointer"
                onClick={() => navigate(`/artwork/${piece._id}`)}
              >
                <div className="relative group">
                  <img
                    src={piece.imageUrl}
                    alt={piece.title}
                    className="w-full h-auto object-contain rounded-xl shadow-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center p-2 items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                    <h2 className="text-2xl font-bold">{piece.title}</h2>
                    <h4 className="text-md font-semibold">€{piece.price}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
