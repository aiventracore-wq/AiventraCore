import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/final_logo1-removebg-preview.png';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'glass-nav py-4 shadow-sm border-b border-brand-grey/25'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Geometric Node Logo + Text */}
        <div
          onClick={() => handleScrollTo('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <img
            src={logo}
            alt="AiventraCore"
            className="h-20 w-auto object-contain max-h-[80px]"
          />
          <span className="font-heading font-bold text-lg tracking-tight text-brand-teal group-hover:text-brand-brown transition-colors duration-300">
            AiventraCore
          </span>
        </div>

        {/* Navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 font-sans font-medium text-sm text-slate-600">
          {['Home', 'Services', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => handleScrollTo(item.toLowerCase())}
              className="hover:text-brand-teal hover:underline underline-offset-4 transition-all duration-200"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* CTA Request Demo Button */}
        <div className="hidden md:block">
          <button
            onClick={() => handleScrollTo('contact')}
            className="bg-brand-brown hover:bg-brand-teal text-brand-offwhite px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out border border-brand-brown rounded-none cursor-pointer"
          >
            Request Demo
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-brand-teal p-1"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-offwhite border-b border-brand-grey/30 py-6 px-8 flex flex-col gap-6 shadow-md transition-all duration-300">
          {['Home', 'Services', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => handleScrollTo(item.toLowerCase())}
              className="text-left font-heading font-medium text-lg text-slate-700 hover:text-brand-teal py-1"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => handleScrollTo('contact')}
            className="bg-brand-brown hover:bg-brand-teal text-brand-offwhite py-3 text-center text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-brand-brown cursor-pointer"
          >
            Request Demo
          </button>
        </div>
      )}
    </header>
  );
};
