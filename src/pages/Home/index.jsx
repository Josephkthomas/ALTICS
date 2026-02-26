import React from 'react';
import Hero from '../../components/Hero/Hero';
import LogoTicker from '../../components/LogoTicker/LogoTicker';
import ProblemNarrative from '../../components/ProblemNarrative/ProblemNarrative';
import ProductsBento from '../../components/ProductsBento/ProductsBento';
import FeaturesList from '../../components/FeaturesList/FeaturesList';
import StatsStrip from '../../components/StatsStrip/StatsStrip';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import CTABand from '../../components/CTABand/CTABand';

export default function Home() {
  return (
    <>
      <Hero />
      <LogoTicker />
      <ProblemNarrative />
      <ProductsBento />
      <FeaturesList />
      <StatsStrip />
      <HowItWorks />
      <CTABand />
    </>
  );
}
