import React from 'react';

export default function EngageProgressBar({ steps, activeIndex, fillProgress, hasEntered, onSegmentClick }) {
  return (
    <div
      className="engage-progress"
      style={{
        opacity: hasEntered ? 1 : 0,
        transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) 300ms',
      }}
    >
      <div className="engage-progress__track">
        {steps.map((step, i) => {
          const isCompleted = i < activeIndex;
          const isActiveSegment = i === activeIndex;
          const segmentFill = isCompleted ? 1 : isActiveSegment ? fillProgress : 0;

          return (
            <button
              key={step.number}
              className={`engage-progress__segment ${isActiveSegment ? 'engage-progress__segment--active' : ''}`}
              onClick={() => onSegmentClick(i)}
              aria-label={`Go to step ${step.number}: ${step.title}`}
            >
              <div className="engage-progress__bar">
                <div
                  className="engage-progress__fill"
                  style={{ width: `${segmentFill * 100}%` }}
                />
              </div>
              <span className="engage-progress__label">{step.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
