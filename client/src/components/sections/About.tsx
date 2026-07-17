import { useState, useEffect } from 'react';
import { Layers, Database, Cpu, CheckSquare, Play, RefreshCw, Terminal, CheckCircle2, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import rakesh from '../../assets/rakesh.jpg';
import devVikram from '../../assets/dev_vikram.png';
import devSarah from '../../assets/dev_sarah.png';
import devElena from '../../assets/dev_elena.png';
import devMarcus from '../../assets/dev_marcus.png';

interface Stage {
  name: string;
  icon: React.ComponentType<any>;
  subtitle: string;
  tech: string[];
  metrics: string;
  details: string;
}

interface Developer {
  name: string;
  role: string;
  id: string;
  image: string;
  status: string;
  bio: string;
  skills: string[];
}

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'builder'>('blueprint');
  const [activeStage, setActiveStage] = useState(0);

  const developers: Developer[] = [
    {
      name: 'Rakesh Sharma',
      role: 'Director of Data & AI Systems',
      id: 'SYS-0x01',
      image: rakesh,
      status: 'Active / Leader',
      bio: 'Seasoned Data and AI leader with 19+ years of experience specializing in building scalable data solutions, leading technical teams, and delivering business insights.',
      skills: ['AWS', 'Databricks', 'Snowflake', 'Apache Spark', 'Python', 'Power BI']
    },
    {
      name: 'Vikram Malhotra',
      role: 'Principal Infrastructure Architect',
      id: 'SYS-0x09',
      image: devVikram,
      status: 'Node Active',
      bio: "Designed AiventraCore's zero-copy stream deserializer and sharding configuration protocols for real-time Kafka ingest nodes.",
      skills: ['Rust', 'Apache Kafka', 'Wasm', 'Kubernetes']
    },
    {
      name: 'Sarah Chen',
      role: 'Lead Data Platform Engineer',
      id: 'SYS-0x12',
      image: devSarah,
      status: 'Pipeline Syncing',
      bio: 'Architected the parallel ETL mapping layer that streams and transforms over 1.2M metrics/sec with automated schema evolution.',
      skills: ['Apache Spark', 'ClickHouse', 'dbt', 'Golang']
    },
    {
      name: 'Dr. Elena Rostova',
      role: 'Neural Systems Designer',
      id: 'SYS-0x04',
      image: devElena,
      status: 'Inference Hot',
      bio: 'Optimizes deep learning inference pipelines directly running within high-throughput stream topologies using custom CUDA optimization.',
      skills: ['PyTorch', 'ONNX', 'CUDA', 'Python']
    },
    {
      name: 'Marcus Vance',
      role: 'Real-time API Coordinator',
      id: 'SYS-0x17',
      image: devMarcus,
      status: 'Telemetry Live',
      bio: 'Oversees the ultra-low latency WebSocket synchronization layers and client-facing live analytics dashboard integration.',
      skills: ['TypeScript', 'GraphQL', 'WebSockets', 'Elixir']
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(2);

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
    const maxIndex = developers.length - visibleCards;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [activeIndex, visibleCards, developers.length]);

  const handlePrev = () => {
    const maxIndex = developers.length - visibleCards;
    setActiveIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    const maxIndex = developers.length - visibleCards;
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const getDisplayDevelopers = () => {
    const items = [];
    for (let i = 0; i < visibleCards; i++) {
      const idx = (activeIndex + i) % developers.length;
      items.push({ dev: developers[idx], index: idx });
    }
    return items;
  };

  // Pipeline Builder states
  const [source, setSource] = useState('iot');
  const [operation, setOperation] = useState('dedup');
  const [destination, setDestination] = useState('clickhouse');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputLogs, setOutputLogs] = useState<string[]>([]);
  const [report, setReport] = useState<{
    throughput: string;
    latency: string;
    compression: string;
    health: string;
  } | null>(null);

  const stages: Stage[] = [
    {
      name: 'Event Stream Ingestion',
      icon: Layers,
      subtitle: 'Telemetry Ingress',
      tech: ['Apache Kafka', 'WebSockets', 'AWS Ingress'],
      metrics: '1.2M events/sec ingress rate • 8ms buffer latency',
      details: 'High-throughput data nodes capture structured and unstructured telemetry directly from application runtimes and IoT clusters without blocking operations.'
    },
    {
      name: 'Data Orchestration & ETL',
      icon: Database,
      subtitle: 'Stream Processing',
      tech: ['Apache Spark', 'dbt', 'Apache Airflow'],
      metrics: 'Zero-loss transformations • Auto schema evolution',
      details: 'Pipelines sanitize, deduplicate, and merge events into organized tables. Flow engines execute multi-stage aggregations and schema validations in flight.'
    },
    {
      name: 'Neural Model Optimization',
      icon: Cpu,
      subtitle: 'AI/ML Analytics Systems',
      tech: ['PyTorch', 'ONNX Runtime', 'CUDA kernels'],
      metrics: 'Sub-30ms inference latency • Retraining loops',
      details: 'Data feeds custom PyTorch neural configurations. We construct lightweight pipelines that apply statistical inferences to user logs on the fly.'
    },
    {
      name: 'Business Intelligence Layers',
      icon: CheckSquare,
      subtitle: 'Analytics Dashboards',
      tech: ['ClickHouse', 'Vector Indexes', 'React Charts'],
      metrics: 'Sub-second search queries • Custom metric dashboards',
      details: 'Processed insights are stored in columnar engines, enabling stakeholders to run ad-hoc analytics queries and inspect operational dashboards instantly.'
    }
  ];

  const handleRunPipeline = () => {
    setIsRunning(true);
    setProgress(0);
    setReport(null);
    setOutputLogs([`[0.0s] Initializing ${source.toUpperCase()}_STREAM consumer connection...`]);

    const logSteps = [
      { time: 300, log: `[0.3s] Applying transformation filter: [${operation.toUpperCase()}]` },
      { time: 700, log: `[0.7s] Running distributed schema mapping on partitions...` },
      { time: 1100, log: `[1.1s] Initializing write buffer blocks for destination: ${destination.toUpperCase()}` },
      { time: 1500, log: `[1.5s] Batch loaded successfully. Running checksum validations...` },
      { time: 1900, log: `[1.9s] Offset committed. Synchronizing indices.` }
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 4;
      setProgress(currentProgress);

      logSteps.forEach((step) => {
        if (currentProgress === Math.floor((step.time / 2000) * 100)) {
          setOutputLogs((prev) => [...prev, step.log]);
        }
      });

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsRunning(false);
        setOutputLogs((prev) => [...prev, `[2.0s] PIPELINE VERIFIED. INGESTION TELEMETRY SUCCESS.`]);

        let throughput = '12,400 msg/s';
        let latency = '4.2ms';
        let compression = '3.1x';
        if (source === 'clickstream') {
          throughput = '78,920 msg/s';
          latency = '6.4ms';
          compression = '4.8x';
        } else if (source === 'financial') {
          throughput = '5,100 msg/s';
          latency = '1.8ms';
          compression = '1.9x';
        }

        if (operation === 'pii') {
          latency = (parseFloat(latency) + 1.2).toFixed(1) + 'ms'; 
        } else if (operation === 'neural') {
          latency = (parseFloat(latency) + 14.5).toFixed(1) + 'ms'; 
          throughput = (parseFloat(throughput.replace(/,/g, '')) * 0.85).toFixed(0) + ' msg/s';
        }

        setReport({
          throughput,
          latency,
          compression,
          health: '100% Integrity Validated'
        });
      }
    }, 80);
  };

  return (
    <section id="about" className="py-36 bg-brand-offwhite relative gradient-mesh">
      {/* Visual layouts borders */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-brand-grey/15 hidden lg:block" />
      <div className="absolute top-0 right-12 w-[1px] h-full bg-brand-grey/15 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Philosophy / Mission (Left Column - 6 Cols) */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <span className="text-brand-brown font-mono text-xs uppercase tracking-widest font-semibold mb-3">
            [ Company Philosophy ]
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-teal tracking-tight mb-8">
            Resilient Infrastructure Built for Mathematical Precision &amp; Infinite Scale
          </h2>
          
          <div className="space-y-6 text-slate-600 font-sans text-sm md:text-base leading-relaxed">
            <p>
              At AiventraCore, we operate at the convergence of data processing systems and machine learning. We believe enterprise growth depends on clean, low-latency, and query-optimized data platforms.
            </p>
            <p>
              Instead of relying on boilerplate, non-scalable wrappers, our engineers design custom, dedicated pipelines. Every node network, cloud security VPC boundary, and analytics dashboard is tuned for maximum throughput.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-brand-grey/30">
              <div>
                <span className="block font-heading font-extrabold text-brand-teal text-xl md:text-2xl">99.99%</span>
                <span className="text-xs text-slate-500 font-medium">Data Pipeline Uptime SLA</span>
              </div>
              <div>
                <span className="block font-heading font-extrabold text-brand-teal text-xl md:text-2xl">&lt; 15ms</span>
                <span className="text-xs text-slate-500 font-medium">Median Aggregation Latency</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline / Diagram (Right Column - 6 Cols) */}
        <div className="lg:col-span-6 flex flex-col bg-white border border-brand-grey/30 p-8 shadow-sm">
          
          {/* Tab Selection */}
          <div className="flex border-b border-brand-grey/30 mb-6 font-sans">
            <button 
              onClick={() => setActiveTab('blueprint')}
              className={`flex-1 pb-3 text-[10px] font-bold uppercase tracking-wider text-center border-b-2 transition-all cursor-pointer ${
                activeTab === 'blueprint' 
                  ? 'border-brand-teal text-brand-teal' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              System Flow Blueprint
            </button>
            <button 
              onClick={() => setActiveTab('builder')}
              className={`flex-1 pb-3 text-[10px] font-bold uppercase tracking-wider text-center border-b-2 transition-all cursor-pointer ${
                activeTab === 'builder' 
                  ? 'border-brand-teal text-brand-teal' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Interactive Pipeline Builder
            </button>
          </div>

          {/* TAB 1: BLUEPRINT TIMELINE */}
          {activeTab === 'blueprint' && (
            <>
              <div className="flex flex-col gap-4 mb-8">
                {stages.map((stage, idx) => {
                  const StageIcon = stage.icon;
                  const isActive = activeStage === idx;
                  return (
                    <div 
                      key={idx}
                      onClick={() => setActiveStage(idx)}
                      className={`flex items-start gap-4 p-4 border transition-all duration-300 cursor-pointer select-none ${
                        isActive 
                          ? 'border-brand-teal bg-brand-teal/5 text-brand-teal shadow-sm translate-x-2' 
                          : 'border-brand-grey/25 bg-transparent hover:border-brand-grey text-slate-700'
                      }`}
                    >
                      <div className={`w-8 h-8 border flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isActive 
                          ? 'border-brand-teal bg-brand-teal text-brand-offwhite' 
                          : 'border-brand-grey bg-brand-offwhite text-brand-teal'
                      }`}>
                        <StageIcon size={16} />
                      </div>

                      <div>
                        <div className="text-xs font-mono font-bold tracking-tight opacity-50 uppercase">
                          Stage 0{idx + 1} // {stage.subtitle}
                        </div>
                        <div className="font-heading font-bold text-sm md:text-base tracking-tight mt-0.5">
                          {stage.name}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active Stage Blueprint Details */}
              <div className="border-t border-brand-grey/30 pt-6 min-h-[160px] flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {stages[activeStage].tech.map((t, idx) => (
                      <span key={idx} className="bg-brand-teal/10 text-brand-teal text-[10px] font-mono px-2 py-0.5 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-600 text-xs font-sans leading-relaxed mb-4">
                    {stages[activeStage].details}
                  </p>
                </div>
                
                <div className="bg-brand-offwhite border-l-2 border-brand-brown p-3 font-mono text-[10px] text-brand-brown select-none">
                  <span className="font-bold">SYSTEM TELEMETRY:</span> {stages[activeStage].metrics}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: PIPELINE BUILDER PLAYGROUND */}
          {activeTab === 'builder' && (
            <div className="flex flex-col gap-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Source Selection */}
                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-wider text-slate-400 mb-2 select-none">
                    1. Ingress Stream
                  </label>
                  <div className="flex flex-col gap-2">
                    {[
                      { id: 'iot', name: 'IoT Streams' },
                      { id: 'clickstream', name: 'Clickstream' },
                      { id: 'financial', name: 'Trans. Logs' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        disabled={isRunning}
                        onClick={() => setSource(item.id)}
                        className={`text-left text-xs p-2 border transition-all cursor-pointer font-sans font-semibold bg-brand-offwhite/30 ${
                          source === item.id 
                            ? 'border-brand-teal bg-brand-teal/5 text-brand-teal' 
                            : 'border-brand-grey/35 text-slate-600 hover:border-brand-grey'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Operation Selection */}
                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-wider text-slate-400 mb-2 select-none">
                    2. ETL Operation
                  </label>
                  <div className="flex flex-col gap-2">
                    {[
                      { id: 'dedup', name: 'Deduplicate' },
                      { id: 'pii', name: 'PII Scrubbing' },
                      { id: 'neural', name: 'ML Enrich' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        disabled={isRunning}
                        onClick={() => setOperation(item.id)}
                        className={`text-left text-xs p-2 border transition-all cursor-pointer font-sans font-semibold bg-brand-offwhite/30 ${
                          operation === item.id 
                            ? 'border-brand-teal bg-brand-teal/5 text-brand-teal' 
                            : 'border-brand-grey/35 text-slate-600 hover:border-brand-grey'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Destination Selection */}
                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-wider text-slate-400 mb-2 select-none">
                    3. Destination DB
                  </label>
                  <div className="flex flex-col gap-2">
                    {[
                      { id: 'clickhouse', name: 'ClickHouse' },
                      { id: 'pinecone', name: 'Pinecone DB' },
                      { id: 'postgres', name: 'PostgreSQL' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        disabled={isRunning}
                        onClick={() => setDestination(item.id)}
                        className={`text-left text-xs p-2 border transition-all cursor-pointer font-sans font-semibold bg-brand-offwhite/30 ${
                          destination === item.id 
                            ? 'border-brand-teal bg-brand-teal/5 text-brand-teal' 
                            : 'border-brand-grey/35 text-slate-600 hover:border-brand-grey'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div>
                {!report && !isRunning ? (
                  <button
                    onClick={handleRunPipeline}
                    className="w-full bg-brand-teal hover:bg-brand-teal/95 text-brand-offwhite py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all rounded-none"
                  >
                    <Play size={14} />
                    <span>Compile &amp; Execute Pipeline</span>
                  </button>
                ) : isRunning ? (
                  <div className="space-y-2">
                    <div className="w-full bg-brand-grey/20 h-1.5 overflow-hidden">
                      <div 
                        className="bg-brand-brown h-full transition-all duration-100 ease-out" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-slate-400">
                      <span>COMPILING SHADERS &amp; CODE BUFFERS</span>
                      <span>{progress}%</span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => { setReport(null); setOutputLogs([]); }}
                    className="w-full border border-brand-teal text-brand-teal hover:bg-brand-teal/5 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all rounded-none"
                  >
                    <RefreshCw size={14} />
                    <span>Configure Next Stream</span>
                  </button>
                )}
              </div>

              {/* Logs output / report console */}
              <div className="border border-brand-grey/30 bg-brand-offwhite/50 p-4 font-mono text-[10px] leading-relaxed relative min-h-[120px]">
                <div className="absolute top-2 right-2 text-slate-400 flex items-center gap-1">
                  <Terminal size={10} />
                  <span className="text-[8px] tracking-wider select-none">STREAM_LOG</span>
                </div>
                
                <div className="space-y-1 mb-4 select-text">
                  {outputLogs.map((log, idx) => (
                    <div key={idx} className="text-slate-600">
                      {log}
                    </div>
                  ))}
                  {isRunning && (
                    <span className="inline-block w-1.5 h-3 bg-brand-brown animate-pulse ml-1" />
                  )}
                </div>

                {/* Finalized metrics summary */}
                {report && (
                  <div className="border-t border-brand-grey/20 pt-4 mt-2 grid grid-cols-2 gap-4">
                    <div className="bg-white border border-brand-grey/20 p-2.5 flex items-start gap-2 shadow-sm">
                      <CheckCircle2 size={14} className="text-brand-teal mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Throughput</span>
                        <span className="text-xs font-heading font-extrabold text-brand-teal">{report.throughput}</span>
                      </div>
                    </div>
                    <div className="bg-white border border-brand-grey/20 p-2.5 flex items-start gap-2 shadow-sm">
                      <CheckCircle2 size={14} className="text-brand-teal mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">End-to-End Latency</span>
                        <span className="text-xs font-heading font-extrabold text-brand-teal">{report.latency}</span>
                      </div>
                    </div>
                    <div className="bg-white border border-brand-grey/20 p-2.5 flex items-start gap-2 shadow-sm">
                      <CheckCircle2 size={14} className="text-brand-teal mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Data Compression</span>
                        <span className="text-xs font-heading font-extrabold text-brand-teal">{report.compression}</span>
                      </div>
                    </div>
                    <div className="bg-white border border-brand-grey/20 p-2.5 flex items-start gap-2 shadow-sm">
                      <CheckCircle2 size={14} className="text-brand-teal mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Ingest Health</span>
                        <span className="text-xs font-heading font-extrabold text-brand-teal">{report.health}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Horizontal Divider with increased breathing space */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 my-28">
        <div className="h-[1px] bg-brand-grey/20 w-full" />
      </div>

      {/* Engineering Core / Developer Section with top margin spacing */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 overflow-hidden mt-12">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 border border-brand-teal bg-brand-teal/5 text-brand-teal">
            <Users size={20} />
          </div>
          <div>
            <span className="text-brand-brown font-mono text-[10px] uppercase tracking-widest font-semibold block">
              [ Core Contributors ]
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-brand-teal tracking-tight">
              Architects of the Streaming Ledger
            </h3>
          </div>
        </div>

        {/* Sliced Developer Cards Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
          {getDisplayDevelopers().map(({ dev, index }) => (
            <div 
              key={`${index}-${activeIndex}`}
              className="w-full flex-shrink-0 animate-card-fade"
            >
              <div 
                className="card-elevation bg-white border border-brand-grey/30 p-6 flex flex-col sm:flex-row gap-6 transition-all duration-300 card-elevation-hover relative overflow-hidden h-full group"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-brand-teal/5 to-transparent rounded-bl-full pointer-events-none" />

                {/* Left Column: Photo & Tech Info */}
                <div className="w-full sm:w-28 flex-shrink-0 flex flex-col items-center select-none">
                  <div className="w-28 h-28 border-2 border-brand-teal bg-brand-offwhite relative overflow-hidden group-hover:border-brand-brown transition-colors duration-300">
                    <img 
                      src={dev.image} 
                      alt={dev.name} 
                      className="w-full h-full object-cover transition-all duration-500 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-brand-teal/90 text-brand-offwhite text-[7px] font-mono tracking-widest text-center py-0.5 uppercase">
                      {dev.id}
                    </div>
                  </div>
                  
                  {/* Status under photo */}
                  <div className="mt-3 flex items-center gap-1.5 bg-brand-offwhite/50 border border-brand-grey/25 px-2 py-0.5 rounded-sm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      {dev.status}
                    </span>
                  </div>
                </div>

                {/* Right Column: Profile Info & Tech Stack */}
                <div className="flex-grow flex flex-col justify-between text-left">
                  <div>
                    <h4 className="text-base font-extrabold text-brand-teal tracking-tight group-hover:text-brand-brown transition-colors duration-300">
                      {dev.name}
                    </h4>
                    <p className="text-[10px] text-brand-brown font-mono font-bold uppercase tracking-wider mb-2">
                      {dev.role}
                    </p>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed mb-4">
                      {dev.bio}
                    </p>
                  </div>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {dev.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="bg-brand-teal/5 border border-brand-teal/15 text-brand-teal text-[9px] font-mono px-2 py-0.5 uppercase font-semibold hover:bg-brand-teal hover:text-brand-offwhite transition-colors duration-150"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Unified Slider Controls & Indicator Dots */}
        <div className="flex items-center justify-center gap-6 mt-8 select-none">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 border border-brand-grey/40 hover:border-brand-teal text-brand-teal hover:bg-brand-teal/5 flex items-center justify-center transition-all cursor-pointer card-elevation hover:translate-y-[-2px] rounded-none"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: developers.length - visibleCards + 1 }).map((_, idx) => (
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
            className="w-10 h-10 border border-brand-grey/40 hover:border-brand-teal text-brand-teal hover:bg-brand-teal/5 flex items-center justify-center transition-all cursor-pointer card-elevation hover:translate-y-[-2px] rounded-none"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
