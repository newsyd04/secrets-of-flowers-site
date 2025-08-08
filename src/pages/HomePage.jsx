"use client";
import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import bg from "../assets/painting-bg.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

/** —— SOCIAL (links only for Instagram, live embed for Facebook) —— */
function SocialTwoUp() {
  const IG_URL = "https://instagram.com/YOUR_USERNAME"; // replace with actual IG
  const FB_PAGE_URL = "https://www.facebook.com/maireadssecretsofflowers/photos_by";

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Instagram */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Instagram</h3>
                <p className="mt-1 text-gray-600">
                  Follow along for my latest floral photography.
                </p>
              </div>
              <a
                href={IG_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-2 text-[#8b9a71] hover:opacity-80 font-semibold"
              >
                Visit <i className="fa-solid fa-arrow-right" />
              </a>
            </div>

            <div className="flex-1 flex items-center justify-center mt-6">
              <a
                href={IG_URL}
                target="_blank"
                rel="noreferrer"
                className="block w-full h-64 rounded-xl overflow-hidden bg-[#f8faf9] border border-gray-200 hover:border-[#8b9a71] transition text-center flex items-center justify-center"
              >
                <i className="fa-brands fa-instagram text-5xl text-[#8b9a71]" />
              </a>
            </div>

            <div className="md:hidden text-center mt-6">
              <a
                href={IG_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[#8b9a71] hover:opacity-80 font-semibold"
              >
                Visit <i className="fa-solid fa-arrow-right" />
              </a>
            </div>
          </div>

          {/* Facebook */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Facebook</h3>
                <p className="mt-1 text-gray-600">Live page timeline.</p>
              </div>
              <a
                href={FB_PAGE_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-2 text-[#8b9a71] hover:opacity-80 font-semibold"
              >
                See more <i className="fa-solid fa-arrow-right" />
              </a>
            </div>

            {/* Facebook Page Plugin iframe */}
            <div className="mt-6 rounded-xl overflow-hidden border border-gray-100">
              <iframe
                title="Facebook Page"
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                  FB_PAGE_URL
                )}&tabs=timeline&width=500&height=650&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                width="100%"
                height="300"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>

            <div className="md:hidden text-center mt-6">
              <a
                href={FB_PAGE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[#8b9a71] hover:opacity-80 font-semibold"
              >
                See more <i className="fa-solid fa-arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



/** —— BENEFITS STRIP —— */
function BenefitsStrip() {
  const items = [
    { icon: "fa-solid fa-leaf", title: "Eco-minded", text: "Thoughtful materials and sustainable packaging where possible." },
    { icon: "fa-solid fa-award", title: "Gallery Quality", text: "Printed with archival inks on premium stock." },
    { icon: "fa-solid fa-truck", title: "Free Shipping", text: "Complimentary shipping on unframed prints." },
  ];
  return (
    <section className="bg-[#f8faf9] py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {items.map((it, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#e6eee5]">
              <i className={`${it.icon} text-lg text-[#657a57]`} />
            </div>
            <h3 className="mt-4 font-semibold text-lg text-gray-900">{it.title}</h3>
            <p className="mt-1 text-gray-600">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** —— FAVOURITES (dynamic from backend by ID) —— */
function FavouritePieces() {
  const favouriteIds = [
    "68559646312d258b6276e8b3",
    "6855981f312d258b6276e8b9",
    "685438a5312d258b6276e89a",
  ];
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await Promise.all(
          favouriteIds.map((id) =>
            axios.get(`https://webdev-backends.onrender.com/flowers/images/${id}`).then((r) => r.data)
          )
        );
        if (mounted) setItems(res);
      } catch (e) {
        console.error("Error loading favourites:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  return (
    <section id="featured-section" className="max-w-7xl mx-auto px-6 py-20 bg-white">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-3">My Favourite Pieces</h2>
      <p className="text-center text-gray-600 mb-10">A curation of calming botanicals to anchor your space.</p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100">
              <div className="h-64 bg-gray-200 animate-pulse" />
              <div className="p-5">
                <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse" />
                <div className="mt-3 h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((art) => (
            <Link
              key={art._id}
              to={`/artwork/${art._id}`}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden transition duration-500"
            >
              <div className="overflow-hidden relative">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{art.title}</h3>
                <span className="text-[#8b9a71] group-hover:translate-x-0.5 transition inline-flex items-center gap-2 font-medium">
                  View <i className="fa-solid fa-arrow-right text-sm" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* —— Hero (unchanged) —— */}
      <div
        className="h-screen w-full flex items-center z-0 justify-center relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="p-6 max-w-6xl mx-auto relative z-50 w-full text-center">
          <h1 className="text-5xl md:text-8xl font-ptsans font-extrabold text-gray-300 animate-fade-in">
            Secrets of Flowers
          </h1>
          <p className="mt-6 font-medium text-lg md:text-xl font-quicksand text-gray-100 max-w-2xl mx-auto leading-relaxed">
            🌸 Highlighting how much beauty is all around us <br /> in the natural world 🌻
          </p>
          <Link
            to="./photography"
            className="inline-block bg-[#8b9a71] hover:bg-[#858d6f] text-white px-10 font-quicksand py-4 mt-10 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition"
          >
            View My Photography
          </Link>
        </div>

        {/* Scroll-down Icon */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50">
          <a
            href="#featured-section"
            className="flex items-center justify-center w-12 h-12 bg-gray-300 text-gray-900 rounded-full shadow-lg hover:bg-gray-400 transition"
          >
            <i className="fa-solid fa-arrow-down text-xl" />
          </a>
        </div>
      </div>

      {/* —— Page BG tone after hero —— */}
      <div className="bg-[#f8faf9]">
        {/* Favourites */}
        <FavouritePieces />

        {/* Benefits */}
        <BenefitsStrip />

        {/* Instagram + Facebook side-by-side */}
        <SocialTwoUp />
      </div>
    </>
  );
}
