import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left Column: Copy & Actions */}
        <div className="hero-copy-column">
          <span className="hero-eyebrow">— INTELLIGENT MONITORING</span>
          <h1 className="hero-headline">
            Zero blind spots.<br />
            <span className="hero-accent-text">Zero</span> downtime.
          </h1>
          <p className="hero-subheading">
            Four systems. One unified view. Fibre, perimeter, sensors, and network topology — monitored continuously, so nothing goes undetected.
          </p>
          <div className="hero-cta-row">
            <button className="hero-btn hero-btn-primary">Schedule a Demo</button>
            <button className="hero-btn hero-btn-secondary">Explore Solutions</button>
          </div>
        </div>

        {/* Right Column: Placeholder */}
        <div className="hero-visual-placeholder">
          <span className="hero-placeholder-label">Visual TBD</span>
        </div>
      </div>
    </section>
  );
}
