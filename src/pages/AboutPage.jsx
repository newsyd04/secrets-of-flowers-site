"use client";
import React, { useEffect } from "react";
import mairead1 from "../assets/mairead1.jpg";
import mairead3 from "../assets/mairead3.jpg";
import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import Button from "../components/Button";
import FadeIn from "../components/FadeIn";
import SEO from "../components/SEO";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="About Mairead"
        description="A passionate photographer based in Tralee, Co. Kerry who finds inspiration in the delicate intricacies of flowers — capturing their hidden stories and fleeting beauty."
      />

      <PageHeader
        eyebrow="About"
        title="Meet Mairead"
        description={
          <>
            A passionate photographer who discovered her love for capturing the
            hidden beauty of nature a few years ago. Through my lens, I share the
            joy and secrets of flowers (<em>Rúin na mBláth</em>) along with a few
            tips and ideas to brighten your day.
          </>
        }
        image={mairead1}
        imageAlt="Mairead in the field"
      >
        <Button to="/photography" variant="white" size="md">
          Explore Photography
        </Button>
        <Button to="/contact" variant="ghost" size="md" className="text-white border-white/70 hover:bg-white/10">
          Say Hello
        </Button>
      </PageHeader>

      {/* Journey */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white border border-sage-100">
              <img
                src={mairead3}
                alt="Out exploring with the camera"
                loading="lazy"
                className="w-full h-[22rem] md:h-[26rem] object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="order-1 lg:order-2">
            <p className="text-sage-600 text-xs uppercase tracking-[0.2em] mb-3">
              The story
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold">My Journey</h2>
            <span className="block w-16 h-[3px] bg-sage-400 rounded-full mt-4" />
            <p className="mt-6 text-ink-700 leading-relaxed">
              Photography became my passion just a few years ago, opening up a
              world where light, colour, and nature's smallest details come to
              life. I find inspiration in the delicate intricacies of flowers,
              capturing their hidden stories and fleeting beauty.
            </p>
            <p className="mt-4 text-ink-700 leading-relaxed">
              My work is about sharing the emotions, colours, and secrets of the
              natural world. Whether it's the gentle curve of a petal or the
              dance of light on a dewdrop, each image tells a story worth
              remembering.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* Philosophy band */}
      <Section tone="sage">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            My Philosophy
          </h2>
          <span className="block w-16 h-[3px] bg-white/60 rounded-full mt-4 mx-auto" />
          <p className="mt-6 text-white/95 leading-relaxed text-lg">
            Photography is more than just taking pictures — it's about capturing
            the soul of the moment. I believe nature's beauty should be
            celebrated and shared, helping others see the world from a fresh
            perspective.
          </p>
          <p className="mt-4 text-white/90 leading-relaxed">
            Through my photography, I aim to inspire creativity, mindfulness,
            and a deeper connection with nature. Let's explore the world through
            the lens together.
          </p>
        </FadeIn>
      </Section>

      {/* CTA */}
      <Section tone="cream" spacing="tight">
        <FadeIn className="text-center max-w-2xl mx-auto">
          <p className="text-ink-700">
            Ready to bring a calm, botanical mood into your space?
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Button to="/photography" variant="primary" size="md">
              Browse Prints
            </Button>
            <Button to="/contact" variant="outline" size="md">
              Get in Touch
            </Button>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}
