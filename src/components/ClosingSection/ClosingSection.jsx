import CTABand from './CTABand';
import Footer from './Footer';
import './ClosingSection.css';

export default function ClosingSection() {
  return (
    <section className="closing-section" aria-label="Get started and contact information">
      <CTABand />
      <Footer />
    </section>
  );
}
