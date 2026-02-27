import React from 'react';

const ICONS = {
  search: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="7.5" r="5.5" />
      <path d="M11.5 11.5L16 16" />
    </svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 1.5L2.5 4.5V8.5C2.5 12.5 5.5 15.5 9 16.5C12.5 15.5 15.5 12.5 15.5 8.5V4.5L9 1.5Z" />
      <path d="M6.5 9L8.5 11L11.5 7" />
    </svg>
  ),
  target: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="7" />
      <circle cx="9" cy="9" r="4" />
      <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  mapPin: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 1.5C6.24 1.5 4 3.74 4 6.5C4 10.75 9 16.5 9 16.5C9 16.5 14 10.75 14 6.5C14 3.74 11.76 1.5 9 1.5Z" />
      <circle cx="9" cy="6.5" r="2" />
    </svg>
  ),
  blueprint: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="14" height="14" rx="2" />
      <path d="M2 7H16" />
      <path d="M7 7V16" />
      <path d="M10 10H13" />
      <path d="M10 13H13" />
    </svg>
  ),
  link: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 10.5C8.16 11.33 9.14 11.84 10.2 11.9C11.26 11.96 12.29 11.56 13.04 10.81L15.04 8.81C16.46 7.34 16.43 5.01 14.97 3.58C13.51 2.14 11.18 2.17 9.75 3.59L8.63 4.7" />
      <path d="M10.5 7.5C9.84 6.67 8.86 6.16 7.8 6.1C6.74 6.04 5.71 6.44 4.96 7.19L2.96 9.19C1.54 10.66 1.57 12.99 3.03 14.42C4.49 15.86 6.82 15.83 8.25 14.41L9.36 13.3" />
    </svg>
  ),
  zap: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 1.5L3.5 10.5H9L8 16.5L14.5 7.5H9L10 1.5Z" />
    </svg>
  ),
  plug: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 2V6" />
      <path d="M13 2V6" />
      <path d="M3 6H15V9C15 12.31 12.31 15 9 15C5.69 15 3 12.31 3 9V6Z" />
      <path d="M9 15V17" />
    </svg>
  ),
  check: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4.5L7 13.5L3 9.5" />
      <circle cx="9" cy="9" r="7.5" />
    </svg>
  ),
  radar: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="7.5" />
      <circle cx="9" cy="9" r="4" />
      <path d="M9 9L13.5 4.5" />
      <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  chart: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 15.5H16" />
      <path d="M4 12.5V9.5" />
      <path d="M7.5 12.5V6.5" />
      <path d="M11 12.5V4.5" />
      <path d="M14.5 12.5V2.5" />
    </svg>
  ),
  headset: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 13V9C2.5 5.41 5.41 2.5 9 2.5C12.59 2.5 15.5 5.41 15.5 9V13" />
      <rect x="1.5" y="11" width="3" height="4.5" rx="1" />
      <rect x="13.5" y="11" width="3" height="4.5" rx="1" />
    </svg>
  ),
};

export default function HighlightIcon({ name }) {
  return ICONS[name] || null;
}
