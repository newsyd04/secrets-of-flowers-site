import React from "react";
import Container from "./Container";

export default function PageHeader({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  align = "center",
  children,
}) {
  const isSplit = Boolean(image);

  return (
    <header className="relative bg-gradient-to-b from-sage-300 to-sage-400">
      <Container className="pt-36 pb-16 md:pb-20">
        {isSplit ? (
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div className={align === "left" ? "text-center md:text-left" : "text-center md:text-left"}>
              {eyebrow && (
                <p className="text-white/80 text-sm uppercase tracking-[0.18em] mb-3">
                  {eyebrow}
                </p>
              )}
              <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
                {title}
              </h1>
              <span className="block w-20 h-1 bg-white/60 rounded-full mt-5 mx-auto md:mx-0" />
              {description && (
                <p className="mt-5 text-white/95 leading-relaxed max-w-xl mx-auto md:mx-0">
                  {description}
                </p>
              )}
              {children && (
                <div className="mt-7 flex flex-wrap gap-3 justify-center md:justify-start">
                  {children}
                </div>
              )}
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="w-full h-[20rem] md:h-[26rem] object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        ) : (
          <div className="text-center max-w-3xl mx-auto">
            {eyebrow && (
              <p className="text-white/80 text-sm uppercase tracking-[0.18em] mb-3">
                {eyebrow}
              </p>
            )}
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
              {title}
            </h1>
            <span className="block w-20 h-1 bg-white/60 rounded-full mt-5 mx-auto" />
            {description && (
              <p className="mt-5 text-white/95 leading-relaxed">{description}</p>
            )}
            {children && <div className="mt-7 flex flex-wrap gap-3 justify-center">{children}</div>}
          </div>
        )}
      </Container>
    </header>
  );
}
