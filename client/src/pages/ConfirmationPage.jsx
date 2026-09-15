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

export default function ConfirmationPage({ reservation, onBookAnother }) {
  return (
    <section className="section">
    <div className="section-inner section-inner--narrow">
      <p className="step-label">Confirmed</p>
      <h1 className="headline">You're all set, {reservation.name.split(" ")[0]}.</h1>
      <p className="lede">A confirmation has been noted under this reservation code.</p>

      <div className="ticket">
        <p className="ticket__eyebrow">Reservation code</p>
        <p className="ticket__code">{reservation.id}</p>
        <dl className="ticket__rows">
          <dt>Date</dt>
          <dd>{formatDate(reservation.date)}</dd>
          <dt>Time</dt>
          <dd>{formatTime(reservation.time)}</dd>
          <dt>Party size</dt>
          <dd>{reservation.partySize}</dd>
          <dt>Table</dt>
          <dd>{reservation.tableName}</dd>
          <dt>Name</dt>
          <dd>{reservation.name}</dd>
          <dt>Email</dt>
          <dd>{reservation.email}</dd>
        </dl>
      </div>

      <div style={{ marginTop: 28 }}>
        <button className="btn-secondary" onClick={onBookAnother}>
          Make another reservation
        </button>
      </div>
    </div>
    </section>
  );
}
