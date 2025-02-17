"use client";
import React from "react";

export default function LessonsPage() {
  const lessonPhotos = [
    { id: 1, title: "Beginner Workshop", image: "https://placehold.co/400x400", description: "Students learning basic techniques." },
    { id: 2, title: "Advanced Portrait Class", image: "https://placehold.co/400x400", description: "An advanced student creating a portrait." },
    { id: 3, title: "Art Camp", image: "https://placehold.co/400x400", description: "A fun and creative summer art camp session." },
  ];

  return (
    <div className="min-h-screen font-quicksand bg-[#abbd9a] py-48">
      
      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Art Lessons with Abe</h1>
        <hr className="w-32 mx-auto border-t-4 border-[#A67B5B] mb-6 opacity-75" />
        <p className="text-lg text-gray-800 leading-relaxed mb-10">
          At Abe's Art Studio, we offer art lessons for all skill levels and age groups. Whether you're a complete beginner or an experienced artist looking to refine your technique, our classes are designed to inspire and nurture creativity.
          <br /><br />
          We provide a warm and encouraging environment where students can express themselves, learn new skills, and explore various art styles and mediums. Join us and discover the joy of creating art!
        </p>
        <div className="text-lg font-bold text-gray-700 mt-2 mb-8">
          To inquire about our art lessons, contact Abe directly at:
          <p className="text-2xl font-bold text-indigo-600">+123-456-7890</p>   
        </div>
      </div>

      {/* Photos Section with Hover Effect */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessonPhotos.map((photo) => (
            <div key={photo.id} className="relative group">
              
              {/* Image */}
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-auto object-contain rounded-xl shadow-md"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                <h3 className="text-2xl font-bold">{photo.title}</h3>
                <p className="mt-2 text-sm text-gray-200">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
