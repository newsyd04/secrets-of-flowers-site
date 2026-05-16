import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Button from "./Button";
import { API_BASE } from "../config/api";

const DAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DEFAULT_SLOT = { time: "10:00 AM", enabled: true };

function authHeaders() {
  return { Authorization: localStorage.getItem("token") };
}

function emptySlots(timeSlots, open = true) {
  return Object.fromEntries(
    timeSlots.map((slot) => [slot.time, { open, capacity: "" }])
  );
}

function withoutSlot(slots, time) {
  return Object.fromEntries(
    Object.entries(slots || {}).filter(([slotTime]) => slotTime !== time)
  );
}

function normalizeSettings(data) {
  const timeSlots = data?.timeSlots?.length ? data.timeSlots : [DEFAULT_SLOT];
  return {
    defaultCapacity: data?.defaultCapacity || 1,
    timeSlots: timeSlots.map((slot) => ({
      time: slot.time,
      enabled: slot.enabled !== false,
      capacity: slot.capacity || "",
    })),
    weeklyRules: DAY_LABELS.map((label, day) => {
      const existing = data?.weeklyRules?.find((rule) => rule.day === day) || {};
      return {
        day,
        label,
        open: existing.open !== false,
        slots: { ...emptySlots(timeSlots), ...(existing.slots || {}) },
      };
    }),
    dateExceptions: (data?.dateExceptions || []).map((ex) => ({
      date: ex.date,
      open: ex.open !== false,
      note: ex.note || "",
      capacity: ex.capacity || "",
      slots: { ...emptySlots(timeSlots, ex.open !== false), ...(ex.slots || {}) },
    })),
  };
}

function slotStatusClass(status) {
  if (status === "cancelled") return "bg-ink-700/10 text-ink-700";
  return "bg-sage-100 text-sage-800";
}

function formatBookingDate(dateString) {
  const parsed = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateString;
  return parsed.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function mailtoHref(booking, mode = "confirmation") {
  const name = booking.name || "there";
  const date = formatBookingDate(booking.date);
  const people = booking.partySize || 1;
  const subject =
    mode === "cancelled"
      ? "Your Secrets of Flowers booking"
      : "Your Secrets of Flowers booking is confirmed";
  const body =
    mode === "cancelled"
      ? `Hi ${name},

I'm getting in touch about your Secrets of Flowers photography walk booking for ${date} at ${booking.time}.

Booking details:
Name: ${booking.name || "Guest"}
Date: ${date}
Time: ${booking.time}
People: ${people}

This booking has been cancelled. If you would like to arrange another time, please reply to this email and I will help.

Warm wishes,
Mairead
Secrets of Flowers`
      : `Hi ${name},

Thank you for booking a Secrets of Flowers photography walk. Your booking is confirmed.

Booking details:
Name: ${booking.name || "Guest"}
Date: ${date}
Time: ${booking.time}
People: ${people}

I will be in touch before the day if any meeting point or weather details need to be confirmed.

Warm wishes,
Mairead
Secrets of Flowers`;

  return `mailto:${booking.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export default function AdminBookingPanel() {
  const [bookings, setBookings] = useState([]);
  const [settings, setSettings] = useState(null);
  const [newTime, setNewTime] = useState("");
  const [saving, setSaving] = useState(false);
  const [bulkCancelling, setBulkCancelling] = useState(false);
  const [loading, setLoading] = useState(true);

  const upcomingBookings = useMemo(
    () =>
      bookings
        .filter((booking) => booking.status !== "cancelled")
        .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)),
    [bookings]
  );

  const cancelledBookings = useMemo(
    () => bookings.filter((booking) => booking.status === "cancelled"),
    [bookings]
  );

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [bookingRes, settingsRes] = await Promise.all([
        axios.get(`${API_BASE}/bookings`, { headers: authHeaders() }),
        axios.get(`${API_BASE}/booking-settings`, { headers: authHeaders() }),
      ]);
      setBookings(bookingRes.data || []);
      setSettings(normalizeSettings(settingsRes.data));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData().catch((error) => {
      console.error("Booking admin load failed:", error);
      setLoading(false);
    });
  }, []);

  const updateSettings = (updater) => {
    setSettings((current) => normalizeSettings(updater(current)));
  };

  const addTimeSlot = () => {
    const time = newTime.trim();
    if (!time) return;
    if (settings.timeSlots.some((slot) => slot.time === time)) return;
    updateSettings((current) => ({
      ...current,
      timeSlots: [...current.timeSlots, { time, enabled: true, capacity: "" }],
    }));
    setNewTime("");
  };

  const removeTimeSlot = (time) => {
    if (settings.timeSlots.length <= 1) {
      alert("At least one time slot is required.");
      return;
    }
    updateSettings((current) => ({
      ...current,
      timeSlots: current.timeSlots.filter((slot) => slot.time !== time),
      weeklyRules: current.weeklyRules.map((rule) => ({
        ...rule,
        slots: withoutSlot(rule.slots, time),
      })),
      dateExceptions: current.dateExceptions.map((ex) => ({
        ...ex,
        slots: withoutSlot(ex.slots, time),
      })),
    }));
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const res = await axios.put(`${API_BASE}/booking-settings`, settings, {
        headers: authHeaders(),
      });
      setSettings(normalizeSettings(res.data));
      alert("Booking settings saved.");
    } catch (error) {
      console.error("Booking settings save failed:", error);
      alert(error?.response?.data?.message || "Could not save booking settings.");
    } finally {
      setSaving(false);
    }
  };

  const cancelBooking = async (booking) => {
    if (!window.confirm(`Cancel booking for ${booking.name || booking.email}?`)) return;
    try {
      await axios.delete(`${API_BASE}/bookings/${booking._id}`, {
        headers: authHeaders(),
      });
      await fetchAdminData();
    } catch (error) {
      console.error("Cancel booking failed:", error);
      alert("Could not cancel booking.");
    }
  };

  const cancelUpcomingBookings = async () => {
    if (upcomingBookings.length === 0) return;
    const message = `Cancel all ${upcomingBookings.length} upcoming booking${
      upcomingBookings.length === 1 ? "" : "s"
    }? This frees those places and sends cancellation emails where possible.`;
    if (!window.confirm(message)) return;

    setBulkCancelling(true);
    try {
      const res = await axios.delete(`${API_BASE}/bookings/upcoming`, {
        headers: authHeaders(),
      });
      const failed = res.data?.failedEmailCount || 0;
      await fetchAdminData();
      alert(
        `Cancelled ${res.data?.cancelledCount || 0} upcoming booking${
          res.data?.cancelledCount === 1 ? "" : "s"
        }.${failed ? ` ${failed} cancellation email${failed === 1 ? "" : "s"} failed.` : ""}`
      );
    } catch (error) {
      console.error("Bulk cancel bookings failed:", error);
      alert("Could not cancel upcoming bookings.");
    } finally {
      setBulkCancelling(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="bg-white rounded-2xl border border-sage-100 p-8 text-ink-700/70">
        Loading booking controls...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white rounded-2xl border border-sage-100 shadow-sm p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-ink-900">Upcoming bookings</h2>
              <p className="mt-1 text-sm text-ink-700/70">
                Cancel a booking to free places and send a cancellation email.
              </p>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={fetchAdminData}>
                Refresh
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={cancelUpcomingBookings}
                disabled={bulkCancelling || upcomingBookings.length === 0}
              >
                {bulkCancelling ? "Cancelling..." : "Cancel all upcoming"}
              </Button>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {upcomingBookings.length === 0 ? (
              <p className="text-sm text-ink-700/60">No upcoming bookings.</p>
            ) : (
              upcomingBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-xl border border-sage-100 bg-cream-50 p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <div className="font-semibold text-ink-900">
                        {booking.name || "Guest"} · {booking.date} at {booking.time}
                      </div>
                      <div className="mt-1 text-sm text-ink-700/70">
                        {booking.email} · {booking.partySize || 1} people
                      </div>
                      <span
                        className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${slotStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status || "confirmed"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <a
                        href={mailtoHref(booking)}
                        className="inline-flex items-center justify-center rounded-full border border-sage-200 px-4 py-2 text-sm font-semibold text-sage-700 hover:bg-sage-50 transition"
                      >
                        Email customer
                      </a>
                      <button
                        type="button"
                        onClick={() => cancelBooking(booking)}
                        className="inline-flex items-center justify-center rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-sage-100 shadow-sm p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-ink-900">Booking capacity</h2>
              <p className="mt-1 text-sm text-ink-700/70">
                Default places apply unless a time or exception overrides them.
              </p>
            </div>
            <Button type="button" variant="primary" size="sm" onClick={saveSettings} disabled={saving}>
              {saving ? "Saving..." : "Save booking settings"}
            </Button>
          </div>

          <label className="mt-6 block">
            <span className="text-sm font-medium text-ink-700">Default places per slot</span>
            <input
              type="number"
              min="1"
              value={settings.defaultCapacity}
              onChange={(e) =>
                updateSettings((current) => ({
                  ...current,
                  defaultCapacity: e.target.value,
                }))
              }
              className="mt-2 w-full rounded-lg border border-sage-200 bg-cream-50 px-4 py-3 text-ink-900 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500"
            />
          </label>

          <div className="mt-6">
            <h3 className="font-semibold text-ink-900">Time slots</h3>
            <div className="mt-3 space-y-2">
              {settings.timeSlots.map((slot, index) => (
                <div
                  key={slot.time}
                  className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] gap-2 rounded-xl border border-sage-100 bg-cream-50 p-3"
                >
                  <input
                    type="text"
                    value={slot.time}
                    onChange={(e) =>
                      updateSettings((current) => {
                        const previous = current.timeSlots[index].time;
                        const nextTime = e.target.value;
                        return {
                          ...current,
                          timeSlots: current.timeSlots.map((item, i) =>
                            i === index ? { ...item, time: nextTime } : item
                          ),
                          weeklyRules: current.weeklyRules.map((rule) => {
                            const nextSlots = { ...rule.slots };
                            nextSlots[nextTime] = nextSlots[previous] || {
                              open: true,
                              capacity: "",
                            };
                            delete nextSlots[previous];
                            return { ...rule, slots: nextSlots };
                          }),
                          dateExceptions: current.dateExceptions.map((ex) => {
                            const nextSlots = { ...ex.slots };
                            nextSlots[nextTime] = nextSlots[previous] || {
                              open: true,
                              capacity: "",
                            };
                            delete nextSlots[previous];
                            return { ...ex, slots: nextSlots };
                          }),
                        };
                      })
                    }
                    className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Capacity"
                    value={slot.capacity || ""}
                    onChange={(e) =>
                      updateSettings((current) => ({
                        ...current,
                        timeSlots: current.timeSlots.map((item, i) =>
                          i === index ? { ...item, capacity: e.target.value } : item
                        ),
                      }))
                    }
                    className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm sm:w-28"
                  />
                  <label className="inline-flex items-center gap-2 text-sm text-ink-700">
                    <input
                      type="checkbox"
                      checked={slot.enabled}
                      onChange={(e) =>
                        updateSettings((current) => ({
                          ...current,
                          timeSlots: current.timeSlots.map((item, i) =>
                            i === index ? { ...item, enabled: e.target.checked } : item
                          ),
                        }))
                      }
                    />
                    Enabled
                  </label>
                  <button
                    type="button"
                    onClick={() => removeTimeSlot(slot.time)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={newTime}
                placeholder="4:00 PM"
                onChange={(e) => setNewTime(e.target.value)}
                className="flex-1 rounded-lg border border-sage-200 bg-cream-50 px-4 py-2 text-sm"
              />
              <Button type="button" variant="secondary" size="sm" onClick={addTimeSlot}>
                Add time
              </Button>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-white rounded-2xl border border-sage-100 shadow-sm p-8">
        <h2 className="text-xl font-semibold text-ink-900">Weekly availability</h2>
        <p className="mt-1 text-sm text-ink-700/70">
          Close normal days or individual times as a permanent rule.
        </p>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {settings.weeklyRules.map((rule, ruleIndex) => (
            <div key={rule.day} className="rounded-xl border border-sage-100 bg-cream-50 p-4">
              <label className="flex items-center justify-between gap-3">
                <span className="font-semibold text-ink-900">{rule.label}</span>
                <span className="inline-flex items-center gap-2 text-sm text-ink-700">
                  <input
                    type="checkbox"
                    checked={rule.open}
                    onChange={(e) =>
                      updateSettings((current) => ({
                        ...current,
                        weeklyRules: current.weeklyRules.map((item, i) =>
                          i === ruleIndex ? { ...item, open: e.target.checked } : item
                        ),
                      }))
                    }
                  />
                  Open
                </span>
              </label>
              <div className="mt-3 space-y-2">
                {settings.timeSlots.map((slot) => {
                  const config = rule.slots?.[slot.time] || { open: true, capacity: "" };
                  return (
                    <div
                      key={slot.time}
                      className="grid grid-cols-[1fr_auto_auto] gap-2 items-center text-sm"
                    >
                      <span>{slot.time}</span>
                      <label className="inline-flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={config.open !== false}
                          onChange={(e) =>
                            updateSettings((current) => ({
                              ...current,
                              weeklyRules: current.weeklyRules.map((item, i) =>
                                i === ruleIndex
                                  ? {
                                      ...item,
                                      slots: {
                                        ...item.slots,
                                        [slot.time]: {
                                          ...config,
                                          open: e.target.checked,
                                        },
                                      },
                                    }
                                  : item
                              ),
                            }))
                          }
                        />
                        Open
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="Cap"
                        value={config.capacity || ""}
                        onChange={(e) =>
                          updateSettings((current) => ({
                            ...current,
                            weeklyRules: current.weeklyRules.map((item, i) =>
                              i === ruleIndex
                                ? {
                                    ...item,
                                    slots: {
                                      ...item.slots,
                                      [slot.time]: { ...config, capacity: e.target.value },
                                    },
                                  }
                                : item
                            ),
                          }))
                        }
                        className="w-20 rounded-lg border border-sage-200 bg-white px-2 py-1"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-sage-100 shadow-sm p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-ink-900">Date exceptions</h2>
            <p className="mt-1 text-sm text-ink-700/70">
              Override one-off days for holidays, weekends away, or extra availability.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
                    onClick={() =>
                      updateSettings((current) => ({
                        ...current,
                        dateExceptions: [
                          ...current.dateExceptions,
                          {
                            date: new Date().toISOString().slice(0, 10),
                            open: false,
                            note: "",
                            capacity: "",
                            slots: emptySlots(current.timeSlots, false),
                          },
                        ],
                      }))
            }
          >
            Add exception
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {settings.dateExceptions.length === 0 ? (
            <p className="text-sm text-ink-700/60">No date exceptions yet.</p>
          ) : (
            settings.dateExceptions.map((ex, exIndex) => (
              <div key={`${ex.date}-${exIndex}`} className="rounded-xl border border-sage-100 bg-cream-50 p-4">
                <div className="grid grid-cols-1 md:grid-cols-[auto_auto_auto_1fr_auto] gap-3">
                  <input
                    type="date"
                    value={ex.date}
                    onChange={(e) =>
                      updateSettings((current) => ({
                        ...current,
                        dateExceptions: current.dateExceptions.map((item, i) =>
                          i === exIndex ? { ...item, date: e.target.value } : item
                        ),
                      }))
                    }
                    className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm"
                  />
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={ex.open}
                      onChange={(e) =>
                      updateSettings((current) => ({
                        ...current,
                        dateExceptions: current.dateExceptions.map((item, i) =>
                          i === exIndex
                            ? {
                                ...item,
                                open: e.target.checked,
                                slots: emptySlots(current.timeSlots, e.target.checked),
                              }
                            : item
                        ),
                      }))
                      }
                    />
                    Open
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Capacity"
                    value={ex.capacity || ""}
                    onChange={(e) =>
                      updateSettings((current) => ({
                        ...current,
                        dateExceptions: current.dateExceptions.map((item, i) =>
                          i === exIndex ? { ...item, capacity: e.target.value } : item
                        ),
                      }))
                    }
                    className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Optional note"
                    value={ex.note}
                    onChange={(e) =>
                      updateSettings((current) => ({
                        ...current,
                        dateExceptions: current.dateExceptions.map((item, i) =>
                          i === exIndex ? { ...item, note: e.target.value } : item
                        ),
                      }))
                    }
                    className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateSettings((current) => ({
                        ...current,
                        dateExceptions: current.dateExceptions.filter((_, i) => i !== exIndex),
                      }))
                    }
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {settings.timeSlots.map((slot) => {
                    const config = ex.slots?.[slot.time] || { open: true, capacity: "" };
                    return (
                      <div key={slot.time} className="rounded-lg border border-sage-100 bg-white p-3">
                        <div className="font-medium text-sm text-ink-900">{slot.time}</div>
                        <label className="mt-2 inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={config.open !== false}
                            onChange={(e) =>
                              updateSettings((current) => ({
                                ...current,
                                dateExceptions: current.dateExceptions.map((item, i) =>
                                  i === exIndex
                                    ? {
                                        ...item,
                                        slots: {
                                          ...item.slots,
                                          [slot.time]: {
                                            ...config,
                                            open: e.target.checked,
                                          },
                                        },
                                      }
                                    : item
                                ),
                              }))
                            }
                          />
                          Open
                        </label>
                        <input
                          type="number"
                          min="1"
                          placeholder="Capacity"
                          value={config.capacity || ""}
                          onChange={(e) =>
                            updateSettings((current) => ({
                              ...current,
                              dateExceptions: current.dateExceptions.map((item, i) =>
                                i === exIndex
                                  ? {
                                      ...item,
                                      slots: {
                                        ...item.slots,
                                        [slot.time]: {
                                          ...config,
                                          capacity: e.target.value,
                                        },
                                      },
                                    }
                                  : item
                              ),
                            }))
                          }
                          className="mt-2 w-full rounded-lg border border-sage-200 bg-cream-50 px-3 py-2 text-sm"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {cancelledBookings.length > 0 && (
        <section className="bg-white rounded-2xl border border-sage-100 shadow-sm p-8">
          <h2 className="text-xl font-semibold text-ink-900">Cancelled bookings</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {cancelledBookings.map((booking) => (
              <div key={booking._id} className="rounded-xl border border-sage-100 bg-cream-50 p-4 text-sm">
                <div className="font-semibold text-ink-900">
                  {booking.name || "Guest"} · {booking.date} at {booking.time}
                </div>
                <div className="text-ink-700/70">{booking.email}</div>
                <a
                  href={mailtoHref(booking, "cancelled")}
                  className="mt-3 inline-flex items-center justify-center rounded-full border border-sage-200 px-3 py-1.5 text-xs font-semibold text-sage-700 hover:bg-sage-50 transition"
                >
                  Email customer
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
