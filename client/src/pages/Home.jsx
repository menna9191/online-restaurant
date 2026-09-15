import { Link } from "react-router-dom";
import { restaurant } from "../data/restaurant.js";
import Reveal from "../components/Reveal.jsx";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Welcome to</p>
          <h1 className="headline">{restaurant.name}</h1>
          <p className="script-lede">{restaurant.heroTagline}</p>
          <p className="hero-desc">{restaurant.heroDescription}</p>
          <div className="hero-actions">
            <Link to="/menu" className="btn-primary">
              Explore Our Menu <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <Reveal className="section-inner">
          <p className="eyebrow">The experience</p>
          <h2 className="headline">An evening worth planning around.</h2>
          <p className="lede">
            Seasonal, ingredient-driven plates from an open kitchen, an
            intimate dining room, and a drinks list built for slow evenings.
          </p>

          <div className="highlight-grid">
            <Reveal as="div" delay={0} className="highlight-card">
              <div className="mark">01</div>
              <h3>Seasonal Menu</h3>
              <p>Reworked each season around what's best at the market.</p>
            </Reveal>
            <Reveal as="div" delay={100} className="highlight-card">
              <div className="mark">02</div>
              <h3>Handcrafted Drinks</h3>
              <p>House-made mocktails and cocktails, built fresh to order.</p>
            </Reveal>
            <Reveal as="div" delay={200} className="highlight-card">
              <div className="mark">03</div>
              <h3>Intimate Setting</h3>
              <p>Just 14 tables — quiet, warmly lit, unhurried.</p>
            </Reveal>
          </div>
        </Reveal>
      </section>

      <section className="section section--tight" style={{ borderTop: "1px solid var(--line)" }}>
        <Reveal className="section-inner" style={{ textAlign: "center" }}>
          <p className="eyebrow">Tonight, tomorrow, or next week</p>
          <h2 className="headline">Tables are limited — reserve ahead.</h2>
          <Link to="/reserve" className="btn-primary">
            Check availability
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
