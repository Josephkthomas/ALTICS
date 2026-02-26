import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';

const Placeholder = ({ title }) => (
  <div className="section-padding container-custom" style={{ paddingTop: '160px' }}>
    <h1 className="text-4xl font-display font-bold mb-4">{title}</h1>
    <p className="font-body" style={{ color: 'var(--color-text-secondary)' }}>This page is currently under construction.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route index element={<Home />} />
            <Route path="services" element={<Placeholder title="Services Overview" />} />
            <Route path="rftm" element={<Placeholder title="RFTM Product Page" />} />
            <Route path="pids" element={<Placeholder title="PIDS Product Page" />} />
            <Route path="iot" element={<Placeholder title="IoT Monitoring" />} />
            <Route path="nova-context" element={<Placeholder title="Nova Context" />} />
            <Route path="contact" element={<Placeholder title="Contact" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
