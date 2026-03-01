import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  { name: 'Sarah Jenkins', suburb: 'Mosman', text: 'After struggling with a green pool for weeks, the team had it crystal clear in 48 hours. Absolute lifesavers.' },
  { name: 'David Chen', suburb: 'Chatswood', text: 'Professional, punctual, and they actually explain what they are doing. Best pool service in the North Shore.' },
  { name: 'Emma Thompson', suburb: 'Vaucluse', text: 'We switched to Sydney Pool Care last summer. Our equipment runs quieter and the water has never felt better.' },
  { name: 'Marcus Rossi', suburb: 'Bondi', text: 'Fixed our broken pump on a Sunday morning before a family BBQ. 5-star service without question.' },
  { name: 'Chloe & Ben', suburb: 'Manly', text: 'Love the detailed telemetry reports after each visit. We always know exactly what chemicals were added.' },
  { name: 'James Wilson', suburb: 'Rose Bay', text: 'Premium service that lives up to the name. They treat our pool like it belongs to a 5-star resort.' },
];

export default function Reviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scrollWidth = scrollRef.current?.scrollWidth || 0;
    const clientWidth = scrollRef.current?.clientWidth || 0;
    
    gsap.to(scrollRef.current, {
      x: -(scrollWidth - clientWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }, { scope: containerRef });

  return (
    <section id="reviews" ref={containerRef} className="py-32 bg-navy text-white overflow-hidden">
      <div className="px-6 md:px-16 mb-16 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-serif italic mb-4">Client Feedback.</h2>
          <p className="text-cream/60 font-sans max-w-md">
            Don't just take our word for it. Read what families across Sydney have to say about our premium care.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex text-aqua">
            {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
          </div>
          <span className="font-mono text-sm tracking-widest ml-2">5.0 GOOGLE RATING</span>
        </div>
      </div>

      <div className="pl-6 md:pl-16">
        <div ref={scrollRef} className="flex gap-6 w-max pr-16 pb-12">
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className="w-[350px] md:w-[450px] bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col gap-6 backdrop-blur-sm"
            >
              <div className="flex text-aqua">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-lg text-cream/90 leading-relaxed flex-grow">
                "{review.text}"
              </p>
              <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="font-bold font-sans">{review.name}</span>
                <span className="font-mono text-xs text-aqua uppercase tracking-widest">{review.suburb}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
