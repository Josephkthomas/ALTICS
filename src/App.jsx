import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';

const Placeholder = ({ title }) => (
  <div className="section-padding container-custom" style={{ paddingTop: '160px' }}>
    <h1 className="text-4xl font-display font-bold mb-4">{title}</h1>
    <p className="font-body" style={{ color: 'var(--color-text-secondary)' }}>This page is currently under construction.</p>
  </div>
);

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow">
        <Routes>
          <Route index element={<Home />} />
          <Route path="services" element={<Placeholder title="Services Overview" />} />
          <Route path="rftm" element={<Placeholder title="RFTM Product Page" />} />
          <Route path="pids" element={<Placeholder title="PIDS Product Page" />} />
          <Route path="iot" element={<Placeholder title="IoT Monitoring" />} />
          <Route path="nova-context" element={<Placeholder title="Nova Context" />} />
          <Route path="products" element={<Placeholder title="Products" />} />
          <Route path="solutions" element={<Placeholder title="Solutions" />} />
          <Route path="about" element={<Placeholder title="About" />} />
          <Route path="contact" element={<Placeholder title="Contact" />} />
        </Routes>
      </main>
      {!isHome && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
