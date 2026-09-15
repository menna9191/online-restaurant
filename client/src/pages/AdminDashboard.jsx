import { useState, useEffect, useCallback } from "react";
import {
  getReservations,
  updateReservationStatus,
  getMessages,
} from "../api/client.js";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function formatTime(t) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

const STATUSES = ["confirmed", "seated", "completed", "cancelled", "no-show"];

function ReservationsTab({ token }) {
  const [date, setDate] = useState(todayISO());
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    getReservations(token, date)
      .then(setReservations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token, date]);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateReservationStatus(token, id, status);
      setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch (err) {
      setError(err.message);
    }
  };

  const totalGuests = reservations
    .filter((r) => r.status !== "cancelled" && r.status !== "no-show")
    .reduce((sum, r) => sum + r.partySize, 0);

  return (
    <div>
      <div className="admin-toolbar">
        <div className="field">
          <label htmlFor="admin-date">Date</label>
          <input
            id="admin-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {!loading && (
        <p className="empty-note" style={{ padding: 0, marginBottom: 20 }}>
          {reservations.length} reservation{reservations.length !== 1 ? "s" : ""} ·{" "}
          {totalGuests} guests expected
        </p>
      )}

      {loading && <p className="loading-note">Loading…</p>}
      {!loading && reservations.length === 0 && (
        <p className="empty-note">No reservations for this date.</p>
      )}

      {!loading && reservations.length > 0 && (
        <div className="table-scroll">
        <table className="res-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Guest</th>
              <th>Party</th>
              <th>Table</th>
              <th>Contact</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td>{formatTime(r.time)}</td>
                <td>
                  <strong>{r.name}</strong>
                  {r.notes && (
                    <div style={{ fontSize: 13, color: "var(--cream-dim)" }}>{r.notes}</div>
                  )}
                </td>
                <td>{r.partySize}</td>
                <td>{r.tableName}</td>
                <td>
                  <div>{r.email}</div>
                  {r.phone && <div>{r.phone}</div>}
                </td>
                <td>
                  <span className={`status-badge status-${r.status}`}>{r.status}</span>
                  <select
                    className="status-select"
                    value={r.status}
                    onChange={(e) => handleStatusChange(r.id, e.target.value)}
                    style={{ display: "block", marginTop: 6 }}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

function MessagesTab({ token }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMessages(token)
      .then(setMessages)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p className="loading-note">Loading…</p>;
  if (error) return <div className="error-banner">{error}</div>;
  if (messages.length === 0) return <p className="empty-note">No messages yet.</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {messages.map((m) => (
        <div key={m.id} className="ticket" style={{ padding: "20px 24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <strong>{m.name}</strong>
            <span style={{ color: "var(--cream-dim)", fontSize: 13 }}>
              {new Date(m.createdAt).toLocaleString()}
            </span>
          </div>
          <p style={{ margin: "0 0 8px", color: "var(--cream-dim)", fontSize: 14 }}>{m.email}</p>
          <p style={{ margin: 0 }}>{m.message}</p>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard({ token, onLogout }) {
  const [tab, setTab] = useState("reservations");

  return (
    <section className="section">
      <div className="section-inner">
        <div className="admin-toolbar">
          <div>
            <p className="step-label">Admin</p>
            <h1 className="headline" style={{ fontSize: 26, margin: 0 }}>
              Dashboard
            </h1>
          </div>
          <button className="btn-secondary" onClick={onLogout}>
            Log out
          </button>
        </div>

        <div className="tab-row">
          <button
            className={`tab-btn ${tab === "reservations" ? "active" : ""}`}
            onClick={() => setTab("reservations")}
          >
            Reservations
          </button>
          <button
            className={`tab-btn ${tab === "messages" ? "active" : ""}`}
            onClick={() => setTab("messages")}
          >
            Messages
          </button>
        </div>

        {tab === "reservations" ? (
          <ReservationsTab token={token} />
        ) : (
          <MessagesTab token={token} />
        )}
      </div>
    </section>
  );
}
