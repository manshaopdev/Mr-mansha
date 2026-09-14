import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Sparkles, X, Send, PhoneCall } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const AgencyMouseAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [fxEnabled, setFxEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  // Mouse coords & lerp coordinates
  const mouseRef = useRef({ x: -100, y: -100 });
  const lerpRef = useRef({ x: -100, y: -100 });
  const prevMouseRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<ClickRipple[]>([]);
  const nextRippleId = useRef(0);
  const [coords, setCoords] = useState({ x: -100, y: -100 });

  // Neon color palette matching Prime Plus: Indigo, Cyan/Sky, Amber/Gold
  const colors = [
    '99, 102, 241',  // Indigo
    '56, 189, 248',  // Sky cyan
    '245, 158, 11',  // Amber gold
    '168, 85, 247',  // Violet
  ];

  useEffect(() => {
    // Check for touch / pointer coarse devices
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setCoords({ x: e.clientX, y: e.clientY });

      // Calculate speed
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      // Spawn particles when moving
      if (fxEnabled && speed > 2) {
        const count = Math.min(Math.floor(speed / 8) + 1, 3);
        for (let i = 0; i < count; i++) {
          const chosenColor = colors[Math.floor(Math.random() * colors.length)];
          particlesRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 1.5 - dx * 0.08,
            vy: (Math.random() - 0.5) * 1.5 - dy * 0.08,
            size: Math.random() * 2.8 + 1.2,
            alpha: 0.9,
            color: chosenColor,
          });
        }
      }

      // Limit particle array size
      if (particlesRef.current.length > 70) {
        particlesRef.current.splice(0, particlesRef.current.length - 70);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);

      // Trigger shockwave ripple
      if (fxEnabled) {
        const chosenColor = colors[Math.floor(Math.random() * colors.length)];
        ripplesRef.current.push({
          id: nextRippleId.current++,
          x: e.clientX,
          y: e.clientY,
          radius: 6,
          maxRadius: 48,
          alpha: 0.85,
          color: chosenColor,
        });
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, input, textarea, select, [role="button"], .cursor-pointer, [data-interactive="true"]'
      );

      if (interactive) {
        setIsHovered(true);
        // Optional quick label detection
        const ariaLabel = interactive.getAttribute('aria-label') || interactive.getAttribute('title');
        const isAction = interactive.tagName === 'BUTTON' || interactive.tagName === 'A';
        if (isAction && interactive.textContent && interactive.textContent.trim().length < 15) {
          setHoverLabel(interactive.textContent.trim());
        } else if (ariaLabel) {
          setHoverLabel(ariaLabel);
        } else {
          setHoverLabel(null);
        }
      } else {
        setIsHovered(false);
        setHoverLabel(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Animation Render Loop
    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (fxEnabled) {
        // 1. Lerp follower position
        lerpRef.current.x += (mouseRef.current.x - lerpRef.current.x) * 0.22;
        lerpRef.current.y += (mouseRef.current.y - lerpRef.current.y) * 0.22;

        // 2. Render particle trail
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.025;
          p.size = Math.max(0.2, p.size - 0.03);

          if (p.alpha <= 0.02 || p.size <= 0.3) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.shadowColor = `rgba(${p.color}, ${p.alpha * 0.8})`;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        }

        // 3. Render click shockwave ripples
        for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
          const r = ripplesRef.current[i];
          r.radius += (r.maxRadius - r.radius) * 0.18 + 0.5;
          r.alpha -= 0.04;

          if (r.alpha <= 0.02 || r.radius >= r.maxRadius) {
            ripplesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r.color}, ${r.alpha})`;
          ctx.lineWidth = 1.8;
          ctx.shadowColor = `rgba(${r.color}, ${r.alpha * 0.8})`;
          ctx.shadowBlur = 10;
          ctx.stroke();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [fxEnabled]);

  const openWhatsAppDirect = (message?: string) => {
    const defaultMsg =
      message ||
      'Hello Prime Plus Team! I would like to inquire about Graphic Design, Web Development & Digital Marketing services.';
    const encoded = encodeURIComponent(defaultMsg);
    window.open(
      `https://wa.me/${AGENCY_INFO.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${encoded}`,
      '_blank'
    );
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    openWhatsAppDirect(customMsg);
    setCustomMsg('');
    setIsWhatsAppOpen(false);
  };

  return (
    <>
      {/* 1. Ambient Mouse Spotlight (moves with mouse over the dark canvas) */}
      {!isTouchDevice && fxEnabled && coords.x > 0 && (
        <div
          className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.08), rgba(56, 189, 248, 0.03) 40%, transparent 80%)`,
          }}
        />
      )}

      {/* 2. Particle & Ripple Canvas */}
      {!isTouchDevice && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-40 select-none"
        />
      )}

      {/* 3. Smooth Lerp Cursor Reticle & Precision Center Dot */}
      {!isTouchDevice && fxEnabled && coords.x > 0 && (
        <div
          className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out select-none"
          style={{
            left: `${lerpRef.current.x}px`,
            top: `${lerpRef.current.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Outer magnetic glowing ring */}
          <div
            className={`rounded-full transition-all duration-200 border flex items-center justify-center ${
              isClicking
                ? 'w-6 h-6 border-amber-400 bg-amber-400/20 scale-90 shadow-[0_0_15px_rgba(245,158,11,0.8)]'
                : isHovered
                ? 'w-14 h-14 border-sky-400/80 bg-sky-400/10 shadow-[0_0_20px_rgba(56,189,248,0.5)]'
                : 'w-8 h-8 border-indigo-500/60 bg-indigo-500/5 shadow-[0_0_12px_rgba(99,102,241,0.35)]'
            }`}
          >
            {/* Center core pip */}
            <div
              className={`rounded-full transition-all duration-150 ${
                isClicking
                  ? 'w-1.5 h-1.5 bg-amber-300'
                  : isHovered
                  ? 'w-2 h-2 bg-sky-300 scale-125'
                  : 'w-1 h-1 bg-indigo-300'
              }`}
            />
          </div>

          {/* Interactive hover tooltip indicator */}
          {isHovered && hoverLabel && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-950/90 border border-sky-500/40 text-[10px] font-mono text-sky-300 whitespace-nowrap backdrop-blur-md shadow-lg pointer-events-none">
              {hoverLabel}
            </div>
          )}
        </div>
      )}

      {/* 4. Mouse FX Subtle Toggle Pill (Bottom-Left) */}
      {!isTouchDevice && (
        <div className="fixed bottom-4 left-4 z-30 flex items-center gap-2">
          <button
            onClick={() => setFxEnabled((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-900/85 hover:bg-slate-800 border border-slate-700/70 text-[10px] font-mono text-slate-400 hover:text-slate-200 transition-all backdrop-blur-md shadow-md cursor-pointer"
            title="Toggle Mouse Animation Trails & Spotlight"
          >
            <Sparkles className={`w-3 h-3 ${fxEnabled ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
            <span>Mouse FX: {fxEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      )}

      {/* 5. Floating WhatsApp Direct Hotline Widget (Bottom-Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
        {/* Expanded Quick Message Card */}
        {isWhatsAppOpen && (
          <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-slate-900/95 border border-emerald-500/40 shadow-[0_10px_35px_rgba(16,185,129,0.25)] backdrop-blur-xl overflow-hidden text-left animate-in fade-in slide-in-from-bottom-3 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 p-4 border-b border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-lg">
                  <MessageCircle className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-slate-900"></span>
                  </span>
                </div>
                <div>
                  <div className="font-extrabold text-sm text-white font-['Outfit',sans-serif]">
                    Prime Plus Team WhatsApp
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400 font-medium">
                    {AGENCY_INFO.contacts.whatsappFormatted}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsWhatsAppOpen(false)}
                className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close WhatsApp card"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Online & Available
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Connect directly with our Lead Web Architect, Senior Graphic Designer & Growth Marketer.
                </p>
              </div>

              {/* Quick Prompt Chips */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Quick Topics:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() =>
                      openWhatsAppDirect(
                        'Hi Prime Plus Team, I need a modern Logo & Branding Design for my business.'
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-pink-950/40 hover:bg-pink-900/50 border border-pink-500/30 text-pink-300 text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    🎨 Graphic Design Quote
                  </button>
                  <button
                    onClick={() =>
                      openWhatsAppDirect(
                        'Hi Prime Plus Team, I need a custom Web Development / Full-Stack Web App built.'
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/30 text-sky-300 text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    💻 Web Dev Project
                  </button>
                  <button
                    onClick={() =>
                      openWhatsAppDirect(
                        'Hi Prime Plus Team, I want to run high-converting Meta / Google Ads & SEO campaigns.'
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/30 text-amber-300 text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    📈 Digital Marketing ROI
                  </button>
                </div>
              </div>

              {/* Custom Input Form */}
              <form onSubmit={handleCustomSend} className="space-y-2 pt-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 focus:border-emerald-500 text-white placeholder:text-slate-500 text-xs outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors cursor-pointer"
                    title="Send to WhatsApp"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                  <span>Number: <strong className="text-emerald-400">3326032893</strong></span>
                  <button
                    type="button"
                    onClick={() => openWhatsAppDirect()}
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <PhoneCall className="w-2.5 h-2.5" />
                    Open WhatsApp Chat
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <div className="relative group">
          {/* Radar ripple rings */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
          <span className="absolute -inset-2 rounded-full bg-emerald-500/20 blur-sm pointer-events-none" />

          <button
            onClick={() => setIsWhatsAppOpen((prev) => !prev)}
            className="relative flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold shadow-[0_0_25px_rgba(16,185,129,0.6)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Open WhatsApp Chat Support"
          >
            <div className="w-7 h-7 rounded-full bg-slate-950/20 flex items-center justify-center text-slate-950">
              <MessageCircle className="w-4 h-4 fill-slate-950" />
            </div>

            <div className="text-left">
              <div className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-emerald-950 leading-tight">
                WhatsApp Us
              </div>
              <div className="text-xs font-black tracking-tight leading-tight">
                0332 6032893
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
