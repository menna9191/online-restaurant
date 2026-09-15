import { useState } from "react";
import { restaurant } from "../data/restaurant.js";
import { sendContactMessage } from "../api/client.js";
import Reveal from "../components/Reveal.jsx";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await sendContactMessage({ name, email, message });
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <Reveal as="div" className="section-inner">
        <p className="eyebrow">Get in touch</p>
        <h1 className="headline">Contact us</h1>
        <p className="lede">
          Questions about private events, large parties, or anything else —
          send us a note and we'll get back to you within a day.
        </p>

        <div className="contact-grid">
          <div>
            {sent && (
              <div className="success-banner">
                Thanks — your message has been sent. We'll be in touch soon.
              </div>
            )}
            {error && <div className="error-banner">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="c-name">Name</label>
                  <input
                    id="c-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="c-message">Message</label>
                  <textarea
                    id="c-message"
                    required
                    style={{ minHeight: 140 }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>

          <div className="info-list">
            <div className="info-block">
              <h4>Phone</h4>
              <p>{restaurant.phone}</p>
            </div>
            <div className="info-block">
              <h4>Email</h4>
              <p>{restaurant.email}</p>
            </div>
            <div className="info-block">
              <h4>Address</h4>
              <p>
                {restaurant.address.line1}
                <br />
                {restaurant.address.line2}
              </p>
            </div>
            <div className="info-block">
              <h4>Private events</h4>
              <p>
                Hosting a party of 10 or more? Mention it in your message and
                we'll follow up with private dining options.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
