import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_NAME = "Secrets of Flowers";
const DEFAULT_DESCRIPTION =
  "Botanical photography and fine-art prints by Mairead, based in Tralee, Co. Kerry. Browse curated collections, commission custom pieces, or book a guided photography walk.";
const DEFAULT_IMAGE = "/flower-logo.jpg";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = "website",
}) {
  const fullTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} — Botanical Photography & Fine-Art Prints`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
