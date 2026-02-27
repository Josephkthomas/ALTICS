import React from 'react';
import Hero from '../../components/Hero/Hero';
import ProblemSection from '../../components/ProblemSection';
import ProductsBento from '../../components/ProductsBento/ProductsBento';
import FeaturesList from '../../components/FeaturesList/FeaturesList';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import CTABand from '../../components/CTABand/CTABand';

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ProductsBento />
      <FeaturesList />
      <HowItWorks />
      <CTABand />
    </>
  );
}
