import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Monitor, ExternalLink } from 'lucide-react';

interface WorkItem {
  title: string;
  category: string;
  url: string;
  description: string;
  tech: string[];
}

const workItems: WorkItem[] = [
  {
    title: 'Quantum Stream Processor',
    category: 'Data Infrastructure',
    url: 'aiventracore.io/quantum-stream',
    description: 'Zero-latency stream partitioning engine for financial ledgers and real-time transaction validations.',
    tech: ['Rust', 'Kafka', 'WebAssembly']
  },
  {
    title: 'Neural Feedback Controller',
    category: 'AI / Model Analytics',
    url: 'aiventracore.io/neural-feedback',
    description: 'Distributed PyTorch pipelines optimizing operational telemetry datasets in real-time retraining feedback loops.',
    tech: ['PyTorch', 'CUDA', 'Python']
  },
  {
    title: 'Columnar Lakehouse Interface',
    category: 'Cloud Analytics',
    url: 'aiventracore.io/lakehouse-panel',
    description: 'Ad-hoc BI analytical reports mapping telemetry streams into ClickHouse columnar schemas under 15ms query speeds.',
    tech: ['ClickHouse', 'dbt', 'Go']
  },
  {
    title: 'Distributed Cluster Monitor',
    category: 'Cloud Solutions',
    url: 'aiventracore.io/cluster-monitor',
    description: 'Kubernetes VPC container orchestrations mapping cluster status and health across multi-cloud secure boundaries.',
    tech: ['Kubernetes', 'Helm', 'Terraform']
  },
  {
    title: 'Ingress Security Gateway',
    category: 'Network Security',
    url: 'aiventracore.io/ingress-gateway',
    description: 'Enterprise API gateway orchestrating safe ingress nodes and telemetry buffer checks with high SLA availability.',
    tech: ['Elixir', 'Docker', 'AWS Ingress']
  }
];

const ProjectDiagram: React.FC<{ index: number }> = ({ index }) => {
  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 400 225" className="w-full h-full bg-slate-950 font-mono select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stream-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#9A1750" strokeWidth="0.5" strokeOpacity="0.08" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stream-grid)" />
          
          <path d="M 30 112 L 120 112 M 160 112 L 250 112 M 290 112 L 370 112" stroke="#E3AFBC" strokeWidth="1.5" strokeDasharray="4,4" />
          <path d="M 120 112 Q 185 45 250 112" stroke="#9A1750" strokeWidth="2.5" fill="none" className="path-draw-animation" strokeDasharray="200" strokeDashoffset="200" />
          <path d="M 120 112 Q 185 180 250 112" stroke="#EE4C7C" strokeWidth="1.5" fill="none" strokeOpacity="0.6" />

          <g transform="translate(30, 82)">
            <rect width="90" height="60" fill="#5D001E" stroke="#9A1750" strokeWidth="1.5" rx="3" />
            <text x="45" y="26" fill="#E3E2DF" fontSize="8" fontWeight="bold" textAnchor="middle">CONSUMER</text>
            <text x="45" y="41" fill="#EE4C7C" fontSize="8" fontWeight="bold" textAnchor="middle">INGRESS</text>
          </g>

          <g transform="translate(160, 82)">
            <rect width="90" height="60" fill="#5D001E" stroke="#EE4C7C" strokeWidth="1.5" rx="3" />
            <text x="45" y="26" fill="#E3E2DF" fontSize="8" fontWeight="bold" textAnchor="middle">SHARDING</text>
            <text x="45" y="41" fill="#E3AFBC" fontSize="8" fontWeight="bold" textAnchor="middle">ENGINE</text>
          </g>

          <g transform="translate(290, 82)">
            <rect width="80" height="60" fill="#5D001E" stroke="#9A1750" strokeWidth="1.5" rx="3" />
            <text x="40" y="26" fill="#E3E2DF" fontSize="8" fontWeight="bold" textAnchor="middle">PARTITION</text>
            <text x="40" y="41" fill="#EE4C7C" fontSize="8" fontWeight="bold" textAnchor="middle">01 / 02</text>
          </g>

          <text x="15" y="22" fill="#E3AFBC" fontSize="7" opacity="0.7">SYS_LOAD: NORMAL</text>
          <text x="315" y="22" fill="#EE4C7C" fontSize="7" opacity="0.8">RUST WORKER</text>
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 400 225" className="w-full h-full bg-slate-950 font-mono select-none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#020617" />
          
          <g stroke="#9A1750" strokeWidth="1" strokeOpacity="0.5">
            <line x1="60" y1="70" x2="140" y2="50" />
            <line x1="60" y1="70" x2="140" y2="110" />
            <line x1="60" y1="150" x2="140" y2="110" />
            <line x1="60" y1="150" x2="140" y2="170" />
            
            <line x1="140" y1="50" x2="220" y2="110" stroke="#EE4C7C" strokeWidth="1.5" />
            <line x1="140" y1="110" x2="220" y2="110" />
            <line x1="140" y1="170" x2="220" y2="110" />
          </g>

          <circle cx="60" cy="70" r="8" fill="#5D001E" stroke="#9A1750" strokeWidth="1.5" />
          <circle cx="60" cy="150" r="8" fill="#5D001E" stroke="#9A1750" strokeWidth="1.5" />

          <circle cx="140" cy="50" r="8" fill="#5D001E" stroke="#EE4C7C" strokeWidth="1.5" />
          <circle cx="140" cy="110" r="8" fill="#5D001E" stroke="#E3AFBC" strokeWidth="1.5" />
          <circle cx="140" cy="170" r="8" fill="#5D001E" stroke="#9A1750" strokeWidth="1.5" />

          <circle cx="220" cy="110" r="10" fill="#5D001E" stroke="#EE4C7C" strokeWidth="2" className="animate-pulse" />

          <g transform="translate(260, 40)">
            <rect width="120" height="140" fill="#5D001E" stroke="#9A1750" strokeWidth="1" rx="4" />
            <text x="60" y="20" fill="#E3E2DF" fontSize="8" fontWeight="bold" textAnchor="middle">LOSS FEEDBACK</text>
            
            <line x1="20" y1="110" x2="105" y2="110" stroke="#E3AFBC" strokeWidth="1" />
            <line x1="20" y1="40" x2="20" y2="110" stroke="#E3AFBC" strokeWidth="1" />

            <path d="M 25 45 Q 40 90 70 100 T 100 105" fill="none" stroke="#EE4C7C" strokeWidth="2" />
            <circle cx="100" cy="105" r="3" fill="#EE4C7C" />
            <text x="60" y="126" fill="#EE4C7C" fontSize="7" textAnchor="middle">CONVERGED (0.01)</text>
          </g>

          <text x="15" y="22" fill="#E3AFBC" fontSize="7" opacity="0.7">MODEL: TELEMETRY_AI</text>
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 400 225" className="w-full h-full bg-slate-950 font-mono select-none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#020617" />
          
          <g transform="translate(30, 40)">
            <rect width="140" height="140" fill="#5D001E" stroke="#9A1750" strokeWidth="1" rx="4" />
            <text x="70" y="20" fill="#E3E2DF" fontSize="8" fontWeight="bold" textAnchor="middle">COLUMNAR SCHEMA</text>
            
            <g transform="translate(15, 35)">
              <rect width="110" height="18" fill="#9A1750" fillOpacity="0.2" stroke="#9A1750" strokeWidth="1" />
              <text x="10" y="12" fill="#E3AFBC" fontSize="7">0x0A92  |  INT64</text>
              <rect width="110" height="18" y="25" fill="#5D001E" stroke="#E3AFBC" strokeWidth="1" strokeOpacity="0.4" />
              <text x="10" y="37" fill="#E3E2DF" fontSize="7">0x0B81  |  VARCHAR</text>
              <rect width="110" height="18" y="50" fill="#9A1750" fillOpacity="0.2" stroke="#EE4C7C" strokeWidth="1" />
              <text x="10" y="62" fill="#EE4C7C" fontSize="7">0x0C77  |  DECIMAL</text>
            </g>
            <text x="70" y="126" fill="#E3AFBC" fontSize="7" textAnchor="middle">INDEXING PARQUET SHARDS</text>
          </g>

          <g transform="translate(200, 40)">
            <rect width="170" height="140" fill="#5D001E" stroke="#EE4C7C" strokeWidth="1" rx="4" />
            <text x="85" y="20" fill="#E3E2DF" fontSize="8" fontWeight="bold" textAnchor="middle">QUERY COMPILER</text>

            <g transform="translate(15, 40)">
              <rect width="140" height="22" fill="#9A1750" stroke="#EE4C7C" strokeWidth="1" rx="2" />
              <text x="70" y="14" fill="#E3E2DF" fontSize="7" textAnchor="middle">AST PARSING</text>
              <line x1="70" y1="22" x2="70" y2="35" stroke="#EE4C7C" strokeWidth="1" strokeDasharray="3,3" />
              <rect width="140" height="22" y="35" fill="#020617" stroke="#E3AFBC" strokeWidth="1" rx="2" />
              <text x="70" y="49" fill="#E3AFBC" fontSize="7" textAnchor="middle">CLICKHOUSE INGESTION</text>
            </g>

            <rect x="25" y="110" width="120" height="18" fill="#EE4C7C" fillOpacity="0.1" stroke="#EE4C7C" strokeWidth="1" />
            <text x="85" y="122" fill="#EE4C7C" fontSize="7" fontWeight="bold" textAnchor="middle">EXEC SPEED: 11.2ms</text>
          </g>

          <text x="15" y="22" fill="#E3AFBC" fontSize="7" opacity="0.7">DB_CON: CLICKHOUSE_LIVE</text>
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 400 225" className="w-full h-full bg-slate-950 font-mono select-none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#020617" />
          
          <circle cx="80" cy="112" r="25" fill="#5D001E" stroke="#9A1750" strokeWidth="2" />
          <text x="80" y="115" fill="#E3E2DF" fontSize="8" fontWeight="bold" textAnchor="middle">VPC RT</text>

          <path d="M 105 112 L 180 60 M 105 112 L 180 112 M 105 112 L 180 164" stroke="#EE4C7C" strokeWidth="1.5" strokeDasharray="4,4" />

          <g transform="translate(180, 30)">
            <rect width="180" height="40" fill="#5D001E" stroke="#9A1750" strokeWidth="1" rx="4" />
            <circle cx="20" cy="20" r="6" fill="#10B981" />
            <text x="40" y="24" fill="#E3E2DF" fontSize="8" fontWeight="bold">POD-GATEWAY-01</text>
            <text x="145" y="24" fill="#E3AFBC" fontSize="7">100% OK</text>
          </g>

          <g transform="translate(180, 92)">
            <rect width="180" height="40" fill="#5D001E" stroke="#EE4C7C" strokeWidth="1" rx="4" />
            <circle cx="20" cy="20" r="6" fill="#10B981" />
            <text x="40" y="24" fill="#E3E2DF" fontSize="8" fontWeight="bold">POD-GATEWAY-02</text>
            <text x="145" y="24" fill="#E3AFBC" fontSize="7">100% OK</text>
          </g>

          <g transform="translate(180, 154)">
            <rect width="180" height="40" fill="#5D001E" stroke="#9A1750" strokeWidth="1" rx="4" />
            <circle cx="20" cy="20" r="6" fill="#10B981" className="animate-pulse" />
            <text x="40" y="24" fill="#E3E2DF" fontSize="8" fontWeight="bold">POD-DATA-STORAGE</text>
            <text x="145" y="24" fill="#EE4C7C" fontSize="7">SYNCING</text>
          </g>

          <text x="15" y="22" fill="#E3AFBC" fontSize="7" opacity="0.7">CLUSTERS: KUBERNETES_VPC</text>
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 400 225" className="w-full h-full bg-slate-950 font-mono select-none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#020617" />
          
          <g transform="translate(40, 40)">
            <rect width="130" height="140" fill="#5D001E" stroke="#9A1750" strokeWidth="1" rx="4" />
            <path d="M 65 35 Q 95 35 95 65 Q 95 105 65 120 Q 35 105 35 65 Q 35 35 65 35 Z" fill="none" stroke="#EE4C7C" strokeWidth="2" />
            <text x="65" y="70" fill="#EE4C7C" fontSize="14" fontWeight="bold" textAnchor="middle">SSL</text>
            <text x="65" y="130" fill="#E3AFBC" fontSize="7" textAnchor="middle">TLS DECRYPT SECURE</text>
          </g>

          <g transform="translate(190, 40)">
            <rect width="180" height="140" fill="#5D001E" stroke="#EE4C7C" strokeWidth="1" rx="4" />
            <text x="15" y="20" fill="#E3E2DF" fontSize="8" fontWeight="bold">GATEWAY ACCESS LOGS</text>

            <g transform="translate(15, 35)">
              <text x="0" y="15" fill="#10B981" fontSize="7">[200 OK] GET /api/v1/telemetry</text>
              <text x="0" y="32" fill="#E3AFBC" fontSize="7" opacity="0.8">[101 SW] UPGRADE WEBSOCKET</text>
              <text x="0" y="49" fill="#10B981" fontSize="7">[200 OK] POST /api/ingress</text>
              <text x="0" y="66" fill="#EE4C7C" fontSize="7">[401 ER] INSUFFICIENT_KEY_ROLE</text>
              <text x="0" y="83" fill="#10B981" fontSize="7">[200 OK] HEAD /index_shards</text>
            </g>
          </g>

          <text x="15" y="22" fill="#E3AFBC" fontSize="7" opacity="0.7">NETWORK: AWS_INGRESS_SEC</text>
        </svg>
      );
    default:
      return null;
  }
};

export const Hero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(2);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === workItems.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 seconds autoplay as requested
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? workItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === workItems.length - 1 ? 0 : prev + 1));
  };

  const getDisplayItems = () => {
    const items = [];
    for (let i = 0; i < visibleCards; i++) {
      const idx = (activeIndex + i) % workItems.length;
      items.push({ item: workItems[idx], index: idx });
    }
    return items;
  };

  return (
    <section id="home" className="min-h-screen pt-40 pb-36 flex flex-col items-center justify-center relative overflow-hidden gradient-mesh">
      {/* Structural layout vertical border grids */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-brand-grey/15 hidden lg:block" />
      <div className="absolute top-0 right-12 w-[1px] h-full bg-brand-grey/15 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center relative z-10">
        
        {/* Category Label - Standardized Accent Highlight */}
        <div className="border border-brand-teal text-brand-teal px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest mb-8 bg-brand-teal/5 select-none">
          Data Engineering &amp; Real-time AI Infrastructures
        </div>
        
        {/* Centered Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-teal leading-tight tracking-tight mb-6 max-w-4xl font-heading">
          Unlock Your Data's Potential with <span className="text-brand-brown">AiventraCore</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-sm md:text-base text-slate-600 font-sans font-medium mb-10 leading-relaxed max-w-2xl">
          Become the master of your enterprise pipelines. We build resilient, high-performance infrastructures engineered for stream ingestion, real-time transformations, and intelligence layers.
        </p>

        {/* Telemetry Metrics Grid (DataWars Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl py-8 mb-10 border-y border-brand-grey/30 select-none">
          <div className="flex flex-col items-center">
            <span className="font-heading font-extrabold text-brand-teal text-3xl md:text-4xl tracking-tight">1.2M+</span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 mt-2 font-mono">Ingress msg / sec</span>
          </div>
          <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-brand-grey/30 py-4 md:py-0">
            <span className="font-heading font-extrabold text-brand-brown text-3xl md:text-4xl tracking-tight">99.99%</span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 mt-2 font-mono">Pipeline SLA Uptime</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-heading font-extrabold text-brand-teal text-3xl md:text-4xl tracking-tight">&lt; 15ms</span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 mt-2 font-mono">Median Latency</span>
          </div>
        </div>

        {/* CTA Trigger - Unified to solid Request Demo */}
        <div className="flex flex-col items-center gap-3 mb-16">
          <button 
            onClick={handleScrollToContact}
            className="bg-brand-brown hover:bg-brand-teal text-brand-offwhite px-8 py-4 font-bold text-xs uppercase tracking-widest transition-all duration-300 ease-in-out border border-brand-brown shadow-lg hover:shadow-brand-brown/25 cursor-pointer rounded-none"
          >
            Request Demo
          </button>
          <span className="text-[9px] text-slate-500 font-mono select-none">
            Interact with live pipeline canvas below.
          </span>
        </div>

        {/* Sliced Project Cards Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
          {getDisplayItems().map(({ item, index }) => (
            <div 
              key={`${index}-${activeIndex}`} 
              className="bg-slate-900 border border-brand-grey/25 relative select-none rounded-t-lg overflow-hidden flex flex-col h-full browser-pulse animate-card-fade hover:scale-[1.01] hover:border-brand-teal transition-all duration-300 group"
            >
              {/* Browser Header Bar */}
              <div className="bg-slate-950 border-b border-brand-grey/15 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
                </div>
                <div className="bg-slate-900 border border-brand-grey/10 text-slate-400 text-[8px] font-mono py-0.5 px-2 rounded flex items-center gap-1">
                  <Monitor size={8} className="text-slate-500" />
                  <span>{item.url}</span>
                </div>
              </div>
              
              {/* Viewport Image Area replaced with Custom SVG Architectures */}
              <div className="w-full bg-slate-950 aspect-video relative overflow-hidden flex-shrink-0">
                <ProjectDiagram index={index} />
              </div>

              {/* Card Content body */}
              <div className="p-5 flex flex-col justify-between flex-grow text-left bg-slate-950 border-t border-brand-grey/15 relative">
                <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-brand-teal bg-brand-teal/20 px-2 py-0.5 font-bold rounded-sm">
                      {item.category}
                    </span>
                    <span className="text-[8px] font-mono text-slate-500">
                      PROJ 0{index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-sm md:text-base font-extrabold text-brand-offwhite leading-tight tracking-tight mb-2 font-heading group-hover:text-brand-grey transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-300 text-[11px] font-sans leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="relative z-10 border-t border-brand-grey/10 pt-3 mt-auto flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.map((t, tIdx) => (
                      <span key={tIdx} className="bg-brand-offwhite/5 border border-brand-offwhite/10 text-slate-400 text-[8px] font-mono px-2 py-0.5 uppercase tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={`https://${item.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[8px] font-mono font-bold text-brand-teal hover:text-brand-grey uppercase tracking-widest transition-colors duration-200"
                  >
                    <span>Inspect Node</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Unified Controls & Dot indicators centered below */}
        <div className="flex items-center justify-center gap-6 mt-4 select-none">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 border border-brand-grey/40 hover:border-brand-teal text-brand-teal hover:bg-brand-teal/5 flex items-center justify-center transition-all cursor-pointer bg-white hover:translate-y-[-2px] rounded-none shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {workItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx 
                    ? 'bg-brand-teal w-6' 
                    : 'bg-brand-grey/40 hover:bg-brand-grey w-2'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-10 h-10 border border-brand-grey/40 hover:border-brand-teal text-brand-teal hover:bg-brand-teal/5 flex items-center justify-center transition-all cursor-pointer bg-white hover:translate-y-[-2px] rounded-none shadow-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};
