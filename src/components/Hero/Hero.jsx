import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Background layers */}
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true">
        <svg width="0" height="0">
          <filter id="hero-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </svg>
      </div>
      <div className="hero-bleed" aria-hidden="true" />

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-headline">
          The faults
          <br />
          you don&rsquo;t see
          <br />
          are the ones
          <br />
          that <em className="hero-headline-accent">cost you.</em>
        </h1>

        <p className="hero-subheading">
          Fibre networks, perimeter security, IoT sensors, and network
          operations — monitored continuously, so nothing goes undetected.
        </p>

        <div className="hero-cta-row">
          <a href="/contact" className="hero-btn hero-btn-primary">
            Schedule a Demo
            <svg
              className="hero-btn-arrow"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="/solutions" className="hero-btn hero-btn-secondary">
            Explore Solutions
          </a>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
        <span className="hero-scroll-label">Scroll to explore</span>
      </div>
    </section>
  );
}
