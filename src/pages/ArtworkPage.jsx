import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import Container from "../components/Container";
import SEO from "../components/SEO";
import { API_BASE, IS_PAYPAL_CONFIGURED, PAYPAL_CLIENT_ID } from "../config/api";

const FRAME_SURCHARGE = 35;
const SIZE_UPCHARGE = { Small: 0, Medium: 10, Large: 45 };

const SIZE_META = {
  Small: { label: "Small", cm: [20.2, 20.2], in: [8, 8], mounted: true },
  Medium: { label: "Medium", cm: [25.3, 30.7], in: [10, 12], mounted: true },
  Large: { label: "Large", cm: [40.5, 50.7], in: [16, 20], mounted: true },
};

// The room preview uses one shared scale so the artwork and furniture stay
// proportional. The preview frame is 5:4, so 220cm tall maps to 275cm wide.
const ROOM_HEIGHT_CM = 220;
const ROOM_WIDTH_CM = 275;
const cmToHeightPct = (cm) => (cm / ROOM_HEIGHT_CM) * 100;
const cmToWidthPct = (cm) => (cm / ROOM_WIDTH_CM) * 100;

const ROOM_SCALE = {
  chair: { width: 88, height: 82, left: 18, bottom: 18 },
  sideTable: { width: 58, height: 98, right: 32, bottom: 18 },
  print: { centerLeft: 165, bottom: 125 },
};

const FRAME_STYLES = {
  black: {
    background: "linear-gradient(135deg, #171412, #312a25 52%, #0f0d0c)",
    boxShadow: "0 16px 30px rgba(15, 15, 15, 0.32)",
  },
  white: {
    background: "linear-gradient(135deg, #fffdf8, #ece5da 52%, #faf7f0)",
    boxShadow: "0 14px 26px rgba(92, 78, 60, 0.2)",
  },
  wood: {
    background: "linear-gradient(135deg, #6f4426, #a97843 45%, #4f301d)",
    boxShadow: "0 16px 30px rgba(74, 48, 28, 0.28)",
  },
  default: {
    background: "linear-gradient(135deg, #2b2520, #55483c 52%, #201b17)",
    boxShadow: "0 16px 30px rgba(15, 15, 15, 0.28)",
  },
};

function getFrameStyle(frame) {
  const name = String(frame || "").toLowerCase();
  if (name.includes("black")) return FRAME_STYLES.black;
  if (name.includes("white")) return FRAME_STYLES.white;
  if (name.includes("wood") || name.includes("oak")) return FRAME_STYLES.wood;
  return FRAME_STYLES.default;
}

/** PRINT ON WALL - physically-accurate scale preview with room context */
function PrintOnWall({ artwork, size, frame }) {
  const meta = SIZE_META[size];
  const printHeightPct = cmToHeightPct(meta.cm[1]);
  const aspectRatio = meta.cm[0] / meta.cm[1];
  const isFramed = frame !== "Unframed";
  const frameStyle = getFrameStyle(frame);

  return (
    <div className="rounded-2xl overflow-hidden border border-sage-100 bg-white">
      <div className="px-4 py-3 flex items-center justify-between border-b border-sage-100 bg-cream-50">
        <span className="text-xs uppercase tracking-[0.18em] text-sage-700 font-semibold">
          On the wall
        </span>
        <span className="text-xs text-ink-700/70">
          {meta.label} · {meta.in.join("×")}in total mounted
        </span>
      </div>

      <div className="relative w-full aspect-[5/4] overflow-hidden bg-gradient-to-b from-[#f3eadf] via-[#eee1d2] to-[#d7c4ad]">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_58%_45%_at_18%_0%,_rgba(255,249,235,0.82),_transparent_62%)]" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_58%,_rgba(62,47,33,0.12)_100%)]" />

        {/* Floor and skirting line */}
        <div className="absolute left-0 right-0 bottom-0 h-[25%] bg-gradient-to-b from-[#cdb89d] to-[#bca483]" />
        <div className="absolute left-0 right-0 bottom-[25%] h-px bg-[#9d8466]/55" />

        {/* Armchair */}
        <div
          className="absolute"
          style={{
            left: `${cmToWidthPct(ROOM_SCALE.chair.left)}%`,
            bottom: `${cmToHeightPct(ROOM_SCALE.chair.bottom)}%`,
            width: `${cmToWidthPct(ROOM_SCALE.chair.width)}%`,
            height: `${cmToHeightPct(ROOM_SCALE.chair.height)}%`,
          }}
        >
          <div className="absolute left-[10%] right-[10%] bottom-[21%] h-[66%] rounded-t-[34%] bg-sage-600 shadow-[0_18px_26px_rgba(65,70,45,0.24)]" />
          <div className="absolute left-[2%] bottom-[19%] w-[23%] h-[53%] rounded-t-full rounded-b-md bg-sage-700" />
          <div className="absolute right-[2%] bottom-[19%] w-[23%] h-[53%] rounded-t-full rounded-b-md bg-sage-700" />
          <div className="absolute left-[9%] right-[9%] bottom-[4%] h-[34%] rounded-xl bg-sage-800" />
          <div className="absolute left-[18%] bottom-0 w-[7%] h-[13%] bg-[#6d573f] rounded-b-sm" />
          <div className="absolute right-[18%] bottom-0 w-[7%] h-[13%] bg-[#6d573f] rounded-b-sm" />
        </div>

        {/* Side table with lamp and small decor */}
        <div
          className="absolute"
          style={{
            right: `${cmToWidthPct(ROOM_SCALE.sideTable.right)}%`,
            bottom: `${cmToHeightPct(ROOM_SCALE.sideTable.bottom)}%`,
            width: `${cmToWidthPct(ROOM_SCALE.sideTable.width)}%`,
            height: `${cmToHeightPct(ROOM_SCALE.sideTable.height)}%`,
          }}
        >
          <div className="absolute left-[22%] right-[22%] bottom-[14%] h-[45%] bg-[#775d42] rounded-sm shadow-[0_14px_20px_rgba(75,55,35,0.22)]" />
          <div className="absolute left-[8%] right-[8%] bottom-[55%] h-[8%] bg-[#8c6f4d] rounded-full" />
          <div className="absolute left-[48%] bottom-[63%] w-[4%] h-[27%] bg-[#5e4733]" />
          <div className="absolute left-[31%] right-[31%] bottom-[86%] h-[22%] bg-cream-100 rounded-t-full rounded-b-md shadow-[0_0_20px_rgba(255,243,214,0.62)]" />
          <div className="absolute left-[13%] bottom-[63%] w-[11%] h-[12%] bg-sage-700 rounded-b-full rounded-t-sm" />
          <div className="absolute left-[7%] bottom-[74%] w-[9%] h-[14%] bg-sage-600 rounded-full -rotate-12" />
          <div className="absolute left-[20%] bottom-[75%] w-[8%] h-[13%] bg-sage-500 rounded-full rotate-12" />
        </div>

        {/* The mounted print, anchored above the room setting, sized to scale */}
        <div
          className="absolute -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            left: `${cmToWidthPct(ROOM_SCALE.print.centerLeft)}%`,
            height: `${printHeightPct}%`,
            aspectRatio,
            bottom: `${cmToHeightPct(ROOM_SCALE.print.bottom)}%`,
          }}
        >
          <div className="relative w-full h-full transition-all duration-500">
            {isFramed ? (
              <div
                className="absolute -inset-[7%] ring-1 ring-black/10"
                style={frameStyle}
              />
            ) : null}
            <div className="absolute inset-0 bg-cream-50 p-[8%] shadow-[0_14px_30px_rgba(15,15,15,0.22)] ring-1 ring-cream-200">
              <img
                src={artwork.imageUrl}
                alt={`${artwork.title} preview at ${size}`}
                className="w-full h-full object-cover block"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Reference scale marker */}
        <div className="absolute right-3 top-3 text-[10px] text-ink-700/70 bg-white/85 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm">
          {meta.cm.join("×")} cm total mounted
        </div>
        <div className="absolute left-3 bottom-3 text-[10px] text-ink-700/65 bg-white/75 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm">
          Approx. room scale
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
    return `${m.label} · ${wIN}×${hIN}in / ${wCM}×${hCM}cm total mounted size`;
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
        description={`${artwork.title} - mounted fine-art botanical print by Mairead. Available in three total mounted sizes, framed or unframed, with secure checkout.`}
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
              Own a mounted botanical photograph printed with archival inks on
              premium stock.
            </p>

            {/* Size segmented control */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm uppercase tracking-[0.18em] text-sage-700 font-semibold">
                  Size
                </span>
                <span className="text-xs text-ink-700/70">
                  {SIZE_META[size]?.in.join("×")}in total mounted size
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
              <p className="mt-3 rounded-xl border border-sage-100 bg-white px-4 py-3 text-sm leading-relaxed text-ink-700/80">
                All photographs are supplied mounted with a white/cream
                surround. Dimensions shown are the total mounted size.
              </p>
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
                  <div className="text-xs text-ink-700/70 mt-0.5">
                    Mounted print, no frame
                  </div>
                </button>
                {frameOptions.map((f) => {
                  const active = frame === f;
                  const swatchStyle = getFrameStyle(f);
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
                      <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                        <span
                          className="h-4 w-4 rounded-full ring-1 ring-ink-900/10"
                          style={swatchStyle}
                          aria-hidden="true"
                        />
                        {f}
                      </div>
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
                {IS_PAYPAL_CONFIGURED ? (
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
                            "Please don't pay again - email mairead@secretsofflowers.com " +
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
                ) : (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800">
                    Checkout is temporarily unavailable. PayPal live payments need to be configured.
                  </div>
                )}
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
