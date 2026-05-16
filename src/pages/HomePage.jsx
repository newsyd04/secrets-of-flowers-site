"use client";
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import bg from "../assets/painting-bg.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import Section from "../components/Section";
import Container from "../components/Container";
import Button from "../components/Button";
import FadeIn from "../components/FadeIn";
import SEO from "../components/SEO";
import { API_BASE } from "../config/api";

const FAVOURITE_IDS = [
  "68559646312d258b6276e8b3",
  "6855981f312d258b6276e8b9",
  "685438a5312d258b6276e89a",
];

/** —— FAVOURITE PIECES (dynamic from backend by ID) —— */
function FavouritePieces() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await Promise.all(
          FAVOURITE_IDS.map((id) =>
            axios
              .get(`${API_BASE}/images/${id}`)
              .then((r) => r.data)
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
    <Section tone="cream" id="featured-section">
      <FadeIn className="text-center max-w-2xl mx-auto">
        <p className="text-sage-600 text-xs uppercase tracking-[0.2em] mb-3">
          Curated selection
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold">My Favourite Pieces</h2>
        <span className="block w-16 h-[3px] bg-sage-400 rounded-full mt-4 mx-auto" />
        <p className="mt-5 text-ink-700/80 leading-relaxed">
          A small set of calming botanicals to anchor your space.
        </p>
      </FadeIn>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-white border border-sage-100"
              >
                <div className="aspect-[4/5] bg-cream-200 animate-pulse" />
                <div className="p-5">
                  <div className="h-5 w-1/2 bg-cream-200 rounded animate-pulse" />
                  <div className="mt-3 h-4 w-24 bg-cream-200 rounded animate-pulse" />
                </div>
              </div>
            ))
          : items.map((art, idx) => (
              <FadeIn key={art._id} delay={idx * 0.1}>
                <Link
                  to={`/artwork/${art._id}`}
                  className="group block rounded-2xl overflow-hidden bg-white border border-sage-100 shadow-sm hover:shadow-lg transition"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-ink-900 line-clamp-1">
                        {art.title}
                      </h3>
                      {art.price != null && (
                        <p className="text-sm text-ink-700/70 mt-0.5">
                          From €{art.price}
                        </p>
                      )}
                    </div>
                    <span className="text-sage-600 group-hover:translate-x-0.5 transition inline-flex items-center gap-1.5 text-sm font-medium">
                      View <i className="fa-solid fa-arrow-right text-xs" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
      </div>

      <div className="mt-12 text-center">
        <Button to="/photography" variant="secondary" size="md">
          Browse all collections <i className="fa-solid fa-arrow-right text-sm" />
        </Button>
      </div>
    </Section>
  );
}

/** —— BENEFITS STRIP —— */
function BenefitsStrip() {
  const items = [
    {
      icon: "fa-solid fa-leaf",
      title: "Eco-minded",
      text: "Thoughtful materials and sustainable packaging where possible.",
    },
    {
      icon: "fa-solid fa-award",
      title: "Gallery quality",
      text: "Printed with archival inks on premium stock.",
    },
    {
      icon: "fa-solid fa-truck",
      title: "Free shipping",
      text: "Complimentary shipping on unframed prints.",
    },
  ];
  return (
    <Section tone="white" spacing="tight">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {items.map((it, idx) => (
          <FadeIn
            key={idx}
            delay={idx * 0.08}
            className="bg-cream-50 rounded-2xl p-6 border border-sage-100 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-100">
              <i className={`${it.icon} text-lg text-sage-700`} />
            </div>
            <h3 className="mt-4 font-semibold text-lg text-ink-900">{it.title}</h3>
            <p className="mt-1 text-ink-700/80 text-sm leading-relaxed">{it.text}</p>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/** —— SOCIAL TWO-UP —— */
function SocialTwoUp() {
  const IG_URL = "https://www.instagram.com/mysecretsofflowers/";
  const FB_PAGE_URL = "https://www.facebook.com/maireadssecretsofflowers/photos_by";

  return (
    <Section tone="cream">
      <FadeIn className="text-center max-w-2xl mx-auto">
        <p className="text-sage-600 text-xs uppercase tracking-[0.2em] mb-3">
          Stay in the loop
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold">Follow the journey</h2>
        <span className="block w-16 h-[3px] bg-sage-400 rounded-full mt-4 mx-auto" />
      </FadeIn>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn>
          <a
            href={IG_URL}
            target="_blank"
            rel="noreferrer"
            className="group block bg-white rounded-2xl border border-sage-100 p-8 text-center hover:shadow-lg transition h-full"
          >
            <div className="inline-flex w-16 h-16 mx-auto rounded-full bg-sage-100 items-center justify-center">
              <i className="fa-brands fa-instagram text-3xl text-sage-700" />
            </div>
            <h3 className="mt-5 text-2xl font-semibold text-ink-900">Instagram</h3>
            <p className="mt-2 text-ink-700/80 leading-relaxed">
              Follow along for behind-the-scenes glimpses and the latest floral
              photography.
            </p>
            <span className="mt-6 inline-flex items-center justify-center gap-2 text-sage-700 font-semibold group-hover:gap-3 transition-all">
              Visit Instagram <i className="fa-solid fa-arrow-right text-sm" />
            </span>
          </a>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl border border-sage-100 p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-2xl font-semibold text-ink-900">Facebook</h3>
                <p className="text-sm text-ink-700/70 mt-0.5">Live page timeline.</p>
              </div>
              <a
                href={FB_PAGE_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-2 text-sage-700 hover:text-sage-600 font-semibold text-sm"
              >
                See more <i className="fa-solid fa-arrow-right text-xs" />
              </a>
            </div>

            <div className="rounded-xl overflow-hidden border border-sage-100 bg-cream-50">
              <iframe
                title="Facebook Page"
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                  FB_PAGE_URL
                )}&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                width="100%"
                height="320"
                style={{ border: "none", overflow: "hidden" }}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>

            <div className="md:hidden text-center mt-5">
              <a
                href={FB_PAGE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sage-700 font-semibold"
              >
                See more <i className="fa-solid fa-arrow-right text-sm" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO />

      {/* —— HERO —— */}
      <div
        className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <Container className="relative z-10 text-center">
          <p className="text-cream-100/90 text-xs md:text-sm uppercase tracking-[0.3em] mb-6">
            Botanical photography &amp; fine-art prints
          </p>
          <h1 className="font-Italianno text-7xl md:text-[10rem] leading-none text-cream-50 drop-shadow-md">
            Secrets of Flowers
          </h1>
          <p className="mt-6 text-base md:text-xl font-quicksand text-cream-100/95 max-w-2xl mx-auto leading-relaxed">
            Highlighting how much beauty is all around us in the natural world.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button to="/photography" variant="primary" size="lg">
              View My Photography
            </Button>
            <Button to="/about" variant="white" size="lg">
              Meet Mairead
            </Button>
          </div>
        </Container>

        <a
          href="#featured-section"
          aria-label="Scroll to featured pieces"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 inline-flex items-center justify-center w-11 h-11 bg-white/90 hover:bg-white text-sage-800 rounded-full shadow-lg transition"
        >
          <i className="fa-solid fa-arrow-down" />
        </a>
      </div>

      <FavouritePieces />
      <BenefitsStrip />
      <SocialTwoUp />
    </>
  );
}
