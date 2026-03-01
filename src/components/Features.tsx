import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ShufflerCard = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Weekly Care', desc: 'Full vacuum, brush, and chemical balance every 7 days.' },
    { id: 2, title: 'Fortnightly', desc: 'Consistent maintenance for low-debris environments.' },
    { id: 3, title: 'Monthly Check', desc: 'Equipment inspection and deep chemical shock.' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => {
        const newCards = [...prev];
        const last = newCards.pop();
        if (last) newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 w-full flex items-center justify-center perspective-1000">
      {cards.map((card, index) => {
        const isFront = index === 0;
        const isMiddle = index === 1;
        const isBack = index === 2;

        return (
          <div
            key={card.id}
            className="absolute w-full max-w-sm rounded-[2rem] bg-white border border-navy/5 shadow-lg p-6 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              transform: `translateY(${index * 15}px) scale(${1 - index * 0.05})`,
              opacity: 1 - index * 0.2,
              zIndex: 3 - index,
            }}
          >
            <div className="text-xs font-mono text-aqua mb-2 uppercase tracking-widest">Plan 0{card.id}</div>
            <h3 className="text-xl font-bold text-navy mb-2">{card.title}</h3>
            <p className="text-sm text-charcoal/70">{card.desc}</p>
          </div>
        );
      })}
    </div>
  );
};

const TypewriterCard = () => {
  const [text, setText] = useState('');
  const fullText = "Analyzing water chemistry...\npH Level: 7.4 [OPTIMAL]\nChlorine: 2.5 ppm [OPTIMAL]\nAlkalinity: 100 ppm [STABLE]\nCalcium Hardness: 250 ppm [STABLE]\nCyanuric Acid: 40 ppm [OPTIMAL]\n\nStatus: Crystal Clear.";
  
  useEffect(() => {
    let i = 0;
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    
    const startTyping = () => {
      i = 0;
      setText('');
      interval = setInterval(() => {
        setText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(interval);
          timeout = setTimeout(startTyping, 5000); // Restart after 5s
        }
      }, 50);
    };

    startTyping();
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="h-64 w-full bg-navy rounded-[2rem] p-6 flex flex-col relative overflow-hidden shadow-lg border border-aqua/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-aqua animate-pulse" />
        <span className="text-xs font-mono text-aqua uppercase tracking-widest">Live Telemetry</span>
      </div>
      <div className="font-mono text-sm text-cream/80 whitespace-pre-wrap leading-relaxed">
        {text}
        <span className="inline-block w-2 h-4 bg-aqua ml-1 animate-pulse" />
      </div>
    </div>
  );
};

const SchedulerCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    
    tl.set(cursorRef.current, { x: 0, y: 150, opacity: 0 })
      .set(dayRef.current, { backgroundColor: 'transparent', color: '#1C2541' })
      .set(btnRef.current, { scale: 1 })
      
      .to(cursorRef.current, { opacity: 1, duration: 0.3 })
      .to(cursorRef.current, { 
        x: 120, y: 40, 
        duration: 1, 
        ease: 'power2.inOut' 
      })
      .to(cursorRef.current, { scale: 0.8, duration: 0.1 }) // click down
      .to(dayRef.current, { backgroundColor: '#00E5FF', color: '#0A1128', duration: 0.1 }) // highlight
      .to(cursorRef.current, { scale: 1, duration: 0.1 }) // click up
      .to(cursorRef.current, { 
        x: 180, y: 120, 
        duration: 0.8, 
        ease: 'power2.inOut',
        delay: 0.2
      })
      .to(cursorRef.current, { scale: 0.8, duration: 0.1 }) // click down
      .to(btnRef.current, { scale: 0.95, duration: 0.1 }) // button press
      .to(cursorRef.current, { scale: 1, duration: 0.1 }) // click up
      .to(btnRef.current, { scale: 1, duration: 0.1 }) // button release
      .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.5 });
      
  }, { scope: containerRef });

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div ref={containerRef} className="relative h-64 w-full bg-white rounded-[2rem] p-6 flex flex-col shadow-lg border border-navy/5">
      <div className="text-xs font-mono text-aqua mb-4 uppercase tracking-widest">Protocol Scheduler</div>
      
      <div className="grid grid-cols-7 gap-2 mb-8">
        {days.map((d, i) => (
          <div 
            key={i} 
            ref={i === 3 ? dayRef : null}
            className="aspect-square rounded-lg flex items-center justify-center text-sm font-medium text-charcoal bg-cream border border-navy/5"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="mt-auto flex justify-end">
        <div ref={btnRef} className="bg-navy text-white text-xs font-bold px-4 py-2 rounded-full">
          Confirm Booking
        </div>
      </div>

      {/* SVG Cursor */}
      <div 
        ref={cursorRef} 
        className="absolute top-0 left-0 z-10 pointer-events-none"
        style={{ width: 24, height: 24 }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4L11.071 21.6773C11.3655 22.4135 12.4135 22.4135 12.708 21.6773L15.318 15.152L21.8433 12.542C22.5795 12.2475 22.5795 11.1995 21.8433 10.905L4.166 3.834C3.518 3.51 2.87 4.158 3.194 4.806L4 4Z" fill="#1C2541" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default function Features() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.feature-card', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
    });
  }, { scope: container });

  return (
    <section id="services" ref={container} className="py-24 md:py-32 px-6 md:px-16 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-navy mb-6 tracking-tight">
            Comprehensive Pool Care
          </h2>
          <p className="text-lg text-charcoal/70">
            From routine maintenance to complex equipment repairs, we provide everything needed to keep your pool pristine year-round.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card flex flex-col gap-6">
            <h3 className="text-2xl font-bold text-navy">Maintenance Plans</h3>
            <p className="text-charcoal/70">Flexible scheduling tailored to your pool's specific needs and environment.</p>
            <ShufflerCard />
          </div>

          <div className="feature-card flex flex-col gap-6">
            <h3 className="text-2xl font-bold text-navy">Water Chemistry</h3>
            <p className="text-charcoal/70">Precision balancing to ensure safe, crystal-clear water and protect your equipment.</p>
            <TypewriterCard />
          </div>

          <div className="feature-card flex flex-col gap-6">
            <h3 className="text-2xl font-bold text-navy">Easy Booking</h3>
            <p className="text-charcoal/70">Seamless scheduling for regular service, green pool recovery, or repairs.</p>
            <SchedulerCard />
          </div>
        </div>
      </div>
    </section>
  );
}
