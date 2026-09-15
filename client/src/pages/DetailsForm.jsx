import { useState } from "react";
import { createReservation } from "../api/client.js";

function formatDate(d) {
  return new Date(`${d}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatTime(t) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

export default function DetailsForm({ slot, onBack, onConfirmed }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const reservation = await createReservation({
        date: slot.date,
        time: slot.time,
        partySize: slot.partySize,
        name,
        email,
        phone,
        notes,
      });
      onConfirmed(reservation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
    <div className="section-inner section-inner--narrow">
      <p className="step-label">Step 2 of 2</p>
      <h1 className="headline">Just a few details.</h1>
      <p className="lede">
        {formatDate(slot.date)} at {formatTime(slot.time)} · {slot.partySize}{" "}
        {slot.partySize === 1 ? "guest" : "guests"}
      </p>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="field-row">
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone (optional)</label>
            <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="notes">Special requests (optional)</label>
            <textarea
              id="notes"
              placeholder="Allergies, occasion, seating preference…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button type="button" className="btn-secondary" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Booking…" : "Confirm reservation"}
          </button>
        </div>
      </form>
    </div>
    </section>
  );
}
