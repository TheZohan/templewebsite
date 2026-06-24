"use client";

export function EtherealBlobs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Warm top-right blob */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #d4a843 0%, #7a4fbf 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Cool bottom-left blob */}
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #3d2f6b 0%, #7a9e7e 60%, transparent 75%)",
          filter: "blur(100px)",
        }}
      />

      {/* Chalk doodles SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: "#f5ede0" }}
      >
        {/* Star top-left */}
        <text x="6%" y="12%" fontSize="28" fill="currentColor" fontFamily="serif">★</text>
        {/* Heart */}
        <text x="88%" y="20%" fontSize="22" fill="currentColor" fontFamily="serif">♥</text>
        {/* Plus signs */}
        <text x="15%" y="80%" fontSize="20" fill="currentColor">+</text>
        <text x="78%" y="75%" fontSize="16" fill="currentColor">+</text>
        {/* Infinity */}
        <text x="5%" y="55%" fontSize="24" fill="currentColor" fontFamily="serif">∞</text>
        {/* Asterisk */}
        <text x="92%" y="60%" fontSize="20" fill="currentColor">✦</text>
        {/* Small circles */}
        <circle cx="25%" cy="15%" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="75%" cy="85%" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="90%" cy="40%" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {/* Wavy underline accent */}
        <path
          d="M 10% 93% Q 20% 90% 30% 93% Q 40% 96% 50% 93%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Arrow */}
        <path
          d="M 82% 12% L 86% 8% M 86% 8% L 86% 14% M 86% 8% L 80% 8%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
