import React from "react";
import "./Hero.css";
import RFTMIllustration from "./illustrations/RFTMIllustration";
import NovaIllustration from "./illustrations/NovaIllustration";
import PIDSIllustration from "./illustrations/PIDSIllustration";
import IoTIllustration from "./illustrations/IoTIllustration";

export default function HeroGrid() {
    return (
        <div className="hero-grid-column">
            <div className="hero-grid-cell">
                <RFTMIllustration />
                <span className="hero-cell-label">RFTM</span>
            </div>
            <div className="hero-grid-cell">
                <NovaIllustration />
                <span className="hero-cell-label">Nova Context</span>
            </div>
            <div className="hero-grid-cell">
                <PIDSIllustration />
                <span className="hero-cell-label">PIDS</span>
            </div>
            <div className="hero-grid-cell">
                <IoTIllustration />
                <span className="hero-cell-label">IoT Monitoring</span>
            </div>
        </div>
    );
}
