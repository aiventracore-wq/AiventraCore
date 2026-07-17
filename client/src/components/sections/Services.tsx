import React from 'react';
import { Database, Cloud, BrainCircuit, BarChart3, ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  title: string;
  icon: React.ComponentType<any>;
  desc: string;
  points: string[];
}

export const Services: React.FC = () => {
  const services: ServiceItem[] = [
    {
      title: 'Data Engineering',
      icon: Database,
      desc: 'Robust pipelines and scalable frameworks built to support high-throughput streams.',
      points: ['Orchestration & ETL/ELT', 'Real-time Stream Ingestion', 'Schema Registry & Storage']
    },
    {
      title: 'Cloud Solutions',
      icon: Cloud,
      desc: 'Highly resilient multi-cloud architecture engineered to withstand high enterprise loads.',
      points: ['Secure Virtual Networks', 'Kubernetes Orchestration', 'Infrastructure as Code']
    },
    {
      title: 'AI & Analytics',
      icon: BrainCircuit,
      desc: 'Advanced predictive structures and intelligent models tailored to industrial objectives.',
      points: ['Machine Learning Pipelines', 'Neural Network Training', 'Natural Language Systems']
    },
    {
      title: 'Business Intelligence',
      icon: BarChart3,
      desc: 'Clean dashboard representations presenting telemetry metrics in real-time.',
      points: ['Custom Metric Telemetry', 'Sub-second Query Speeds', 'Executive Data Reporting']
    }
  ];

  return (
    <section id="services" className="py-36 bg-white border-y border-brand-grey/20 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-brand-brown font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
              [ Core Capabilities ]
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-teal tracking-tight">
              Modular Data Services Tailored for Enterprise Performance
            </h2>
          </div>
          <p className="text-slate-500 font-medium text-sm md:max-w-xs leading-relaxed">
            Eliminate operational bottlenecks. We map raw events into clean, scalable cloud telemetry.
          </p>
        </div>

        {/* 4-Column Asymmetric CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div 
                key={idx}
                className="group border border-brand-grey/25 bg-brand-offwhite/10 p-8 flex flex-col justify-between transition-all duration-300 ease-in-out hover:border-brand-teal hover:bg-white hover:shadow-xl hover:scale-[1.01] hover:-translate-y-1.5 min-h-[360px]"
              >
                <div>
                  {/* Icon Block */}
                  <div className="w-12 h-12 border border-brand-teal/20 flex items-center justify-center mb-6 bg-brand-teal/5 text-brand-teal group-hover:bg-brand-teal group-hover:text-brand-offwhite transition-all duration-300">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-brand-teal mb-3 group-hover:text-brand-teal transition-all">
                    {svc.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-600 text-xs font-sans leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                {/* Sub points list */}
                <div>
                  <ul className="space-y-2 border-t border-brand-grey/20 pt-4 mb-4">
                    {svc.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-[11px] text-slate-500 font-sans flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-teal/40" />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  {/* Minimal link indicator */}
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-brand-brown mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
                    <span>Explore Structure</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
