import { useState } from "react";
import { NavLink } from "react-router-dom";
import { restaurant } from "../data/restaurant.js";

export default function Layout({ children }) {
  const [navOpen, setNavOpen] = useState(false);

  const navLinkClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <>
      <nav className="site-nav">
        <NavLink to="/" className="wordmark" onClick={() => setNavOpen(false)}>
          <span className="logo-mark">A</span>
          <span className="wordmark-text">
            {restaurant.name.slice(0, -1)}
            <span>{restaurant.name.slice(-1)}</span>
          </span>
        </NavLink>

        <button
          className="nav-toggle"
          onClick={() => setNavOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {navOpen ? "Close" : "Menu"}
        </button>

        <div className={`nav-links ${navOpen ? "open" : ""}`}>
          <NavLink to="/" end className={navLinkClass} onClick={() => setNavOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/menu" className={navLinkClass} onClick={() => setNavOpen(false)}>
            Menu
          </NavLink>
          <NavLink to="/location" className={navLinkClass} onClick={() => setNavOpen(false)}>
            Location
          </NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={() => setNavOpen(false)}>
            Contact
          </NavLink>
          <NavLink to="/reserve" className="nav-cta" onClick={() => setNavOpen(false)}>
            Book a Table
          </NavLink>
        </div>
      </nav>

      <main className="page">{children}</main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <h4>{restaurant.name}</h4>
            <p>{restaurant.tagline}</p>
          </div>
          <div>
            <h4>Visit</h4>
            <p>{restaurant.address.line1}</p>
            <p>{restaurant.address.line2}</p>
            <a href={`tel:${restaurant.phone.replace(/[^\d+]/g, "")}`}>{restaurant.phone}</a>
          </div>
          <div>
            <h4>Explore</h4>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/location">Location &amp; Hours</NavLink>
            <NavLink to="/reserve">Make a Reservation</NavLink>
            <NavLink to="/admin">Staff Login</NavLink>
          </div>
        </div>
      </footer>
    </>
  );
}
