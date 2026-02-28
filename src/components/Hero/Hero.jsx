import React, { useState, useEffect } from "react";
import BinaryWave from "./BinaryWave";
import "./Hero.css";

const TYPEWRITER_TEXT = "Continuously. Completely.";
const CHAR_DELAY = 55;       // ms per character
const START_DELAY = 1000;    // wait for fade-up animations to finish
const CURSOR_LINGER = 1800;  // cursor blinks after typing, then fades

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [cursorDone, setCursorDone] = useState(false);

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(TYPEWRITER_TEXT);
      setCursorDone(true);
      return;
    }

    const startTimer = setTimeout(() => {
      setShowCursor(true);
      let i = 0;
      const typeInterval = setInterval(() => {
        i++;
        setTyped(TYPEWRITER_TEXT.slice(0, i));
        if (i >= TYPEWRITER_TEXT.length) {
          clearInterval(typeInterval);
          // Cursor lingers, then fades
          setTimeout(() => {
            setCursorDone(true);
          }, CURSOR_LINGER);
        }
      }, CHAR_DELAY);
      return () => clearInterval(typeInterval);
    }, START_DELAY);

    return () => clearTimeout(startTimer);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-sticky">
        {/* Background layers */}
        <div className="hero-glow" aria-hidden="true" />
        <BinaryWave />
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

        {/* Content */}
        <div className="hero-content">
          <h1 className="hero-headline">
            Your infrastructure,
            <br />
            <span className="hero-headline-accent">
              monitored<span className="hero-pulse-dot" aria-hidden="true" />
            </span>
            <br />
            <span className="hero-typewriter" aria-label={TYPEWRITER_TEXT}>
              {typed}
              {showCursor && (
                <span
                  className={`hero-cursor ${cursorDone ? "hero-cursor-fade" : ""}`}
                  aria-hidden="true"
                />
              )}
            </span>
          </h1>

          <p className="hero-subheading">
            Fibre networks, perimeter security, IoT sensors, and network
            operations — one unified platform that sees everything, so you
            never have to wonder.
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
      </div>
    </section>
  );
}
