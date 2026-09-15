import { useState, useEffect } from "react";
import { getAvailability } from "../api/client.js";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function formatTime(t) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

export default function BookingPage({ onSlotChosen }) {
  const [date, setDate] = useState(todayISO());
  const [partySize, setPartySize] = useState(2);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getAvailability(date, partySize)
      .then((data) => {
        if (!cancelled) setSlots(data.slots);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [date, partySize]);

  return (
    <section className="section">
    <div className="section-inner section-inner--narrow">
      <p className="step-label">Step 1 of 2</p>
      <h1 className="headline">Reserve a table.</h1>
      <p className="lede">
        Pick a date and party size to see what's open — every time slot shown
        is confirmed availability, not a request.
      </p>

      {error && <div className="error-banner">{error}</div>}

      <div className="field-row">
        <div className="field">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            min={todayISO()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="partySize">Party size</label>
          <select
            id="partySize"
            value={partySize}
            onChange={(e) => setPartySize(Number(e.target.value))}
          >
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="loading-note">Checking availability…</p>}

      {!loading && !error && slots.length === 0 && (
        <p className="empty-note">
          No tables available for that date and party size. Try a different
          date or a smaller party.
        </p>
      )}

      {!loading && slots.length > 0 && (
        <div className="slot-grid">
          {slots.map((time) => (
            <button
              key={time}
              className="slot-btn"
              onClick={() => onSlotChosen({ date, time, partySize })}
            >
              {formatTime(time)}
            </button>
          ))}
        </div>
      )}
    </div>
    </section>
  );
}
