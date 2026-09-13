import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export default function CyberCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Detect touch devices to disable custom cursor on touch
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    let particleCounter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setPos({ x, y });

      // Add trailing particle periodically
      particleCounter++;
      if (particleCounter % 2 === 0) {
        setParticles((prev) => [
          ...prev.slice(-14),
          {
            id: Math.random(),
            x: x + (Math.random() * 4 - 2),
            y: y + (Math.random() * 4 - 2),
            size: Math.random() * 3 + 2,
            opacity: 0.75,
          },
        ]);
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('interactive-hover'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Fade out trailing particles
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.08, size: p.size * 0.94 }))
          .filter((p) => p.opacity > 0.05)
      );
    }, 40);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Neon Trail Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-[#00D9FF] blur-[1px]"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            boxShadow: `0 0 8px rgba(0, 217, 255, ${particle.opacity})`,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.1s ease-out',
          }}
        />
      ))}

      {/* Main Cursor Dot */}
      <div
        className="absolute rounded-full bg-[#00FFFF] transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? '8px' : '5px',
          height: isHovered ? '8px' : '5px',
          boxShadow: '0 0 10px #00FFFF, 0 0 20px #00D9FF',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Outer Neon Cyber Reticle */}
      <div
        className={`absolute rounded-full border transition-all duration-150 ease-out ${
          isHovered
            ? 'scale-150 border-[#00FFFF] bg-[#00D9FF]/15'
            : 'scale-100 border-[#00D9FF]/60'
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: '32px',
          height: '32px',
          boxShadow: isHovered
            ? '0 0 20px rgba(0, 255, 255, 0.8), inset 0 0 10px rgba(0, 217, 255, 0.4)'
            : '0 0 12px rgba(0, 217, 255, 0.4)',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Subtle crosshair notches */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-[#00D9FF]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-[#00D9FF]" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-0.5 bg-[#00D9FF]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1 w-0.5 bg-[#00D9FF]" />
      </div>
    </div>
  );
}
