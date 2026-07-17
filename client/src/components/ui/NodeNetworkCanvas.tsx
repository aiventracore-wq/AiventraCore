import React, { useEffect, useRef } from 'react';

interface TargetNode {
  x: number;
  y: number;
  name: string;
  role: string;
  color: string;
  pulse: number;
  alertMsg: string;
}

interface Packet {
  id: number;
  x: number;
  y: number;
  targetIndex: number;
  size: number;
  speed: number;
  color: string;
  pulseTimer: number;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
}


export const NodeNetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let packets: Packet[] = [];
    let bursts: BurstParticle[] = [];
    let mouse = { x: -1000, y: -1000 };
    let packetIdCounter = 0;
    
    // Live system stats
    let bytesProcessed = 10485760; // Start at 10MB
    let logs: string[] = [
      '[SYSTEM] Kafka broker node-1 active.',
      '[METRIC] Ingestion telemetry pipeline configured.',
      '[SYSTEM] SparkSession instantiated successfully.'
    ];

    // Define Stationary Pipeline Nodes
    let stations: TargetNode[] = [];

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || 500;
      canvas.height = rect?.height || 500;
      initStations();
    };

    const initStations = () => {
      const w = canvas.width;
      const h = canvas.height;
      stations = [
        {
          x: w * 0.22,
          y: h * 0.45,
          name: 'Kafka Ingress',
          role: 'API GATEWAY',
          color: '#9A1750', // brand.teal
          pulse: 0,
          alertMsg: 'DECRYPTED'
        },
        {
          x: w * 0.52,
          y: h * 0.60,
          name: 'Spark ETL Core',
          role: 'PROCESSOR',
          color: '#5D001E', // brand.brown
          pulse: 0,
          alertMsg: 'ETL_MERGE'
        },
        {
          x: w * 0.80,
          y: h * 0.35,
          name: 'OLAP Columnar',
          role: 'STORAGE',
          color: '#9A1750', // brand.teal
          pulse: 0,
          alertMsg: 'DB_COMMIT'
        }
      ];
    };

    const addLog = (msg: string) => {
      logs.push(msg);
      if (logs.length > 5) logs.shift();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // User can click to inject bulk data load packets
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      addLog(`[USER] Injecting cluster bulk load.`);
      
      // Spawn 5 fast packets
      for (let i = 0; i < 5; i++) {
        packets.push({
          id: packetIdCounter++,
          x: clickX + (Math.random() - 0.5) * 20,
          y: clickY + (Math.random() - 0.5) * 20,
          targetIndex: 0,
          size: Math.random() * 3 + 3,
          speed: Math.random() * 1.5 + 2.5,
          color: '#5D001E',
          pulseTimer: 0
        });
      }
    };

    // Spawn packets at regular intervals
    let packetTimer = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Background code nodes clean space

      // 2. Draw static pipeline blueprint lines (The tracks)
      ctx.beginPath();
      ctx.setLineDash([6, 6]);
      ctx.moveTo(0, h * 0.45);
      if (stations.length === 3) {
        ctx.lineTo(stations[0].x, stations[0].y);
        ctx.lineTo(stations[1].x, stations[1].y);
        ctx.lineTo(stations[2].x, stations[2].y);
        ctx.lineTo(w, h * 0.35);
      }
      ctx.strokeStyle = 'rgba(227, 175, 188, 0.35)'; // brand.grey
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      // 3. Update & Draw Stationary Stations
      stations.forEach((st) => {
        // Pulse animation handler
        if (st.pulse > 0) st.pulse -= 0.05;
        
        ctx.beginPath();
        const baseRadius = 10;
        const outerPulse = baseRadius + st.pulse * 12;
        
        // Draw outer pulse wave
        ctx.arc(st.x, st.y, outerPulse, 0, Math.PI * 2);
        ctx.strokeStyle = st.color === '#9A1750' ? `rgba(154, 23, 80, ${st.pulse})` : `rgba(93, 0, 30, ${st.pulse})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw outer static ring
        ctx.beginPath();
        ctx.arc(st.x, st.y, baseRadius + 3, 0, Math.PI * 2);
        ctx.strokeStyle = st.color;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Draw inner core
        ctx.beginPath();
        ctx.arc(st.x, st.y, baseRadius - 2, 0, Math.PI * 2);
        ctx.fillStyle = st.color;
        ctx.fill();

        // Labels removed for clean visual node rendering
      });

      // 4. Ingest new stream packets
      packetTimer++;
      if (packetTimer > 50) {
        packetTimer = 0;
        packets.push({
          id: packetIdCounter++,
          x: -10,
          y: h * 0.45,
          targetIndex: 0,
          size: Math.random() * 2.5 + 2,
          speed: Math.random() * 0.8 + 1.2,
          color: '#E3AFBC', // grey initially
          pulseTimer: 0
        });
      }

      // 5. Update & Draw Packets (flowing along targets)
      const targets = [
        { x: stations[0]?.x || 0, y: stations[0]?.y || 0 },
        { x: stations[1]?.x || 0, y: stations[1]?.y || 0 },
        { x: stations[2]?.x || 0, y: stations[2]?.y || 0 },
        { x: w + 20, y: h * 0.35 }
      ];

      packets = packets.filter((pkt) => {
        const target = targets[pkt.targetIndex];
        if (!target) return false;

        const dx = target.x - pkt.x;
        const dy = target.y - pkt.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Move towards target
        if (dist > pkt.speed) {
          pkt.x += (dx / dist) * pkt.speed;
          pkt.y += (dy / dist) * pkt.speed;
        } else {
          // Reached station! Trigger processor triggers
          pkt.targetIndex++;
          const reachedIdx = pkt.targetIndex - 1;

          if (reachedIdx < 3 && stations[reachedIdx]) {
            const station = stations[reachedIdx];
            station.pulse = 1.0;
            bytesProcessed += Math.floor(Math.random() * 4096) + 1024; // Process bytes

            // Morph packet properties representing transformation state
            pkt.color = station.color;
            pkt.speed += 0.3; // Speed up through pipelines

            // Floating log metrics push removed

            // Add burst sub-particles
            for (let k = 0; k < 8; k++) {
              const angle = Math.random() * Math.PI * 2;
              const spd = Math.random() * 2 + 1;
              bursts.push({
                x: station.x,
                y: station.y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                color: station.color,
                life: 1.0,
                maxLife: Math.random() * 25 + 15
              });
            }

            if (reachedIdx === 0) {
              addLog(`[INGEST] Packet decrypted, size: ${(pkt.size * 8).toFixed(1)} KB`);
            } else if (reachedIdx === 1) {
              addLog(`[ETL] Event schema validated, execution: 2.1ms`);
            } else if (reachedIdx === 2) {
              addLog(`[DB] Column partition loaded. commit: OK`);
            }
          }
        }

        // Draw packet node particle
        ctx.beginPath();
        ctx.arc(pkt.x, pkt.y, pkt.size, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.fill();

        // Glow ring around packet
        ctx.beginPath();
        ctx.arc(pkt.x, pkt.y, pkt.size + 2, 0, Math.PI * 2);
        ctx.strokeStyle = `${pkt.color}33`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Interactive mouse connection line (Faint fibers)
        if (mouse.x > -500) {
          const mdx = pkt.x - mouse.x;
          const mdy = pkt.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 80) {
            ctx.beginPath();
            ctx.moveTo(pkt.x, pkt.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = 'rgba(93, 0, 30, 0.15)'; // faint burgundy/red
            ctx.lineWidth = 0.5;
            ctx.stroke();
            
            // Draw magnetic field pull effect
            pkt.x += (mdx / mdist) * -0.2;
            pkt.y += (mdy / mdist) * -0.2;
          }
        }

        // Keep packet if it has not left the screen
        return pkt.x < w + 10;
      });

      // 6. Update & Draw Burst Sub-Particles
      bursts = bursts.filter((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.life -= 1 / b.maxLife;

        ctx.beginPath();
        ctx.arc(b.x, b.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.globalAlpha = Math.max(0, b.life);
        ctx.fill();
        ctx.globalAlpha = 1.0; // reset

        return b.life > 0;
      });

      // Floating text alerts rendering loop removed

      // Overlay elements removed for clean minimal layout

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);

    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full border border-brand-grey/30 relative bg-white/60 overflow-hidden select-none">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block cursor-pointer"
      />
    </div>
  );
};
