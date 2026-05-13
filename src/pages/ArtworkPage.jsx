import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import Container from "../components/Container";
import SEO from "../components/SEO";
import { API_BASE, PAYPAL_CLIENT_ID } from "../config/api";

const FRAME_SURCHARGE = 35;
const SIZE_UPCHARGE = { Small: 0, Medium: 10, Large: 45 };

const SIZE_META = {
  Small: { label: "Small", cm: [20.2, 20.2], in: [8, 8], mounted: true },
  Medium: { label: "Medium", cm: [25.3, 30.7], in: [10, 12], mounted: false },
  Large: { label: "Large", cm: [40.5, 50.7], in: [16, 20], mounted: false },
};

// Visual wall reference = the print-display zone above a piece of furniture.
// Most prints hang in this zone, so the scale here matches what a buyer
// will actually see in their room.
const WALL_HEIGHT_CM = 110;

/** —— PRINT ON WALL — physically-accurate scale preview, "lived-in" feel —— */
function PrintOnWall({ artwork, size, frame }) {
  const meta = SIZE_META[size];
  const printHeightPct = (meta.cm[1] / WALL_HEIGHT_CM) * 100;
  const aspectRatio = meta.cm[0] / meta.cm[1];
  const isFramed = frame !== "Unframed";

  return (
    <div className="rounded-2xl overflow-hidden border border-sage-100 bg-white">
      <div className="px-4 py-3 flex items-center justify-between border-b border-sage-100 bg-cream-50">
        <span className="text-xs uppercase tracking-[0.18em] text-sage-700 font-semibold">
          On the wall
        </span>
        <span className="text-xs text-ink-700/70">
          {meta.label} · {meta.in.join("×")}in
        </span>
      </div>

      <div className="relative w-full aspect-[5/4] overflow-hidden bg-gradient-to-b from-cream-100 via-cream-100 to-cream-200">
        {/* Soft warm window-light, top-left */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_45%_at_12%_-5%,_rgba(255,243,214,0.85),_transparent_60%)]" />

        {/* Subtle wall texture / vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_55%,_rgba(40,30,20,0.07)_100%)]" />

        {/* Furniture band at the bottom — sideboard / sofa back silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-[19%]">
          <div className="absolute inset-0 bg-gradient-to-t from-sage-700/55 via-sage-500/35 to-sage-300/0" />
          {/* Top edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-sage-700/40" />
          {/* Lamp silhouette, lower-left */}
          <div className="absolute bottom-0 left-[6%] w-[7%] h-[78%]">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[35%] h-[55%] bg-ink-900/45 rounded-sm" />
            <div className="absolute bottom-[55%] left-1/2 -translate-x-1/2 w-full h-[38%] bg-cream-100/85 rounded-t-md shadow-sm" />
          </div>
          {/* Plant / vase silhouette, lower-right */}
          <div className="absolute bottom-0 right-[7%] w-[8%] h-[70%]">
            <div className="absolute bottom-0 left-[20%] right-[20%] h-[40%] bg-ink-900/55 rounded-b-md" />
            <div className="absolute bottom-[35%] left-0 right-0 h-[80%] bg-sage-700/45 rounded-full" />
            <div className="absolute bottom-[55%] left-[15%] right-[15%] h-[55%] bg-sage-600/40 rounded-full" />
          </div>
        </div>

        {/* The print, anchored above the furniture, sized to scale */}
        <div
          className="absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            height: `${printHeightPct}%`,
            aspectRatio,
            bottom: "26%",
          }}
        >
          <div
            className={`relative w-full h-full transition-all duration-500 ${
              isFramed
                ? "p-[5%] bg-ink-900 shadow-[0_14px_30px_rgba(15,15,15,0.28)]"
                : "p-0 bg-white shadow-[0_10px_24px_rgba(15,15,15,0.18)] ring-1 ring-cream-200"
            }`}
          >
            <img
              src={artwork.imageUrl}
              alt={`${artwork.title} preview at ${size}`}
              className="w-full h-full object-cover block"
              draggable={false}
            />
          </div>
        </div>

        {/* Reference scale marker */}
        <div className="absolute right-3 top-3 text-[10px] text-ink-700/70 bg-white/85 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm">
          {meta.cm.join("×")} cm
        </div>
      </div>
    </div>
  );
}

export default function ArtworkPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [size, setSize] = useState("Small");
  const [frame, setFrame] = useState("Unframed");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [frameOptions, setFrameOptions] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/images/${id}`)
      .then((res) => {
        setArtwork(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/frames`)
      .then((res) => {
        const available = Object.entries(res.data)
          .filter(([, v]) => v)
          .map(([k]) => k);
        setFrameOptions(available);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const base = Number(artwork?.price || 0);
    let p = base + (SIZE_UPCHARGE[size] || 0);
    if (frame !== "Unframed") p += FRAME_SURCHARGE;
    setPrice(p);
  }, [artwork, size, frame]);

  const perSizePrices = useMemo(() => {
    const base = Number(artwork?.price || 0);
    return {
      Small: base + SIZE_UPCHARGE.Small,
      Medium: base + SIZE_UPCHARGE.Medium,
      Large: base + SIZE_UPCHARGE.Large,
    };
  }, [artwork]);

  const overlayText = useMemo(() => {
    const m = SIZE_META[size];
    if (!m) return "";
    const [wCM, hCM] = m.cm;
    const [wIN, hIN] = m.in;
    return `${m.label} · ${wIN}×${hIN}in / ${wCM}×${hCM}cm${m.mounted ? " · mounted" : ""}`;
  }, [size]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center text-lg text-ink-700/70">
        Loading…
      </div>
    );
  }
  if (!artwork) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center text-lg text-red-700">
        Artwork not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <SEO
        title={artwork.title}
        description={`${artwork.title} — fine-art botanical print by Mairead. Available in three sizes, framed or unframed, with secure checkout.`}
        image={artwork.imageUrl}
        type="product"
      />

      <Container className="pt-32 pb-16 md:pt-36 md:pb-24">
        {/* Breadcrumb */}
        <div className="text-sm text-ink-700/70 mb-6">
          <Link to="/photography" className="hover:text-sage-700 transition">
            Photography
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink-900">{artwork.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Image + size preview */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-white border border-sage-100 shadow-sm">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full max-h-[640px] object-cover block"
              />
              <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 bg-white/90 backdrop-blur-sm text-xs leading-tight text-ink-700 px-3 py-1.5 rounded-md border border-sage-100 shadow-sm">
                  {overlayText}
                </span>
              </div>
            </div>

            <PrintOnWall artwork={artwork} size={size} frame={frame} />
          </div>

          {/* Details + purchase */}
          <div className="lg:sticky lg:top-28 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-semibold text-ink-900 tracking-tight">
              {artwork.title}
            </h1>
            <p className="mt-2 text-ink-700/80 leading-relaxed">
              Own a piece of artistic elegance. Printed with archival inks on
              premium stock.
            </p>

            {/* Size segmented control */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm uppercase tracking-[0.18em] text-sage-700 font-semibold">
                  Size
                </span>
                <span className="text-xs text-ink-700/70">
                  {SIZE_META[size]?.in.join("×")}in
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(SIZE_META).map((s) => {
                  const active = size === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`rounded-xl border px-3 py-3 text-left transition ${
                        active
                          ? "border-sage-500 bg-sage-50 ring-1 ring-sage-500"
                          : "border-sage-200 bg-white hover:border-sage-400"
                      }`}
                    >
                      <div className="text-sm font-semibold text-ink-900">{s}</div>
                      <div className="text-xs text-ink-700/70 mt-0.5">
                        €{perSizePrices[s]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Framing */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm uppercase tracking-[0.18em] text-sage-700 font-semibold">
                  Framing
                </span>
                <span className="text-xs text-ink-700/70">
                  Frames add €{FRAME_SURCHARGE}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFrame("Unframed")}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    frame === "Unframed"
                      ? "border-sage-500 bg-sage-50 ring-1 ring-sage-500"
                      : "border-sage-200 bg-white hover:border-sage-400"
                  }`}
                >
                  <div className="text-sm font-semibold text-ink-900">Unframed</div>
                  <div className="text-xs text-ink-700/70 mt-0.5">Free shipping</div>
                </button>
                {frameOptions.map((f) => {
                  const active = frame === f;
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFrame(f)}
                      className={`rounded-xl border px-4 py-3 text-left transition ${
                        active
                          ? "border-sage-500 bg-sage-50 ring-1 ring-sage-500"
                          : "border-sage-200 bg-white hover:border-sage-400"
                      }`}
                    >
                      <div className="text-sm font-semibold text-ink-900">{f}</div>
                      <div className="text-xs text-ink-700/70 mt-0.5">
                        +€{FRAME_SURCHARGE}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary + checkout */}
            <div className="mt-8 rounded-2xl border border-sage-100 bg-white p-5">
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-700/80">Print</dt>
                  <dd className="text-ink-900 font-medium">{size}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-700/80">Frame</dt>
                  <dd className="text-ink-900 font-medium">{frame}</dd>
                </div>
              </dl>
              <div className="mt-4 pt-4 border-t border-sage-100 flex items-baseline justify-between">
                <span className="text-sm uppercase tracking-[0.18em] text-sage-700 font-semibold">
                  Total
                </span>
                <span className="text-3xl font-semibold text-ink-900">€{price}</span>
              </div>

              <div className="mt-5">
                <PayPalScriptProvider
                  options={{
                    "client-id": PAYPAL_CLIENT_ID,
                    currency: "EUR",
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "horizontal", color: "black", shape: "pill", label: "checkout" }}
                    createOrder={async () => {
                      const response = await axios.post(
                        `${API_BASE}/create-paypal-order`,
                        { artworkId: artwork._id, size, frame }
                      );
                      return response.data.id;
                    }}
                    onApprove={async (data) => {
                      try {
                        const res = await axios.post(
                          `${API_BASE}/capture-paypal-order`,
                          { orderId: data.orderID, artworkId: artwork._id, size, frame }
                        );
                        const payerName =
                          res.data?.capture?.payer?.name?.given_name ||
                          res.data?.capture?.payment_source?.paypal?.name?.given_name ||
                          null;
                        // Pass details via state for instant render, AND via
                        // ?orderId= so a refresh can recover from the backend.
                        navigate(`/order/success?orderId=${encodeURIComponent(data.orderID)}`, {
                          state: {
                            payerName,
                            artworkTitle: artwork.title,
                            artworkImage: artwork.imageUrl,
                            size,
                            frame,
                            total: price,
                            orderId: data.orderID,
                          },
                        });
                      } catch (e) {
                        console.error("Capture failed:", e);
                        // By the time onApprove fires, PayPal has already
                        // authorised the user. Whether the capture call
                        // actually moved money is unknown from the client,
                        // so we deliberately don't say "you weren't charged."
                        alert(
                          "We couldn't confirm your order on our end. " +
                          "Please don't pay again — email mairead@secretsofflowers.com " +
                          "with your PayPal order ID and we'll sort it out."
                        );
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

            <p className="mt-4 text-xs text-ink-700/60 text-center">
              Secure checkout powered by PayPal · Free shipping on unframed prints
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
