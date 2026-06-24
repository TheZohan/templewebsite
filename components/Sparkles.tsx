"use client";

const SPARKLES = [
  { top: "8%",  left: "7%",  size: 18, delay: 0,    duration: 2.4 },
  { top: "5%",  left: "82%", size: 24, delay: 0.6,  duration: 2.8 },
  { top: "14%", left: "55%", size: 14, delay: 1.1,  duration: 2.1 },
  { top: "22%", left: "91%", size: 20, delay: 0.3,  duration: 3.0 },
  { top: "35%", left: "4%",  size: 12, delay: 1.5,  duration: 2.3 },
  { top: "42%", left: "96%", size: 16, delay: 0.8,  duration: 2.6 },
  { top: "55%", left: "12%", size: 22, delay: 0.2,  duration: 2.9 },
  { top: "60%", left: "88%", size: 14, delay: 1.3,  duration: 2.2 },
  { top: "70%", left: "3%",  size: 18, delay: 0.7,  duration: 2.5 },
  { top: "75%", left: "75%", size: 12, delay: 1.8,  duration: 3.1 },
  { top: "82%", left: "45%", size: 20, delay: 0.4,  duration: 2.7 },
  { top: "88%", left: "18%", size: 16, delay: 1.0,  duration: 2.0 },
  { top: "18%", left: "28%", size: 10, delay: 1.6,  duration: 2.4 },
  { top: "48%", left: "62%", size: 14, delay: 0.9,  duration: 2.8 },
  { top: "92%", left: "85%", size: 18, delay: 0.5,  duration: 2.3 },
  { top: "30%", left: "72%", size: 10, delay: 1.4,  duration: 2.6 },
];

function StarBurst({ size }: { size: number }) {
  const s = size;
  const h = s / 2;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {/* 4-point star */}
      <path
        d={`M${h} 0 L${h * 1.15} ${h * 0.85} L${s} ${h} L${h * 1.15} ${h * 1.15} L${h} ${s} L${h * 0.85} ${h * 1.15} L0 ${h} L${h * 0.85} ${h * 0.85} Z`}
        fill="url(#gold)"
      />
      <defs>
        <radialGradient id="gold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8dc" />
          <stop offset="40%" stopColor="#e8c96a" />
          <stop offset="100%" stopColor="#d4a843" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function Sparkles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {SPARKLES.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          <StarBurst size={s.size} />
        </div>
      ))}
    </div>
  );
}
