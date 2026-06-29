"use client";

import { useState } from "react";

const WA_NUMBER = "972545926064";
const WA_MESSAGE = "היי, יש לי שאלה לגבי Back to High School Temple 🌟";
export const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="white">
      <path d="M16 2C8.27 2 2 8.27 2 16c0 2.48.69 4.8 1.88 6.79L2 30l7.41-1.85A13.94 13.94 0 0 0 16 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.83-1.6l-.42-.25-4.39 1.1 1.14-4.27-.27-.44A11.45 11.45 0 0 1 4.5 16C4.5 9.6 9.6 4.5 16 4.5S27.5 9.6 27.5 16 22.4 27.5 16 27.5zm6.27-8.57c-.34-.17-2.02-1-2.34-1.11-.32-.11-.55-.17-.78.17s-.9 1.11-1.1 1.34c-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.74-1.69a10.3 10.3 0 0 1-1.9-2.36c-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.57-.28-.68-.57-.58-.78-.59h-.67c-.23 0-.6.09-.91.43s-1.2 1.17-1.2 2.86 1.22 3.32 1.4 3.55c.17.23 2.41 3.68 5.84 5.16.82.35 1.46.56 1.95.72.82.26 1.57.22 2.16.13.66-.1 2.02-.83 2.31-1.62.28-.8.28-1.48.2-1.62-.09-.14-.32-.23-.66-.4z" />
    </svg>
  );
}

/* Floating button — desktop only (md+) */
export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="hidden md:flex fixed bottom-6 left-6 z-50 items-end gap-3"
      dir="ltr"
    >
      {/* Tooltip bubble */}
      <div
        className="mb-1 px-3 py-2 rounded-2xl text-sm font-medium text-white max-w-[180px] leading-snug transition-all duration-300 pointer-events-none relative"
        style={{
          background: "rgba(30, 30, 40, 0.92)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0) scale(1)" : "translateX(-8px) scale(0.96)",
        }}
      >
        סקרנים לגבי הטמפל? דברו איתנו 💛
        <span
          className="absolute -bottom-1.5 right-3 w-3 h-3 rotate-45"
          style={{ background: "rgba(30, 30, 40, 0.92)" }}
          aria-hidden="true"
        />
      </div>

      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="צרו קשר בוואטסאפ"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center gap-2 px-4 py-3 rounded-full transition-transform duration-200 hover:scale-105 active:scale-95 text-white text-sm font-medium"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          animation: "waPulse 3s ease-in-out infinite",
        }}
      >
        <WhatsAppIcon size={22} />
        מסקרן אותי
      </a>

      <style>{`
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 4px 24px rgba(37,211,102,0.4); }
          50%       { box-shadow: 0 4px 32px rgba(37,211,102,0.7), 0 0 0 8px rgba(37,211,102,0.12); }
        }
      `}</style>
    </div>
  );
}

/* Footer pill — mobile only */
export function WhatsAppFooterLink() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
      style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
    >
      <WhatsAppIcon size={16} />
      מסקרן אותי
    </a>
  );
}
