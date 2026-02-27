import React from 'react';
import HighlightIcon from './HighlightIcon';

export default function EngageCard({ step, index, isActive, hasEntered, onClick }) {
  const Illustration = step.illustration;

  return (
    <button
      className={`engage-card ${isActive ? 'engage-card--active' : 'engage-card--inactive'}`}
      onClick={onClick}
      aria-pressed={isActive}
      style={{
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: hasEntered ? `${index * 80}ms` : '0ms',
      }}
    >
      <div className="engage-card__illustration">
        <Illustration isActive={isActive} />
      </div>

      <span className="engage-card__number">{step.number}</span>
      <h3 className="engage-card__title">{step.title}</h3>
      <p className="engage-card__desc">{step.fullDesc}</p>

      {step.highlights && (
        <ul className="engage-card__highlights">
          {step.highlights.map((item, i) => (
            <li key={i} className="engage-card__highlight">
              <span className="engage-card__highlight-icon">
                <HighlightIcon name={item.icon} />
              </span>
              <span className="engage-card__highlight-text">{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}
