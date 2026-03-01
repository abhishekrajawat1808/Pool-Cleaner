import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-anim', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, container);
    return () => ctx.revert();
  }, { scope: container });

  return (
    <section 
      ref={container}
      className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-24 md:pb-32 px-6 md:px-16"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop")',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy via-navy/60 to-transparent" />

      {/* Content */}
      <div className="relative z-20 max-w-4xl text-white">
        <h1 className="flex flex-col gap-2">
          <span className="hero-anim block font-sans font-bold text-3xl md:text-5xl tracking-tight text-aqua">
            Sydney's 5-Star
          </span>
          <span className="hero-anim block font-serif italic text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
            Pool Care Experts.
          </span>
        </h1>
        
        <p className="hero-anim mt-8 max-w-xl text-lg md:text-xl text-cream/80 font-medium">
          Premium maintenance, green pool recovery, and equipment repair. 
          We treat your pool like our own.
        </p>

        <div className="hero-anim mt-10">
          <a 
            href="#quote"
            className="btn-magnetic bg-aqua text-navy px-8 py-4 text-lg"
          >
            Get Your Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}
