import React from 'react';
import { ArrowUp } from 'lucide-react';
import logo from '../../assets/final_logo1-removebg-preview.png';

export const Footer: React.FC = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-brand-offwhite relative overflow-hidden">
      {/* Elegant Top Node Border */}
      <div className="w-full relative h-[1px] bg-brand-grey/30 flex items-center justify-center">
        <div className="absolute w-4 h-4 bg-brand-offwhite border border-brand-teal rounded-full flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse" />
        </div>
      </div>

      {/* Absolute watermark logo overlay */}
      <div className="absolute right-0 bottom-0 select-none pointer-events-none translate-x-12 translate-y-12 opacity-[0.03] text-brand-teal font-heading font-extrabold text-[120px] md:text-[200px] leading-none uppercase">
        AIVENTRA
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-8 relative z-10">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Company Brief */}
          <div className="md:col-span-2 flex flex-col items-start text-left">
            <div
              onClick={() => handleScrollTo('home')}
              className="flex items-center gap-3 mb-4 select-none cursor-pointer group"
            >
              <img
                src={logo}
                alt="AiventraCore Logo"
                className="h-14 w-auto object-contain max-h-[56px]"
              />
              <span className="font-heading font-bold text-base tracking-tight text-brand-teal group-hover:text-brand-brown transition-colors duration-300">
                AiventraCore
              </span>
            </div>
            <p className="text-xs text-slate-500 font-sans max-w-sm leading-relaxed">
              Enterprise data engineering and cloud architectural systems configured for speed, scale, and algorithmic intelligence.
            </p>
          </div>

          {/* Sitemap links with bracket indicators */}
          <div className="flex flex-col items-start text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-teal mb-4 select-none flex items-center gap-1">
              <span className="text-brand-brown">[</span> Navigation <span className="text-brand-brown">]</span>
            </span>
            <ul className="space-y-2 text-xs font-medium text-slate-600 font-sans">
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleScrollTo(item.toLowerCase())}
                    className="hover:text-brand-teal hover:underline transition-colors duration-200 cursor-pointer flex items-center gap-1"
                  >
                    <span>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal and compliance with bracket indicators */}
          <div className="flex flex-col items-start text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-teal mb-4 select-none flex items-center gap-1">
              <span className="text-brand-brown">[</span> Enterprise Compliance <span className="text-brand-brown">]</span>
            </span>
            <ul className="space-y-2 text-xs font-medium text-slate-600 font-sans">
              <li>
                <a href="#privacy" className="hover:text-brand-teal hover:underline transition-colors duration-200">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-brand-teal hover:underline transition-colors duration-200">Terms of Service</a>
              </li>
              <li>
                <a href="#sla" className="hover:text-brand-teal hover:underline transition-colors duration-200">Service Level SLA</a>
              </li>
              <li>
                <a href="#security" className="hover:text-brand-teal hover:underline transition-colors duration-200">Security Framework</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-grey/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] text-slate-500 font-mono">
            © {new Date().getFullYear()} AiventraCore. All rights reserved. // Engineered with mathematical precision.
          </div>

          {/* Scroll to Top Trigger */}
          <button
            onClick={handleScrollTop}
            className="w-10 h-10 border border-brand-grey/50 flex items-center justify-center text-slate-600 hover:border-brand-teal hover:text-brand-teal transition-all bg-transparent cursor-pointer rounded-none"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
};
