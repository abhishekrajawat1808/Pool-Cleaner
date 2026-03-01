import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const protocols = [
  {
    id: '01',
    title: 'Diagnostic Assessment',
    desc: 'We begin with a comprehensive analysis of your pool\'s water chemistry, filtration system, and surface condition.',
    Animation: () => (
      <svg className="w-full h-full text-aqua" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="50" cy="50" r="40" className="animate-[spin_10s_linear_infinite]" strokeDasharray="10 10" />
        <circle cx="50" cy="50" r="25" className="animate-[spin_15s_linear_infinite_reverse]" strokeDasharray="5 5" />
        <circle cx="50" cy="50" r="10" fill="currentColor" />
      </svg>
    )
  },
  {
    id: '02',
    title: 'Precision Balancing',
    desc: 'Using laboratory-grade reagents, we adjust pH, alkalinity, and sanitizer levels to exact specifications.',
    Animation: () => (
      <svg className="w-full h-full text-aqua" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 50 Q 30 10, 50 50 T 90 50" className="animate-[pulse_2s_ease-in-out_infinite]" />
        <line x1="0" y1="50" x2="100" y2="50" strokeOpacity="0.3" />
        <circle cx="50" cy="50" r="4" fill="currentColor" />
      </svg>
    )
  },
  {
    id: '03',
    title: 'Continuous Maintenance',
    desc: 'A tailored schedule of vacuuming, brushing, and equipment checks ensures your pool remains pristine year-round.',
    Animation: () => (
      <svg className="w-full h-full text-aqua" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="20" y="20" width="60" height="60" rx="10" className="animate-[spin_20s_linear_infinite]" />
        <rect x="35" y="35" width="30" height="30" rx="5" className="animate-[spin_10s_linear_infinite_reverse]" />
      </svg>
    )
  }
];

export default function Protocol() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.protocol-card');
    
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return; // Skip last card
      
      const nextCard = cards[i + 1];
      
      gsap.to(card, {
        scale: 0.9,
        opacity: 0.5,
        filter: 'blur(10px)',
        ease: 'none',
        scrollTrigger: {
          trigger: nextCard,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section className="protocol-container relative bg-cream" ref={containerRef}>
      {protocols.map((protocol, i) => (
        <div 
          key={protocol.id}
          className="protocol-card h-[100dvh] w-full flex items-center justify-center sticky top-0 bg-cream px-6 md:px-16"
          style={{ zIndex: i }}
        >
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            
            <div className="order-2 md:order-1 flex flex-col gap-6">
              <div className="text-sm font-mono text-aqua font-bold tracking-widest">STEP {protocol.id}</div>
              <h2 className="text-4xl md:text-6xl font-sans font-bold text-navy tracking-tight">
                {protocol.title}
              </h2>
              <p className="text-xl text-charcoal/70 max-w-lg leading-relaxed">
                {protocol.desc}
              </p>
            </div>

            <div className="order-1 md:order-2 aspect-square max-w-md w-full mx-auto bg-navy rounded-[3rem] p-12 flex items-center justify-center shadow-2xl border border-aqua/10">
              <protocol.Animation />
            </div>

          </div>
        </div>
      ))}
    </section>
  );
}
