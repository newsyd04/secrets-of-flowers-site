"use client";
import React, { useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import Button from "../components/Button";
import SEO from "../components/SEO";

export default function NotFoundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="Page Not Found"
        description="That page seems to have wandered off into the wildflowers."
      />

      <PageHeader
        eyebrow="404"
        title="This page seems to have wandered off"
        description="Maybe it's out in the wildflowers. Let's get you back to somewhere blooming."
      >
        <Button to="/" variant="white" size="md">
          Back to Home
        </Button>
        <Button
          to="/photography"
          variant="ghost"
          size="md"
          className="text-white border-white/70 hover:bg-white/10"
        >
          Browse Photography
        </Button>
      </PageHeader>

      <Section tone="cream" spacing="tight">
        <p className="text-center text-ink-700/80">
          If you think this is a mistake, please{" "}
          <a
            href="mailto:mairead@secretsofflowers.com"
            className="text-sage-700 font-semibold hover:text-sage-600 underline underline-offset-4"
          >
            let me know
          </a>
          .
        </p>
      </Section>
    </div>
  );
}
