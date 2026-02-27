import React from 'react';
import EngageCard from './EngageCard';
import EngageProgressBar from './EngageProgressBar';

const STEP_MARKERS = ['Discovery', 'Survey', 'Deploy', 'Monitor'];

export default function EngageContent({ steps, activeIndex, fillProgress, overallProgress, hasEntered, onStepClick }) {
  return (
    <>
      <div className="engage-noise" aria-hidden="true" />

      <div className="engage-content container-custom">
        <div
          className="engage-header"
          style={{
            opacity: hasEntered ? 1 : 0,
            transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="engage-eyebrow">&mdash; How We Engage</span>
          <h2 className="engage-headline">
            From first conversation to
            <br />
            continuous protection.
          </h2>
        </div>

        {/* Floating timeline */}
        <div
          className="engage-timeline"
          style={{
            opacity: hasEntered ? 1 : 0,
            transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) 200ms',
          }}
          role="progressbar"
          aria-valuenow={Math.round(overallProgress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Engagement process progress"
        >
          <div className="engage-timeline__bar">
            <div
              className="engage-timeline__fill"
              style={{ width: `${overallProgress * 100}%` }}
            />
          </div>
          <div className="engage-timeline__markers">
            {STEP_MARKERS.map((label, i) => {
              const isCompleted = i < activeIndex;
              const isCurrent = i === activeIndex;
              return (
                <button
                  key={label}
                  className={`engage-timeline__marker${isCurrent ? ' engage-timeline__marker--active' : ''}${isCompleted ? ' engage-timeline__marker--done' : ''}`}
                  onClick={() => onStepClick(i)}
                  aria-label={`Go to step ${i + 1}: ${label}`}
                >
                  <span className="engage-timeline__dot" />
                  <span className="engage-timeline__marker-label">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="engage-cards-row">
          {steps.map((step, i) => (
            <EngageCard
              key={step.number}
              step={step}
              index={i}
              isActive={i === activeIndex}
              hasEntered={hasEntered}
              onClick={() => onStepClick(i)}
            />
          ))}
        </div>

        <EngageProgressBar
          steps={steps}
          activeIndex={activeIndex}
          fillProgress={fillProgress}
          hasEntered={hasEntered}
          onSegmentClick={onStepClick}
        />
      </div>
    </>
  );
}
