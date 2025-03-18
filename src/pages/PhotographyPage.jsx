"use client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PhotographyPage() {
  const navigate = useNavigate();
  const collections = ["The Joy", "Hope", "Sage", "Heart and Soul", "The Irish Boreen"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      {/* Collections Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-500 cursor-pointer"
              onClick={() => navigate(`/photography/${collection.toLowerCase().replace(/\s+/g, "-")}`)}
            >
              <div className="p-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800">{collection}</h2>
                <p className="text-gray-600 mt-2">Explore the {collection} collection</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
  