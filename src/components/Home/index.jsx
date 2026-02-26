import React from 'react';
import HeroSection from './HeroSection';
import AsciiTextureStrip from './AsciiTextureStrip';
import LogoTicker from './LogoTicker';
import SectionPause from './SectionPause';
import ProblemNarrative from './ProblemNarrative';
import BentoGrid from './BentoGrid';
import StatsStrip from './StatsStrip';
import HowItWorks from './HowItWorks';
import CtaBand from './CtaBand';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <AsciiTextureStrip />
      <LogoTicker />
      <SectionPause />
      <ProblemNarrative />
      <BentoGrid />
      <StatsStrip />
      <HowItWorks />
      <CtaBand />
    </div>
  );
};

export default Home;
