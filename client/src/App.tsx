import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-brand-offwhite text-slate-800 flex flex-col font-sans selection:bg-brand-teal selection:text-brand-offwhite">
      {/* Structural layout border grids mapping the layout dimensions */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-brand-grey/15 z-40 hidden lg:block" />
      <div className="fixed bottom-0 left-0 w-full h-[1px] bg-brand-grey/15 z-40 hidden lg:block" />
      
      {/* Navigation Header */}
      <Header />

      {/* Section Layers */}
      <main className="flex-grow">
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>

      {/* Footer Sitemap */}
      <Footer />
    </div>
  );
}

export default App;
