import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import Button from "../components/Button";
import FadeIn from "../components/FadeIn";
import SEO from "../components/SEO";
import { API_BASE } from "../config/api";

const TIMES = ["10:00 AM", "12:00 PM", "2:00 PM"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toISODate(value) {
  const offsetDate = new Date(value.getTime() - value.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 10);
}

function normalizeUnavailableTimes(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.unavailableTimes)) return data.unavailableTimes;
  if (Array.isArray(data?.bookedTimes)) return data.bookedTimes;
  if (Array.isArray(data?.times)) return data.times;
  return [];
}

export default function BookingPage() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [availabilityEnabled, setAvailabilityEnabled] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let mounted = true;
    setTime("");
    setUnavailableTimes([]);
    setLoadingAvailability(true);

    axios
      .get(`${API_BASE}/availability`, { params: { date: toISODate(date) } })
      .then(({ data }) => {
        if (!mounted) return;
        setUnavailableTimes(normalizeUnavailableTimes(data));
        setAvailabilityEnabled(true);
      })
      .catch((error) => {
        if (!mounted) return;
        if (error?.response?.status === 404) {
          setAvailabilityEnabled(false);
        } else {
          console.error("Availability error:", error);
        }
      })
      .finally(() => {
        if (mounted) setLoadingAvailability(false);
      });

    return () => {
      mounted = false;
    };
  }, [date]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const cleanedEmail = email.trim();
    if (!time || !EMAIL_RE.test(cleanedEmail)) return;
    if (unavailableTimes.includes(time)) return;

    setSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE}/book`, {
        date: toISODate(date),
        time,
        email: cleanedEmail,
      });
      alert(res.data.message);
      setEmail("");
      setTime("");
    } catch (error) {
      console.error("Booking error:", error);
      const message =
        error?.response?.data?.message ||
        "Couldn't submit your booking — please try again.";
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  const niceDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen">
      <SEO
        title="Book a Photography Walk"
        description="Join Mairead for a guided 2-hour nature photography walk in Tralee and Co. Kerry. Beginner to advanced — bring any camera."
      />

      <PageHeader
        eyebrow="Photography walks"
        title="Book a Slot"
        description="Immerse yourself in the beauty of nature with guided photography walks. Whether you're a beginner or experienced, we'll spend the time learning to see — and capture — the small details."
      />

      <Section tone="cream">
        <FadeIn>
        <form
          onSubmit={handleBooking}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-2xl border border-sage-100 overflow-hidden shadow-sm"
        >
          {/* Info / context */}
          <div className="p-8 lg:p-10 bg-sage-50">
            <p className="text-sage-700 text-xs uppercase tracking-[0.2em] font-semibold">
              What to expect
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-ink-900">
              A morning, an afternoon, a slow walk through the wild.
            </h2>
            <p className="mt-5 text-ink-700 leading-relaxed">
              Learn how to capture stunning landscapes, intricate details of
              flowers, and the vibrant colours of the wild — at your pace, with
              guidance tailored to where you are with your camera.
            </p>

            <ul className="mt-6 space-y-3 text-ink-700">
              <li className="flex gap-3">
                <i className="fa-solid fa-check text-sage-600 mt-1" />
                <span>2-hour guided session</span>
              </li>
              <li className="flex gap-3">
                <i className="fa-solid fa-check text-sage-600 mt-1" />
                <span>Beginner to advanced — bring any camera</span>
              </li>
              <li className="flex gap-3">
                <i className="fa-solid fa-check text-sage-600 mt-1" />
                <span>Tralee &amp; surrounding Co. Kerry locations</span>
              </li>
            </ul>
          </div>

          {/* Booking form */}
          <div className="p-8 lg:p-10 flex flex-col">
            <div>
              <label className="block text-sm font-semibold text-sage-700 uppercase tracking-[0.18em] mb-3">
                Pick a date
              </label>
              <Calendar
                onChange={setDate}
                value={date}
                minDate={new Date()}
              />
              <p className="mt-3 text-sm text-ink-700/70">
                Selected: <span className="text-ink-900 font-medium">{niceDate}</span>
              </p>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-sage-700 uppercase tracking-[0.18em] mb-3">
                Choose a time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TIMES.map((t) => {
                  const active = time === t;
                  const unavailable = unavailableTimes.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => !unavailable && setTime(t)}
                      disabled={unavailable || loadingAvailability}
                      className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                        active
                          ? "border-sage-500 bg-sage-50 text-ink-900 ring-1 ring-sage-500"
                          : unavailable
                          ? "border-sage-100 bg-ink-700/5 text-ink-700/35 cursor-not-allowed"
                          : "border-sage-200 bg-white text-ink-700 hover:border-sage-400"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-sage-700 uppercase tracking-[0.18em] mb-3">
                Your email
              </label>
              <input
                type="email"
                required
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={email.length > 0 && !EMAIL_RE.test(email.trim())}
                className="w-full rounded-lg border border-sage-200 bg-cream-50 px-4 py-3 text-ink-900 placeholder:text-ink-700/40 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500"
              />
            </div>

            <div className="mt-7">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                disabled={
                  submitting ||
                  loadingAvailability ||
                  !time ||
                  !EMAIL_RE.test(email.trim())
                }
              >
                {submitting ? "Sending…" : "Confirm Booking"}
              </Button>
              <p className="mt-3 text-xs text-ink-700/60 text-center">
                {availabilityEnabled
                  ? "You'll receive a confirmation email after booking."
                  : "You'll receive a confirmation email after booking. Availability is confirmed by email."}
              </p>
            </div>
          </div>
        </form>
        </FadeIn>
      </Section>
    </div>
  );
}
