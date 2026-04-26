"use client";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams, Navigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import Button from "../components/Button";
import SEO from "../components/SEO";

const API_BASE = "https://webdev-backends.onrender.com/flowers";

export default function OrderSuccessPage() {
  const { state } = useLocation();
  const [search] = useSearchParams();
  const [order, setOrder] = useState(state || null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If we don't have order details from route state (e.g. user refreshed),
  // try to recover from the ?orderId= query param via the backend.
  useEffect(() => {
    if (order?.artworkTitle) return; // already have data
    const orderId = search.get("orderId");
    if (!orderId) {
      setNotFound(true);
      return;
    }
    setLoading(true);
    axios
      .get(`${API_BASE}/orders/${orderId}`)
      .then(({ data }) => {
        setOrder({
          payerName: data.buyerName || null,
          artworkTitle: data.artworkTitle,
          artworkImage: data.artworkImageUrl,
          size: data.size,
          frame: data.frame,
          total: data.total,
          orderId: data.orderId,
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [order, search]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center text-lg text-ink-700/70">
        Loading your order…
      </div>
    );
  }

  if (notFound || !order?.artworkTitle) {
    return <Navigate to="/" replace />;
  }

  const {
    payerName,
    artworkTitle,
    artworkImage,
    size,
    frame,
    total,
    orderId,
  } = order;

  return (
    <div className="min-h-screen">
      <SEO title="Thanks for your order" />

      <PageHeader
        eyebrow="Order confirmed"
        title={payerName ? `Thank you, ${payerName}` : "Thank you"}
        description="Your order has been received. A confirmation email is on its way, and your print will be carefully prepared and shipped soon."
      />

      <Section tone="cream">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-sage-100 shadow-sm overflow-hidden">
          {artworkImage && (
            <div className="aspect-[16/10] overflow-hidden bg-cream-100">
              <img
                src={artworkImage}
                alt={artworkTitle}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <p className="text-sage-600 text-xs uppercase tracking-[0.2em] font-semibold">
              Order summary
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink-900">
              {artworkTitle}
            </h2>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-sage-100 pb-3">
                <dt className="text-ink-700/80">Size</dt>
                <dd className="text-ink-900 font-medium">{size}</dd>
              </div>
              <div className="flex justify-between border-b border-sage-100 pb-3">
                <dt className="text-ink-700/80">Frame</dt>
                <dd className="text-ink-900 font-medium">{frame}</dd>
              </div>
              {orderId && (
                <div className="flex justify-between border-b border-sage-100 pb-3">
                  <dt className="text-ink-700/80">Reference</dt>
                  <dd className="text-ink-900 font-mono text-xs">{orderId}</dd>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2">
                <dt className="text-sm uppercase tracking-[0.18em] text-sage-700 font-semibold">
                  Total paid
                </dt>
                <dd className="text-2xl font-semibold text-ink-900">€{total}</dd>
              </div>
            </dl>

            <div className="mt-8 rounded-xl bg-sage-50 border border-sage-100 p-5 text-sm text-ink-700 leading-relaxed">
              <p className="font-semibold text-ink-900 mb-1">What happens next</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>You'll get a confirmation email with this summary.</li>
                <li>Your print is hand-prepared and packaged within a few days.</li>
                <li>Shipping is free on unframed prints.</li>
              </ol>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button to="/photography" variant="primary" size="md">
                Continue browsing
              </Button>
              <Button to="/" variant="outline" size="md">
                Back to home
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
