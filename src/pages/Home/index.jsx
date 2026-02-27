import React from 'react';
import Hero from '../../components/Hero/Hero';
import ProblemSection from '../../components/ProblemSection';
import ProductsBento from '../../components/ProductsBento/ProductsBento';
import HowWeEngage from '../../components/HowWeEngage';
import ClosingSection from '../../components/ClosingSection';

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ProductsBento />
      <HowWeEngage />
      <ClosingSection />
    </>
  );
}
