import { useState } from "react";
import { verifyAdminToken } from "../api/client.js";

export default function AdminLogin({ onLoggedIn }) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await verifyAdminToken(token);
      localStorage.setItem("adminToken", token);
      onLoggedIn(token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
    <div className="login-box">
      <p className="step-label">Staff access</p>
      <h1 className="headline">Admin sign in</h1>
      <p className="lede">Enter the admin token to manage today's reservations.</p>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="field-row">
          <div className="field">
            <label htmlFor="token">Admin token</label>
            <input
              id="token"
              type="password"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Checking…" : "Sign in"}
        </button>
      </form>
    </div>
    </section>
  );
}
