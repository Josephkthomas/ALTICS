import React, { useState, useEffect } from 'react';
import ProblemCard from './ProblemCard';
import OTDRTrace from './illustrations/OTDRTrace';
import PerimeterMap from './illustrations/PerimeterMap';
import SensorArray from './illustrations/SensorArray';
import NetworkTopology from './illustrations/NetworkTopology';

// Using inline SVG placeholders for now, these will be replaced by Gemini SVGs
const GhostIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);

const cardContent = [
    {
        title: "OTDR Signal Trace",
        subtitle: "Real-time fibre link diagnostics — fault location at a glance",
        icon: <GhostIcon />,
        visual: <OTDRTrace />
    },
    {
        title: "Perimeter Alert Map",
        subtitle: "Intrusion detection across the full perimeter boundary",
        icon: <GhostIcon />,
        visual: <PerimeterMap />
    },
    {
        title: "Sensor Array Status",
        subtitle: "Multi-sensor operational dashboard — real-time asset metrics",
        icon: <GhostIcon />,
        visual: <SensorArray />
    },
    {
        title: "Network Topology",
        subtitle: "Multi-layer topology view — root cause still unknown",
        icon: <GhostIcon />,
        visual: <NetworkTopology />
    }
];

export default function CardStack({ activeIndex, onCardClick, hasEntered, onNext, onPrev }) {
    const [exitingCard, setExitingCard] = useState(null);
    const [prevActive, setPrevActive] = useState(activeIndex);
    const [entryComplete, setEntryComplete] = useState(false);

    // Clear entry stagger delays after cascade finishes
    useEffect(() => {
        if (hasEntered && !entryComplete) {
            const timer = setTimeout(() => setEntryComplete(true), 1200);
            return () => clearTimeout(timer);
        }
    }, [hasEntered, entryComplete]);

    // Handle the exit animation sequencing
    useEffect(() => {
        if (activeIndex !== prevActive) {
            setExitingCard(prevActive);
            setPrevActive(activeIndex);

            // Wait for exit animation to complete (600ms) before placing at the back
            const timer = setTimeout(() => {
                setExitingCard(null);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [activeIndex, prevActive]);

    // Determine positions for the 4 cards
    const getPosition = (index) => {
        if (index === exitingCard) return "exiting";
        if (index === activeIndex) return "front";

        // Calculate relative position based on distance from active card (wrapping around)
        // 0 = active
        // 1 = next card down (second)
        // 2 = third card
        // 3 = fourth card
        let relativeDelta = (index - activeIndex + 4) % 4;

        // However, if the activeIndex changed instantly (on manual click or auto),
        // and a card is exiting, the new "front" is index, the old front is exiting.
        if (relativeDelta === 1) return "second";
        if (relativeDelta === 2) return "third";
        return "fourth";
    };

    return (
        <div className="flex flex-col w-full">
            <div className="relative w-full h-[560px]">
                {[0, 1, 2, 3].map((index) => (
                    <ProblemCard
                        key={index}
                        index={index}
                        position={getPosition(index)}
                        title={cardContent[index].title}
                        subtitle={cardContent[index].subtitle}
                        icon={cardContent[index].icon}
                        isEntering={!hasEntered}
                        useEntryDelay={!entryComplete}
                        onClick={onCardClick}
                    >
                        {cardContent[index].visual}
                    </ProblemCard>
                ))}
            </div>
        </div>
    );
}
