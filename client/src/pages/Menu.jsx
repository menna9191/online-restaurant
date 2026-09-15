import { Link } from "react-router-dom";
import { menu } from "../data/restaurant.js";
import Reveal from "../components/Reveal.jsx";

export default function Menu() {
  return (
    <section className="section">
      <div className="section-inner section-inner--narrow">
        <Reveal>
          <p className="eyebrow">Seasonal Menu</p>
          <h1 className="headline">A taste of what's cooking.</h1>
          <p className="lede">
            Our menu changes with the season — this is a recent sample. Ask
            your server about tonight's specials and seasonal pairings.
          </p>
        </Reveal>

        {menu.map((section, i) => (
          <Reveal as="div" delay={i * 60} className="menu-category" key={section.category}>
            <h3>{section.category}</h3>
            {section.items.map((item) => (
              <div className="menu-item-wrap" key={item.name}>
                <div className="menu-item">
                  <span className="menu-item__name">{item.name}</span>
                  <span className="menu-item__leader" />
                  <span className="menu-item__price">{item.price}</span>
                </div>
                <span className="menu-item__desc">{item.description}</span>
              </div>
            ))}
          </Reveal>
        ))}

        <p className="menu-note">
          Please inform your server of any allergies or dietary restrictions.
          A 20% gratuity is added to parties of 6 or more.
        </p>

        <div style={{ marginTop: 32 }}>
          <Link to="/reserve" className="btn-primary">
            Reserve a table
          </Link>
        </div>
      </div>
    </section>
  );
}
