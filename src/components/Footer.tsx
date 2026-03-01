import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-24 pb-12 px-6 md:px-16 rounded-t-[4rem] -mt-8 relative z-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
          
          <div className="md:col-span-5 flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight">
              Sydney Pool Care
            </h2>
            <p className="text-cream/60 max-w-sm text-lg">
              Premium pool maintenance, repair, and recovery for Sydney's most discerning homeowners.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-3 h-3 rounded-full bg-aqua animate-pulse" />
              <span className="font-mono text-xs text-aqua uppercase tracking-widest">
                System Operational: Pools Crystal Clear
              </span>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-8 flex flex-col gap-4">
            <h4 className="font-mono text-xs text-cream/40 uppercase tracking-widest mb-4">Services</h4>
            <a href="#" className="hover-lift text-cream/80 hover:text-aqua transition-colors">Weekly Care</a>
            <a href="#" className="hover-lift text-cream/80 hover:text-aqua transition-colors">Green Pool Recovery</a>
            <a href="#" className="hover-lift text-cream/80 hover:text-aqua transition-colors">Equipment Repair</a>
            <a href="#" className="hover-lift text-cream/80 hover:text-aqua transition-colors">Water Testing</a>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-mono text-xs text-cream/40 uppercase tracking-widest mb-4">Company</h4>
            <a href="#story" className="hover-lift text-cream/80 hover:text-aqua transition-colors">Our Story</a>
            <a href="#reviews" className="hover-lift text-cream/80 hover:text-aqua transition-colors">Testimonials</a>
            <a href="#" className="hover-lift text-cream/80 hover:text-aqua transition-colors">Careers</a>
            <a href="#" className="hover-lift text-cream/80 hover:text-aqua transition-colors">Contact</a>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
          <p className="text-cream/40 text-sm">
            &copy; {new Date().getFullYear()} Sydney Pool Care. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-sm text-cream/60">
            <a href="#" className="hover:text-aqua transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-aqua transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
