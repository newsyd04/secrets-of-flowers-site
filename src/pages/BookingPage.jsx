import { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import Button from "../components/Button";
import FadeIn from "../components/FadeIn";
import SEO from "../components/SEO";
import { API_BASE } from "../config/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toISODate(value) {
  const offsetDate = new Date(value.getTime() - value.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 10);
}

function toMonth(value) {
  return toISODate(value).slice(0, 7);
}

function statusLabel(status) {
  if (status === "closed") return "Closed";
  if (status === "full") return "Fully booked";
  if (status === "limited") return "Limited places";
  return "Available";
}

export default function BookingPage() {
  const [date, setDate] = useState(new Date());
  const [activeMonth, setActiveMonth] = useState(toMonth(new Date()));
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [partySize, setPartySize] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [availability, setAvailability] = useState(null);
  const [monthAvailability, setMonthAvailability] = useState({});
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${API_BASE}/availability/month`, { params: { month: activeMonth } })
      .then(({ data }) => {
        if (mounted) setMonthAvailability(data.days || {});
      })
      .catch((error) => console.error("Monthly availability error:", error));
    return () => {
      mounted = false;
    };
  }, [activeMonth]);

  useEffect(() => {
    let mounted = true;
    setTime("");
    setLoadingAvailability(true);

    axios
      .get(`${API_BASE}/availability`, { params: { date: toISODate(date) } })
      .then(({ data }) => {
        if (mounted) setAvailability(data);
      })
      .catch((error) => {
        if (!mounted) return;
        console.error("Availability error:", error);
        setAvailability(null);
      })
      .finally(() => {
        if (mounted) setLoadingAvailability(false);
      });

    return () => {
      mounted = false;
    };
  }, [date]);

  const selectedSlot = useMemo(
    () => availability?.slots?.find((slot) => slot.time === time) || null,
    [availability, time]
  );

  const canSubmit =
    name.trim() &&
    EMAIL_RE.test(email.trim()) &&
    selectedSlot?.open &&
    Number(partySize) >= 1 &&
    Number(partySize) <= selectedSlot.remaining &&
    !submitting;

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE}/book`, {
        date: toISODate(date),
        time,
        name: name.trim(),
        email: email.trim(),
        partySize: Number(partySize),
      });
      alert(res.data.message);
      setName("");
      setEmail("");
      setPartySize(1);
      setTime("");
      const refreshed = await axios.get(`${API_BASE}/availability`, {
        params: { date: toISODate(date) },
      });
      setAvailability(refreshed.data);
    } catch (error) {
      console.error("Booking error:", error);
      const message =
        error?.response?.data?.message ||
        "Couldn't submit your booking - please try again.";
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
        description="Join Mairead for a guided 2-hour nature photography walk in Tralee and Co. Kerry. Beginner to advanced - bring any camera."
      />

      <PageHeader
        eyebrow="Photography walks"
        title="Book a Slot"
        description="Immerse yourself in the beauty of nature with guided photography walks. Pick an available date, time, and number of places."
      />

      <Section tone="cream">
        <FadeIn>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-2xl border border-sage-100 overflow-hidden shadow-sm"
          >
            <div className="p-8 lg:p-10 bg-sage-50">
              <p className="text-sage-700 text-xs uppercase tracking-[0.2em] font-semibold">
                What to expect
              </p>
              <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-ink-900">
                A slow walk through the wild.
              </h2>
              <p className="mt-5 text-ink-700 leading-relaxed">
                Learn how to capture landscapes, flower details, and the colours
                of the wild at your pace, with guidance tailored to where you are
                with your camera.
              </p>

              <ul className="mt-6 space-y-3 text-ink-700">
                <li className="flex gap-3">
                  <i className="fa-solid fa-check text-sage-600 mt-1" />
                  <span>2-hour guided session</span>
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-check text-sage-600 mt-1" />
                  <span>Beginner to advanced - bring any camera</span>
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-check text-sage-600 mt-1" />
                  <span>Tralee and surrounding Co. Kerry locations</span>
                </li>
              </ul>
            </div>

            <div className="p-8 lg:p-10 flex flex-col">
              <div>
                <label className="block text-sm font-semibold text-sage-700 uppercase tracking-[0.18em] mb-3">
                  Pick a date
                </label>
                <Calendar
                  onChange={setDate}
                  value={date}
                  minDate={new Date()}
                  onActiveStartDateChange={({ activeStartDate }) =>
                    setActiveMonth(toMonth(activeStartDate))
                  }
                  tileClassName={({ date: tileDate, view }) => {
                    if (view !== "month") return "";
                    const status = monthAvailability[toISODate(tileDate)]?.status;
                    if (!status) return "";
                    return `booking-day booking-day-${status}`;
                  }}
                  tileContent={({ date: tileDate, view }) => {
                    if (view !== "month") return null;
                    const status = monthAvailability[toISODate(tileDate)]?.status;
                    if (!status) return null;
                    return (
                      <span
                        aria-hidden
                        className={`mx-auto mt-1 block h-1.5 w-1.5 rounded-full ${
                          status === "open"
                            ? "bg-sage-500"
                            : status === "limited"
                            ? "bg-amber-500"
                            : "bg-ink-700/30"
                        }`}
                      />
                    );
                  }}
                />
                <p className="mt-3 text-sm text-ink-700/70">
                  Selected: <span className="text-ink-900 font-medium">{niceDate}</span>
                </p>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-sage-700 uppercase tracking-[0.18em] mb-3">
                  Choose a time
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(availability?.slots || []).map((slot) => {
                    const active = time === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => slot.open && setTime(slot.time)}
                        disabled={!slot.open || loadingAvailability}
                        className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                          active
                            ? "border-sage-500 bg-sage-50 text-ink-900 ring-1 ring-sage-500"
                            : !slot.open
                            ? "border-sage-100 bg-ink-700/5 text-ink-700/35 cursor-not-allowed"
                            : "border-sage-200 bg-white text-ink-700 hover:border-sage-400"
                        }`}
                      >
                        <span className="block">{slot.time}</span>
                        <span className="mt-1 block text-xs font-normal">
                          {slot.open
                            ? `${slot.remaining} place${slot.remaining === 1 ? "" : "s"} left`
                            : statusLabel(slot.status)}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {availability?.status === "closed" && (
                  <p className="mt-3 text-sm text-red-700">
                    This date is closed for bookings.
                  </p>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="block text-sm font-semibold text-sage-700 uppercase tracking-[0.18em] mb-3">
                    Your name
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    placeholder="Jane Doe"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-sage-200 bg-cream-50 px-4 py-3 text-ink-900 placeholder:text-ink-700/40 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500"
                  />
                </label>

                <label className="block">
                  <span className="block text-sm font-semibold text-sage-700 uppercase tracking-[0.18em] mb-3">
                    People
                  </span>
                  <input
                    type="number"
                    min="1"
                    max={selectedSlot?.remaining || 1}
                    required
                    value={partySize}
                    onChange={(e) => setPartySize(e.target.value)}
                    className="w-full rounded-lg border border-sage-200 bg-cream-50 px-4 py-3 text-ink-900 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500"
                  />
                </label>
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
                  disabled={!canSubmit}
                >
                  {submitting ? "Sending..." : "Confirm Booking"}
                </Button>
                <p className="mt-3 text-xs text-ink-700/60 text-center">
                  Your booking is confirmed immediately, and a confirmation email will be sent.
                </p>
              </div>
            </div>
          </form>
        </FadeIn>
      </Section>
    </div>
  );
}
