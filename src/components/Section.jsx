import React from "react";
import Container from "./Container";

const TONES = {
  cream: "bg-cream-50",
  white: "bg-white",
  sage: "bg-sage-500 text-white",
  "sage-soft": "bg-sage-100",
};

export default function Section({
  tone = "cream",
  contained = true,
  spacing = "default",
  className = "",
  innerClassName = "",
  children,
}) {
  const toneClass = TONES[tone] ?? TONES.cream;
  const spacingClass =
    spacing === "tight"
      ? "py-12 md:py-16"
      : spacing === "loose"
      ? "py-section-y-lg md:py-section-y-lg"
      : "py-section-y md:py-section-y-lg";

  return (
    <section className={`${toneClass} ${spacingClass} ${className}`}>
      {contained ? (
        <Container className={innerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
