import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        ref={navRef}
        className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 w-full max-w-4xl ${
          scrolled
            ? 'bg-cream/80 backdrop-blur-xl border border-navy/10 shadow-sm text-navy'
            : 'bg-transparent text-white'
        }`}
      >
        <div className="font-sans font-bold text-xl tracking-tight">
          Sydney Pool Care
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <a href="#services" className="hover-lift opacity-80 hover:opacity-100">Services</a>
          <a href="#story" className="hover-lift opacity-80 hover:opacity-100">Our Story</a>
          <a href="#reviews" className="hover-lift opacity-80 hover:opacity-100">Reviews</a>
        </div>

        <a
          href="#quote"
          className={`btn-magnetic px-5 py-2 text-sm ${
            scrolled ? 'bg-navy text-white' : 'bg-aqua text-navy'
          }`}
        >
          Get Your Free Quote
        </a>
      </nav>
    </div>
  );
}
