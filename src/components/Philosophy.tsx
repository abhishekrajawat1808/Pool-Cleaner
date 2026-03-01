import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const container = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 60%',
        },
      });

      tl.from(text1Ref.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }).from(
        text2Ref.current,
        {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        },
        '-=0.6'
      );
    }, container);
    return () => ctx.revert();
  }, { scope: container });

  return (
    <section 
      id="story"
      ref={container} 
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-navy py-32 px-6 md:px-16"
    >
      {/* Parallax Background */}
      <div 
        className="parallax-bg absolute inset-0 z-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop")',
          height: '130%',
          top: '-15%',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12 md:gap-20">
        <div ref={text1Ref} className="text-xl md:text-3xl font-sans font-medium text-cream/60 max-w-2xl">
          Most pool services focus on: getting in and out as quickly as possible.
        </div>
        
        <div ref={text2Ref} className="text-4xl md:text-6xl lg:text-8xl font-serif italic text-white leading-tight">
          We focus on: treating your pool like <span className="text-aqua not-italic font-sans font-bold">our own.</span>
        </div>
      </div>
    </section>
  );
}
