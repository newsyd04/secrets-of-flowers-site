"use client";
import { useEffect } from "react";
import React from "react";
import mairead1 from "../assets/mairead1.jpg";
import mairead3 from "../assets/mairead3.jpg";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen py-48 font-quicksand bg-[#abbd9a]">
      <hr className="w-32 mx-auto mb-8 border-t-4 border-gray-400 opacity-75" />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Meet Mairead</h1>
        <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed">
          A passionate photographer who discovered her love for capturing the hidden beauty of nature a few years ago. Through my lens, I share the joy and secrets of flowers (<em>Rúin na mBláth</em>) along with a few tips and ideas to brighten your day.
        </p>
        <hr className="w-32 mx-auto my-8 border-t-4 border-gray-400" />
        <img
          src={mairead1}
          alt="Mairead in the field"
          className="rounded-xl mx-auto shadow-2xl hover:scale-105 transition duration-500"
        />
      </div>

      {/* Photography Journey Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">My Journey</h2>
            <hr className="w-24 border-t-4 border-gray-400 mb-6" />
            <p className="text-lg text-white leading-relaxed">
              Photography became my passion just a few years ago, opening up a world where light, color, and nature’s smallest details come to life. I find inspiration in the delicate intricacies of flowers, capturing their hidden stories and fleeting beauty.
            </p>
            <p className="mt-6 text-lg text-white leading-relaxed">
              My work is about sharing the emotions, colors, and secrets of the natural world. Whether it's the gentle curve of a petal or the dance of light on a dewdrop, each image tells a story worth remembering.
            </p>
          </div>
          {/* Hover Effect on Image */}
          <div className="relative group">
              <img
              src={mairead3}
              alt="Mairead in the field"
              className="rounded-xl mx-auto shadow-2xl hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </div>

      {/* Photography Philosophy Section */}
      <div className="bg-[#8b9a71] py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">My Philosophy</h2>
          <hr className="w-24 mx-auto border-t-4 border-gray-400 mb-6" />
          <p className="text-lg text-white leading-relaxed max-w-3xl mx-auto">
            Photography is more than just taking pictures—it's about capturing the soul of the moment. I believe that nature’s beauty should be celebrated and shared, helping others see the world from a fresh perspective.
          </p>
          <p className="mt-6 text-lg text-white leading-relaxed max-w-3xl mx-auto">
            Through my photography, I aim to inspire creativity, mindfulness, and a deeper connection with nature. Let's explore the world through the lens together.
          </p>
        </div>
      </div>
    </div>
  );
}
