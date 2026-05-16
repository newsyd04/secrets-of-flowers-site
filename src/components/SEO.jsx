import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_NAME = "Secrets of Flowers";
const SITE_URL = "https://www.secretsofflowers.com";
const DEFAULT_DESCRIPTION =
  "Botanical photography and fine-art prints by Mairead, based in Tralee, Co. Kerry. Browse curated collections, commission custom pieces, or book a guided photography walk.";
const DEFAULT_IMAGE = "/flower-logo.jpg";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = "website",
}) {
  const location = useLocation();
  const fullTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} — Botanical Photography & Fine-Art Prints`;
  const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const canonicalUrl = `${SITE_URL}${location.pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
    </Helmet>
  );
}
