import { restaurant } from "../data/restaurant.js";
import Reveal from "../components/Reveal.jsx";

export default function Location() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    restaurant.mapQuery
  )}&output=embed`;

  return (
    <section className="section">
      <Reveal as="div" className="section-inner">
        <p className="eyebrow">Find Us</p>
        <h1 className="headline">Location &amp; Hours</h1>
        <p className="lede">
          Tucked on a quiet street in San Francisco, with easy access to
          public transit and a valet stand out front on weekend evenings.
        </p>

        <div className="location-grid">
          <div className="info-list">
            <div className="info-block">
              <h4>Address</h4>
              <p>
                {restaurant.address.line1}
                <br />
                {restaurant.address.line2}
              </p>
            </div>

            <div className="info-block">
              <h4>Contact</h4>
              <p>
                {restaurant.phone}
                <br />
                {restaurant.email}
              </p>
            </div>

            <div className="info-block">
              <h4>Hours</h4>
              <table className="hours-table">
                <tbody>
                  {restaurant.hours.map((h) => (
                    <tr key={h.day}>
                      <td>{h.day}</td>
                      <td>{h.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="info-block">
              <h4>Parking &amp; Transit</h4>
              <p>
                Valet available Thursday–Sunday after 5:30 PM. Street parking
                nearby, and the Embarcadero BART station is a 6-minute walk.
              </p>
            </div>
          </div>

          <div className="map-wrap">
            <iframe
              title="Map"
              className="map-frame"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
