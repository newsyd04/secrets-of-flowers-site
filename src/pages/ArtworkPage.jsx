"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function ArtworkPage() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [size, setSize] = useState("Small");
  const [frame, setFrame] = useState("Unframed");
  const [price, setPrice] = useState(0); // display-only; server recomputes
  const [loading, setLoading] = useState(true);
  const [frameOptions, setFrameOptions] = useState([]);

  // mirror server config for UI display only
  const frameSurcharge = 35;
  const sizeUpcharge = { Small: 0, Medium: 10, Large: 45 };

  // size specs for the photo overlay
  const sizeMeta = {
    Small: { label: "Small", cm: [20.2, 20.2], in: [8, 8], mounted: true },
    Medium: { label: "Medium", cm: [25.3, 30.7], in: [10, 12], mounted: false },
    Large: { label: "Large", cm: [40.5, 50.7], in: [16, 20], mounted: false },
  };

  useEffect(() => {
    axios
      .get(`https://webdev-backends.onrender.com/flowers/images/${id}`)
      .then((res) => {
        setArtwork(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    axios
      .get("https://webdev-backends.onrender.com/flowers/frames")
      .then((res) => {
        const available = Object.entries(res.data)
          .filter(([_, v]) => v)
          .map(([k]) => k);
        setFrameOptions(available);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // client-side total for display (server is source of truth)
  useEffect(() => {
    const base = Number(artwork?.price || 0);
    let p = base + (sizeUpcharge[size] || 0);
    if (frame !== "Unframed") p += frameSurcharge;
    setPrice(p);
  }, [artwork, size, frame]);

  const perSizePrices = useMemo(() => {
    const base = Number(artwork?.price || 0);
    return {
      Small: base + sizeUpcharge.Small,
      Medium: base + sizeUpcharge.Medium,
      Large: base + sizeUpcharge.Large,
    };
  }, [artwork]);

  const overlayText = useMemo(() => {
    const m = sizeMeta[size];
    if (!m) return "";
    const [wCM, hCM] = m.cm;
    const [wIN, hIN] = m.in;
    return `${m.label} (${wIN}×${hIN}in / ${wCM}×${hCM}cm)${m.mounted ? " • mounted" : ""}`;
  }, [size]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-lg text-gray-500">
        Loading...
      </div>
    );
  if (!artwork)
    return (
      <div className="flex h-screen items-center justify-center text-lg text-red-500">
        Artwork not found
      </div>
    );

  return (
    <div className="min-h-screen bg-[#4986a0] py-28 md:py-32 text-gray-900 flex items-center justify-center px-6 lg:px-12">
      <div className="max-w-5xl w-full bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row gap-8 md:gap-10">
        {/* Image + overlay — image scales, overlay stays put */}
        <div className="md:w-1/2">
          <div className="relative rounded-xl overflow-hidden shadow-md group">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full max-h-[520px] object-cover block transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
              <span className="pointer-events-auto inline-flex flex-wrap items-center gap-x-2 gap-y-1 bg-white/90 backdrop-blur-sm text-[13px] leading-tight text-gray-800 px-3 py-1 rounded-md shadow border border-gray-200 max-w-full break-words">
                {overlayText}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="md:w-1/2 flex flex-col text-left space-y-5">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
            {artwork.title}
          </h1>

          <div>
            <label className="block font-medium text-gray-700">Size</label>
            <select
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="Small">Small — €{perSizePrices.Small}</option>
              <option value="Medium">Medium — €{perSizePrices.Medium}</option>
              <option value="Large">Large — €{perSizePrices.Large}</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Framing</label>
            <select
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              value={frame}
              onChange={(e) => setFrame(e.target.value)}
            >
              <option value="Unframed">Unframed (Free Shipping)</option>
              {frameOptions.map((f) => (
                <option key={f} value={f}>
                  {f} (+€{frameSurcharge})
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-2xl font-semibold text-gray-900">Total: €{price}</p>
            <p className="text-gray-600 leading-relaxed mt-1">
              Own a piece of artistic elegance. Secure this exclusive artwork today.
            </p>
          </div>

          <div className="mt-2">
            <PayPalScriptProvider
              options={{
                "client-id": "LIVE-PAYPAL-CLIENT-ID", // ⬅️ replace with your LIVE client id
                currency: "EUR",
              }}
            >
              <PayPalButtons
                style={{ layout: "horizontal", color: "black", shape: "pill", label: "checkout" }}
                createOrder={async () => {
                  const response = await axios.post(
                    "https://webdev-backends.onrender.com/flowers/create-paypal-order",
                    { artworkId: artwork._id, size, frame }
                  );
                  return response.data.id;
                }}
                onApprove={async (data) => {
                  try {
                    // Capture on your server (and send emails)
                    const res = await axios.post(
                      "https://webdev-backends.onrender.com/flowers/capture-paypal-order",
                      { orderId: data.orderID, artworkId: artwork._id, size, frame }
                    );
                    const payerName =
                      res.data?.capture?.payer?.name?.given_name ||
                      res.data?.capture?.payment_source?.paypal?.name?.given_name ||
                      "there";
                    alert(`Thanks, ${payerName}! Your payment was captured.`);
                    // TODO: navigate to a Thank You page
                  } catch (e) {
                    console.error("Capture failed:", e);
                    alert("Payment capture failed. Your card has NOT been charged.");
                  }
                }}
                onError={(err) => {
                  console.error("PayPal onError:", err);
                  alert("Payment failed to initialize. Please try again.");
                }}
                onCancel={() => {
                  console.warn("PayPal popup closed by user");
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
