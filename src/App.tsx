import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="relative bg-cream min-h-screen font-sans text-charcoal selection:bg-aqua selection:text-navy">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Reviews />
      <Footer />
    </main>
  );
}
