"use client";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import mairead1 from "../assets/mairead1.jpg";
import mairead3 from "../assets/mairead3.jpg";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f8f5] font-quicksand">
      {/* Header / Hero */}
      <header className="bg-gradient-to-b from-[#abbd9a] to-[#9fb293]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-16">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Meet Mairead
              </h1>
              <hr className="w-24 md:w-28 mt-5 border-t-4 border-white/60 rounded mx-auto md:mx-0" />
              <p className="mt-5 text-white/95 leading-relaxed max-w-xl md:max-w-none mx-auto">
                A passionate photographer who discovered her love for capturing the hidden beauty of nature a few years ago. Through my lens, I share the joy and secrets of flowers (<em>Rúin na mBláth</em>) along with a few tips and ideas to brighten your day.
              </p>

              <div className="mt-8 flex gap-4 justify-center md:justify-start">
                <Link
                  to="/photography"
                  className="inline-block px-6 py-3 rounded-full bg-white/90 hover:bg-white text-[#2d3b2a] font-semibold shadow"
                >
                  Explore Photography
                </Link>
                <Link
                  to="/contact"
                  className="inline-block px-6 py-3 rounded-full border border-white/70 text-white hover:bg-white/10 font-semibold"
                >
                  Say Hello
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <img
                  src={mairead1}
                  alt="Mairead in the field"
                  className="w-full h-[22rem] md:h-[26rem] object-cover transition-transform duration-500 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Journey */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100">
              <img
                src={mairead3}
                alt="Out exploring with the camera"
                className="w-full h-[22rem] md:h-[26rem] object-cover transition-transform duration-500 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">My Journey</h2>
            <hr className="w-20 mt-4 border-t-4 border-[#8b9a71]/60 rounded" />
            <p className="mt-5 text-gray-800 leading-relaxed">
              Photography became my passion just a few years ago, opening up a world where
              light, colour, and nature’s smallest details come to life. I find inspiration
              in the delicate intricacies of flowers, capturing their hidden stories and
              fleeting beauty.
            </p>
            <p className="mt-4 text-gray-800 leading-relaxed">
              My work is about sharing the emotions, colours, and secrets of the natural
              world. Whether it's the gentle curve of a petal or the dance of light on a
              dewdrop, each image tells a story worth remembering.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy band */}
      <section className="bg-[#8b9a71]">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">My Philosophy</h2>
          <hr className="w-20 mt-4 mx-auto border-t-4 border-white/60 rounded" />
          <p className="mt-5 text-white/95 leading-relaxed max-w-3xl mx-auto">
            Photography is more than just taking pictures — it's about capturing the soul
            of the moment. I believe nature’s beauty should be celebrated and shared,
            helping others see the world from a fresh perspective.
          </p>
          <p className="mt-4 text-white/95 leading-relaxed max-w-3xl mx-auto">
            Through my photography, I aim to inspire creativity, mindfulness, and a deeper
            connection with nature. Let’s explore the world through the lens together.
          </p>
        </div>
      </section>

      {/* Gentle CTA footer */}
      <section className="bg-[#f5f8f5]">
        <div className="max-w-6xl mx-auto px-6 py-14 text-center">
          <p className="text-gray-700">
            Ready to bring a calm, botanical mood into your space?
          </p>
          <div className="mt-5 flex gap-4 justify-center">
            <Link
              to="/photography"
              className="inline-block px-6 py-3 rounded-full bg-[#8b9a71] hover:bg-[#858d6f] text-white font-semibold shadow"
            >
              Browse Prints
            </Link>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 rounded-full border border-gray-300 text-gray-800 hover:bg-white font-semibold"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
